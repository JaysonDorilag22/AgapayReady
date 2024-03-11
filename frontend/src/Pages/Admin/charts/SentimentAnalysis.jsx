import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Chart from 'chart.js/auto';
import jsPDF from 'jspdf';

export default function SentimentAnalysis() {
  const [feedbackStats, setFeedbackStats] = useState(null);
  const chartRef = useRef(null);
  const [loadingPdf, setLoadingPdf] = useState(false);
  const [loadingPng, setLoadingPng] = useState(false);

  useEffect(() => {
    axios
      .get("/api/v1/feedbackResult")
      .then((response) => {
        const data = response.data;
        if (data.success) {
          const feedback = data.feedback;
          setFeedbackStats({
            totalEntries: feedback.length,
            averageSentimentScore: (feedback.reduce((acc, feedback) => acc + feedback.sentimentScore, 0) / feedback.length).toFixed(3),
            averageComparative: (feedback.reduce((acc, feedback) => acc + feedback.comparative, 0) / feedback.length).toFixed(3),
            totalPositiveWords: feedback.reduce((acc, feedback) => acc + feedback.positiveWords.length, 0),
            totalNegativeWords: feedback.reduce((acc, feedback) => acc + feedback.negativeWords.length, 0),
          });
        } else {
          console.error("Failed to fetch feedback results:", data.error);
        }
      })
      .catch((error) => console.error("Error fetching feedback results:", error));
  }, []);

  useEffect(() => {
    if (feedbackStats !== null) {
      renderPieChart();
    }
  }, [feedbackStats]);

  const renderPieChart = () => {
    const pieChartData = {
      labels: ['Positive Words', 'Negative Words'],
      datasets: [{
        labels: ['Positive Distribution', 'Negative Distribution'],
        backgroundColor: ['#4CAF50', '#F44336'],
        borderColor: 'white',
        borderWidth: 1,
        hoverBackgroundColor: ['#4CAF50', '#F44336'],
        hoverBorderColor: 'black',
        hoverBorderWidth: 3,
        data: [feedbackStats.totalPositiveWords, feedbackStats.totalNegativeWords],
      }]
    };

    const ctx = chartRef.current.getContext('2d');
    new Chart(ctx, {
      type: 'pie',
      data: pieChartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
      }
    });
  };

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

  if (feedbackStats === null) {
    return null;
  }

  return (
    <section className="bg-white outline outline-1 outline-slate-400 mx-auto pb-8 max-w-screen-xl px-4 lg:px-12 rounded-md">
      <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Feedback Statistics
          </h2>

          <p className="mt-5 text-gray-500 text-sm">
            This section displays the sentiment analysis results obtained from
            the feedback provided by users. It includes various statistics such
            as the total number of feedback entries, average sentiment score,
            average comparative score, total count of positive words, and total
            count of negative words.
          </p>
        </div>

        <div className="mt-8 sm:mt-12">
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="flex flex-col rounded-lg bg-slate-50 px-4 py-8 text-center hover:bg-red-200">
              <dt className="order-last text-lg font-medium text-gray-500 hover:text-black">
                Total Feedback Entries
              </dt>
              <dd className="text-4xl font-extrabold text-slate-600 hover:text-black md:text-5xl">
                {feedbackStats.totalEntries}
              </dd>
            </div>

            <div className="flex flex-col rounded-lg bg-slate-50 px-4 py-8 text-center hover:bg-red-200">
              <dt className="order-last text-lg font-medium text-gray-500 hover:text-black">
                Average Sentiment Score
              </dt>
              <dd className="text-4xl font-extrabold text-slate-600 md:text-5xl hover:text-black">
                {feedbackStats.averageSentimentScore}
              </dd>
            </div>

            <div className="flex flex-col rounded-lg bg-slate-50 px-4 py-8 text-center hover:bg-red-200">
              <dt className="order-last text-lg font-medium text-gray-500 hover:text-black">
                Average Comparative
              </dt>
              <dd className="text-4xl font-extrabold text-slate-600 md:text-5xl hover:text-black">
                {feedbackStats.averageComparative}
              </dd>
            </div>

            <div className="flex flex-row col-start-1 col-end-4 rounded-lg bg-slate-50 px-4 py-8 gap-12 text-center justify-center hover:bg-red-200">
              <div className="flex flex-col">
                <dt className="order-last text-lg font-medium text-gray-500 hover:text-black">
                  Total Positive Words:
                </dt>
                <dd className="text-4xl font-extrabold text-green-600 md:text-5xl hover:text-black">
                  {feedbackStats.totalPositiveWords}
                </dd>
              </div>
              <div className="flex flex-col">
              <dt className="order-last text-lg font-medium text-gray-500 hover:text-black">
                  Total Negative Words:
                </dt>
                <dd className="text-4xl font-extrabold text-red-600 md:text-5xl hover:text-black">
                  {feedbackStats.totalNegativeWords}
                </dd>
              </div>
            </div>
          </dl>
        </div>
      </div>
      <div className="my-8">
        <canvas ref={chartRef} />
      </div>
      <div className="flex justify-center space-x-4">
        <button onClick={downloadPdf} disabled={loadingPdf}>
          {loadingPdf ? 'Generating PDF...' : 'Download PDF'}
        </button>
        <button onClick={downloadPng} disabled={loadingPng}>
          {loadingPng ? 'Generating PNG...' : 'Download PNG'}
        </button>
      </div>
    </section>
  );
}
