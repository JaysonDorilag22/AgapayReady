import React, { useState, useEffect } from "react";
import axios from "axios";
import Chart from 'chart.js/auto';

export default function SentimentAnalysis() {
  const [feedbackStats, setFeedbackStats] = useState(null);

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
        label: 'Word Distribution',
        backgroundColor: ['#4CAF50', '#F44336'],
        data: [feedbackStats.totalPositiveWords, feedbackStats.totalNegativeWords],
      }]
    };

    const ctx = document.getElementById('pieChart').getContext('2d');
    new Chart(ctx, {
      type: 'pie',
      data: pieChartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
      }
    });
  };

  if (feedbackStats === null) {
    return null;
  }

  return (
    <section className="bg-white outline outline-1 outline-slate-400 mx-auto max-w-screen-xl px-4 lg:px-12 rounded-md">
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
            <div className="flex flex-col rounded-lg bg-slate-50 px-4 py-8 text-center">
              <dt className="order-last text-lg font-medium text-gray-500">
                Total Feedback Entries
              </dt>
              <dd className="text-4xl font-extrabold text-slate-600 md:text-5xl">
                {feedbackStats.totalEntries}
              </dd>
            </div>

            <div className="flex flex-col rounded-lg bg-slate-50 px-4 py-8 text-center">
              <dt className="order-last text-lg font-medium text-gray-500">
                Average Sentiment Score
              </dt>
              <dd className="text-4xl font-extrabold text-slate-600 md:text-5xl">
                {feedbackStats.averageSentimentScore}
              </dd>
            </div>

            <div className="flex flex-col rounded-lg bg-slate-50 px-4 py-8 text-center">
              <dt className="order-last text-lg font-medium text-gray-500">
                Average Comparative
              </dt>
              <dd className="text-4xl font-extrabold text-slate-600 md:text-5xl">
                {feedbackStats.averageComparative}
              </dd>
            </div>

            <div className="flex flex-col rounded-lg bg-slate-50 px-4 py-8 text-center">
              <dt className="order-last text-lg font-medium text-gray-500">
                Total Positive Words:
              </dt>
              <dd className="text-4xl font-extrabold text-slate-600 md:text-5xl">
                {feedbackStats.totalPositiveWords}
              </dd>
            </div>

            <div className="flex flex-col rounded-lg bg-slate-50 px-4 py-8 text-center">
              <dt className="order-last text-lg font-medium text-gray-500">
                Total Negative Words:
              </dt>
              <dd className="text-4xl font-extrabold text-slate-600 md:text-5xl">
                {feedbackStats.totalNegativeWords}
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <div className="mt-8">
          <canvas id="pieChart" />
        </div>
    </section>
  );
}
