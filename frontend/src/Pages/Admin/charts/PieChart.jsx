import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import jsPDF from 'jspdf';

const PieChart = () => {
  const chartRef = useRef(null);
  const [loadingPdf, setLoadingPdf] = useState(false);
  const [loadingPng, setLoadingPng] = useState(false);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Red', 'Blue', 'Yellow'],
        datasets: [{
          data: [10, 20, 30],
          backgroundColor: ['red', 'blue', 'yellow']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }, []);

  const downloadPdf = () => {
    setLoadingPdf(true);
    try {
      const canvas = chartRef.current;
      const dataURL = canvas.toDataURL('image/jpeg', 1.0);
      const pdf = new jsPDF();
      const width = pdf.internal.pageSize.getWidth();
      const height = (canvas.height * width) / canvas.width;
      pdf.addImage(dataURL, 'JPEG', 0, 0, width, height);
      pdf.save('chart.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
    setLoadingPdf(false);
  };

  const downloadPng = () => {
    setLoadingPng(true);
    try {
      const canvas = chartRef.current;
      const dataURL = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = 'chart.png';
      link.click();
    } catch (error) {
      console.error('Error generating PNG:', error);
    }
    setLoadingPng(false);
  };

  return (
    <div>
      <canvas ref={chartRef} />
      <button onClick={downloadPdf} disabled={loadingPdf}>
        {loadingPdf ? 'Generating PDF...' : 'Download PDF'}
      </button>
      <button onClick={downloadPng} disabled={loadingPng}>
        {loadingPng ? 'Generating PNG...' : 'Download PNG'}
      </button>
    </div>
  );
};

export default PieChart;
