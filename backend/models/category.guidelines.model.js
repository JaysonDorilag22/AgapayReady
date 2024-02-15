import mongoose from "mongoose";

const CategoryGuidelinesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    short_description: {
        type: String,
        required: true,
        unique: true,
      },
    description: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    },
  },
  { timestamps: true }
);

const CategoryGuidelines = mongoose.model("CategoryGuidelines", CategoryGuidelinesSchema);

export default CategoryGuidelines;
