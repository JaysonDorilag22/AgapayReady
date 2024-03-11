import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';

const UsersDepartment = () => {
  const chartRef = useRef(null);
  const [counts, setCounts] = useState([]);

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

  return <canvas ref={chartRef} style={{ width: '400px', height: '100px' }} />;
};

export default UsersDepartment;