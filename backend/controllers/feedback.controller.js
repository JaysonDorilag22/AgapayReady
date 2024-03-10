import Feedback from "../models/feedback.model.js";
import Sentiment from 'sentiment';

export const submitFeedback = async (req, res, next) => {
    const { comment, user } = req.body;

    try {
        if (!comment) {
            return res.status(400).json({ success: false, error: "Comment is required" });
        }

        const feedback = new Feedback({ comment, user });

        await feedback.save();

        res.status(201).json({ success: true, feedback });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

export const getAllFeedback = async (req, res, next) => {
    try {
        const allFeedback = await Feedback.find();
        res.status(200).json({ success: true, feedback: allFeedback });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

export const computeSentimentAndCategory = async (req, res, next) => {
    try {
        const allFeedback = await Feedback.find();
        const computedFeedback = [];
        const sentiment = new Sentiment();

        let totalSentimentScore = 0;
        let totalComparative = 0;
        let totalPositiveWords = 0;
        let totalNegativeWords = 0;

        for (const feedback of allFeedback) {
            const sentimentResult = sentiment.analyze(feedback.comment);

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

            totalSentimentScore += sentimentResult.score;
            totalComparative += sentimentResult.comparative;
            totalPositiveWords += sentimentResult.positive.length;
            totalNegativeWords += sentimentResult.negative.length;
        }

        const averageSentimentScore = totalSentimentScore / allFeedback.length;
        const averageComparative = totalComparative / allFeedback.length;

        console.log("Summary:");
        console.log("Total Feedback Entries:", allFeedback.length);
        console.log("Average Sentiment Score:", averageSentimentScore);
        console.log("Average Comparative:", averageComparative);
        console.log("Total Positive Words:", totalPositiveWords);
        console.log("Total Negative Words:", totalNegativeWords);

        res.status(200).json({ success: true, feedback: computedFeedback });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

