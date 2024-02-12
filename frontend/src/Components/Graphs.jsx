import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';

export default function Graphs() {
  const [weatherData, setWeatherData] = useState(null);
  const [charts, setCharts] = useState({
    lineChart: null,
    barChart: null,
    doughnutChart: null
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=Taguig,PH&appid=979d0e49a4b9b36369291c8111217e6c');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (weatherData) {
      renderGraphs();
    }
  }, [weatherData]);

  const renderGraphs = () => {
    destroyCharts();
    renderLineGraph();
    renderBarGraph();
    renderDoughnutGraph();
  };

  const destroyCharts = () => {
    Object.values(charts).forEach(chart => {
      if (chart) {
        chart.destroy();
      }
    });
  };

  const renderLineGraph = () => {
    const ctx = document.getElementById('line-chart').getContext('2d');
    const newChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Temperature', 'Humidity', 'Wind Speed'],
        datasets: [{
          label: 'Weather Data',
          data: [weatherData.main.temp, weatherData.main.humidity, weatherData.wind.speed],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
    setCharts(prevState => ({ ...prevState, lineChart: newChart }));
  };

  const renderBarGraph = () => {
    const ctx = document.getElementById('bar-chart').getContext('2d');
    const newChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Temperature', 'Humidity', 'Wind Speed'],
        datasets: [{
          label: 'Weather Data',
          data: [weatherData.main.temp, weatherData.main.humidity, weatherData.wind.speed],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
    setCharts(prevState => ({ ...prevState, barChart: newChart }));
  };

  const renderDoughnutGraph = () => {
    const ctx = document.getElementById('doughnut-chart').getContext('2d');
    const newChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Temperature', 'Humidity', 'Wind Speed'],
        datasets: [{
          label: 'Weather Data',
          data: [weatherData.main.temp, weatherData.main.humidity, weatherData.wind.speed],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
    setCharts(prevState => ({ ...prevState, doughnutChart: newChart }));
  };

  return (
    <div className="flex flex-wrap justify-center gap-8">
      <div className="flex-1">
        <canvas id="line-chart" width="200" height="200"></canvas>
      </div>
      <div className="flex-1">
        <canvas id="bar-chart" width="200" height="200"></canvas>
      </div>
      <div className="flex-1">
        <canvas id="doughnut-chart" width="200" height="200"></canvas>
      </div>
    </div>
  );
}
