import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';

const LineChart = () => {
  const chartRef = useRef(null);
  const [counts, setCounts] = useState([]);

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
        labels: counts.map(c => c._id), // Use department names as labels
        datasets: [
          {
            label: 'Reports Count',
            data: counts.map(c => c.count), // Use counts as data
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

  return <canvas ref={chartRef} style={{ width: '300px', height: '100px' }} />;
};

export default LineChart;