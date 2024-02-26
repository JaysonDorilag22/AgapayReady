import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export default function PieChart() {
    const chartRef = useRef(null);

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
  
    return (
      <div>
        <canvas ref={chartRef} />
      </div>
    );
}

