import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import moment from 'moment';

const BarChart = () => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null); // New ref to store the chart instance
  const [emergencyReportsCount, setEmergencyReportsCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/v1/reports-three-months');
        console.log(response.data); // Check the response data
        setEmergencyReportsCount(response.data.counts.map(c => c.count));
      } catch (error) {
        console.error('Error fetching emergency reports count:', error);
      }
    };
  
    fetchData();
  }, []);
  
  useEffect(() => {
    const createChart = () => {
      console.log('Creating chart'); // Check if the function is being called
      const chartData = {
        labels: Array.from({length: 7}, (_, i) => moment().subtract(7 - i, 'days').format('MMM DD')),
        datasets: [
          {
            label: 'Emergency Reports For The Last 7 Days',
            backgroundColor: 'black',
            borderColor: 'blue',
            borderWidth: 1,
            hoverBackgroundColor: 'red',
            hoverBorderColor: 'black',
            hoverBorderWidth: 3,
            data: emergencyReportsCount,
          },
        ],
      };

      console.log('chartRef.current', chartRef.current);
      if (chartRef.current) {
        // If a chart instance already exists, destroy it
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
          },
        });

        return () => {
          // Destroy the chart instance in the cleanup function
          if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
          }
        };
      }
    };

    createChart();
  }, [emergencyReportsCount]);

  return <canvas ref={chartRef} style={{ width: '600px', height: '100px' }} />;
};

export default BarChart;
