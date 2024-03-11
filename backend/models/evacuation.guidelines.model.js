import mongoose from "mongoose";

const EvacuationGuidelinesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    glbfile: {
      type: String,
      required: true,
    },
    tips: [{
      type: String,
      required: true,
    }],
  },
  { timestamps: true }
);

const EvacuationGuidelines = mongoose.model("EvacuationGuidelines", EvacuationGuidelinesSchema);

export default EvacuationGuidelines;
