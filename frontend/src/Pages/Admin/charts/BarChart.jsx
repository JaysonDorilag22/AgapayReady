import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';

const BarChart = () => {
  const chartRef = useRef(null);
  const [emergencyReportsCount, setEmergencyReportsCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch emergency reports count from the server
        const response = await axios.get('/api/v1/reports-three-months');
        setEmergencyReportsCount(response.data.count);
      } catch (error) {
        console.error('Error fetching emergency reports count:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const createChart = () => {
      // Data for the chart
      const chartData = {
        labels: ['Past 3 Months'],
        datasets: [
          {
            label: 'Emergency Reports Count',
            backgroundColor: 'rgba(75, 192, 192, 0.7)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            data: [emergencyReportsCount],
          },
        ],
      };

      // Create the chart only if chartRef.current is available
      if (chartRef.current) {
        const myChart = new Chart(chartRef.current, {
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

        // Cleanup on component unmount
        return () => {
          myChart.destroy();
        };
      }
    };

    createChart();
  }, [emergencyReportsCount]);

  return <canvas ref={chartRef} style={{ width: '100%', height: '100%' }} />;
};

export default BarChart;
