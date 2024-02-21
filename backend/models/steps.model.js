import mongoose from "mongoose";

const stepSchema = new mongoose.Schema({
  stepNumber: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  guideline: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Guideline",
    required: true
  },
});

const Step = mongoose.model('Step', stepSchema);

export default Step;
