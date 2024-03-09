import Feedback from "../models/feedback.model.js";
import Sentiment from 'sentiment';

// Controller to submit feedback
export const submitFeedback = async (req, res, next) => {
    const { comment, user } = req.body;

    try {
        // Check if comment is provided
        if (!comment) {
            return res.status(400).json({ success: false, error: "Comment is required" });
        }

        // Create a new feedback document
        const feedback = new Feedback({ comment, user });

        // Save the feedback to the database (Sentiment analysis is performed in pre-save hook)
        await feedback.save();

        res.status(201).json({ success: true, feedback });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Controller to retrieve all feedback
export const getAllFeedback = async (req, res, next) => {
    try {
        const allFeedback = await Feedback.find();
        res.status(200).json({ success: true, feedback: allFeedback });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Controller to compute sentiment and category for all feedback
export const computeSentimentAndCategory = async (req, res, next) => {
    try {
        // Fetch all feedback from the database
        const allFeedback = await Feedback.find();

        // Array to store computed results for each feedback entry
        const computedFeedback = [];

        // Create a new instance of the Sentiment class
        const sentiment = new Sentiment();

        // Variables to store summary statistics
        let totalSentimentScore = 0;
        let totalComparative = 0;
        let totalPositiveWords = 0;
        let totalNegativeWords = 0;

        // Process each feedback entry
        for (const feedback of allFeedback) {
            // Perform sentiment analysis on the comment
            const sentimentResult = sentiment.analyze(feedback.comment);

            // Add computed result to array
            computedFeedback.push({
                _id: feedback._id,
                comment: feedback.comment,
                user: feedback.user,
                timestamp: feedback.timestamp,
                sentimentScore: sentimentResult.score,
                comparative: sentimentResult.comparative,
                positiveWords: sentimentResult.positive,
                negativeWords: sentimentResult.negative,
                category: feedback.category
            });

            // Update summary statistics
            totalSentimentScore += sentimentResult.score;
            totalComparative += sentimentResult.comparative;
            totalPositiveWords += sentimentResult.positive.length;
            totalNegativeWords += sentimentResult.negative.length;
        }

        // Calculate average sentiment score and comparative
        const averageSentimentScore = totalSentimentScore / allFeedback.length;
        const averageComparative = totalComparative / allFeedback.length;

        // Log summary
        console.log("Summary:");
        console.log("Total Feedback Entries:", allFeedback.length);
        console.log("Average Sentiment Score:", averageSentimentScore);
        console.log("Average Comparative:", averageComparative);
        console.log("Total Positive Words:", totalPositiveWords);
        console.log("Total Negative Words:", totalNegativeWords);

        // Send response with computed feedback
        res.status(200).json({ success: true, feedback: computedFeedback });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

