import mongoose from "mongoose";

const CategoryContactsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    short_description: {
        type: String,
        required: true,
      },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    },
  },
  { timestamps: true }
);

const CategoryContacts = mongoose.model("CategoryContacts", CategoryContactsSchema);

export default CategoryContacts;
