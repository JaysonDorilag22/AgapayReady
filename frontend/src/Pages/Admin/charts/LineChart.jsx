import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import jsPDF from 'jspdf';

const LineChart = () => {
  const chartRef = useRef(null);
  const [counts, setCounts] = useState([]);
  const [loadingPdf, setLoadingPdf] = useState(false);
  const [loadingPng, setLoadingPng] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/v1/reports-per-department');
        setCounts(response.data.counts);
      } catch (error) {
        console.error('Error fetching reports per department:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (counts.length > 0 && chartRef.current) {
      const chartData = {
        labels: counts.map(c => c._id),
        datasets: [
          {
            label: 'Reports Count',
            data: counts.map(c => c.count),
            borderColor: 'rgba(75, 192, 192, 1)',
            fill: false,
          },
        ],
      };

      new Chart(chartRef.current, {
        type: 'line',
        data: chartData,
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [counts]);

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
      <canvas ref={chartRef} style={{ width: '300px', height: '100px' }} />
      <button onClick={downloadPdf} disabled={loadingPdf}>
        {loadingPdf ? 'Generating PDF...' : 'Download PDF'}
      </button>
      <span> | </span>
      <button onClick={downloadPng} disabled={loadingPng}>
        {loadingPng ? 'Generating PNG...' : 'Download PNG'}
      </button>
    </div>
  );
};

export default LineChart;
