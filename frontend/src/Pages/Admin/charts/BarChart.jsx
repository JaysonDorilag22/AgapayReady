import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import moment from 'moment';
import jsPDF from 'jspdf';

const BarChart = () => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const [emergencyReportsCount, setEmergencyReportsCount] = useState(0);
  const [loadingPdf, setLoadingPdf] = useState(false);
  const [loadingPng, setLoadingPng] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/v1/reports-three-months');
        setEmergencyReportsCount(response.data.counts.map(c => c.count));
      } catch (error) {
        console.error('Error fetching emergency reports count:', error);
      }
    };
  
    fetchData();
  }, []);
  
  useEffect(() => {
    const createChart = () => {
      const chartData = {
        labels: Array.from({length: 7}, (_, i) => moment().subtract(7 - i, 'days').format('MMM DD')),
        datasets: [
          {
            label: 'Emergency Reports For The Last 7 Days',
            backgroundColor: 'blue',
            borderColor: 'blue',
            borderWidth: 1,
            hoverBackgroundColor: 'red',
            hoverBorderColor: 'white',
            hoverBorderWidth: 3,
            data: emergencyReportsCount,
          },
        ],
      };

      if (chartRef.current) {
        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
        }

        chartInstanceRef.current = new Chart(chartRef.current, {
          type: 'bar',
          data: chartData,
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
            plugins: {
              legend: {
                labels: {
                  color: 'white'
                }
              }
            }
          },
        });

        return () => {
          if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
          }
        };
      }
    };

    createChart();
  }, [emergencyReportsCount]);

  const downloadPdf = () => {
    setLoadingPdf(true);
    try {
      const canvas = chartRef.current;
      const dataURL = canvas.toDataURL('image/jpeg', 1.0);
      const pdf = new jsPDF('landscape', 'px', 'a4'); // Specify units as pixels ('px')
      const width = pdf.internal.pageSize.getWidth();
      const height = (canvas.height * width) / canvas.width;
      pdf.addImage(dataURL, 'JPEG', 10, 10, width - 20, height - 20); // Adjust margins
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
      <canvas ref={chartRef} style={{ width: '600px', height: '100px', backgroundColor: 'white' }} />
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

export default BarChart;
