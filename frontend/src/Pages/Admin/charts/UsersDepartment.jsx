import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import jsPDF from 'jspdf';

const UsersDepartment = () => {
  const chartRef = useRef(null);
  const [counts, setCounts] = useState([]);
  const [loadingPdf, setLoadingPdf] = useState(false);
  const [loadingPng, setLoadingPng] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/v1/users-per-department');
        setCounts(response.data.counts);
      } catch (error) {
        console.error('Error fetching users per department:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (counts.length > 0 && chartRef.current) {
      const chartData = {
        labels: counts.map(c => c._id), // Use department names as labels
        datasets: [
          {
            label: 'Users Count',
            data: counts.map(c => c.count), // Use counts as data
            backgroundColor: 'rgba(75, 192, 192, 0.7)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      };

      new Chart(chartRef.current, {
        type: 'bar',
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
      const pdf = new jsPDF('landscape', 'px', 'a4'); // Specify landscape orientation
      const width = pdf.internal.pageSize.getWidth();
      const height = (canvas.height * width) / canvas.width;
      const aspectRatio = canvas.width / canvas.height;
      const adjustedWidth = width;
      const adjustedHeight = adjustedWidth / aspectRatio;
      const positionX = 0;
      const positionY = (pdf.internal.pageSize.getHeight() - adjustedHeight) / 2;
      pdf.addImage(dataURL, 'JPEG', positionX, positionY, adjustedWidth, adjustedHeight);
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
      <canvas ref={chartRef} style={{ width: '400px', height: '100px' }} />
      <button onClick={downloadPdf} disabled={loadingPdf}>
        {loadingPdf ? 'Generating PDF...' : 'Download PDF'}
      </button>
      <span>
        |
      </span>
      <button onClick={downloadPng} disabled={loadingPng}>
        {loadingPng ? 'Generating PNG...' : 'Download PNG'}
      </button>
    </div>
  );
};

export default UsersDepartment;
