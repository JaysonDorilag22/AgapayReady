import mongoose from "mongoose";
import Sentiment from 'sentiment'; // Import the sentiment package

const feedbackSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    sentimentScore: {
        type: Number,
        default: null 
    },
    category: {
        type: String,
        default: 'Other' 
    }
});

// Create a new instance of the Sentiment class
const sentiment = new Sentiment();

// Define categories and corresponding keywords
const categoryKeywords = {
    "Bug Report": ["bug", "issue", "error"],
    "Feature Request": ["feature", "enhancement", "request"],
    "General Feedback": ["improvement", "suggestion", "comment"]
    // Add more categories and keywords as needed
};

// Function to categorize feedback based on keywords
feedbackSchema.pre('save', function(next) {
    const feedback = this;
    const comment = feedback.comment.toLowerCase();

    // Perform sentiment analysis
    const sentimentResult = sentiment.analyze(comment);

    // Assign sentiment score to feedback document
    feedback.sentimentScore = sentimentResult.score;

    // Check for keywords in the feedback comment
    for (const [category, keywords] of Object.entries(categoryKeywords)) {
        for (const keyword of keywords) {
            if (comment.includes(keyword)) {
                feedback.category = category;
                break;
            }
        }
        if (feedback.category !== 'Other') {
            break;
        }
    }

    next();
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

export default Feedback;
