import mongoose from "mongoose";

const StepSchema = new mongoose.Schema({
  stepNumber: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  // You can include additional properties for each step if needed
});

const GuidelineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CategoryGuidelines",
    required: true
  },
  steps: [StepSchema] // Array of step objects
}, { timestamps: true });

const Guideline = mongoose.model("Guideline", GuidelineSchema);

export default Guideline;
