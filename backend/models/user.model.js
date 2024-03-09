import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
    },
    role: {
      type: String,
      enum: ["Admin", "User"],
      default: "User",
    },
    isConfirmed: {
      type: Boolean,
      default: false,
    },
    emailConfirmationToken: String,
    coverPhoto: {
      type: String,
      default:
        "https://dsuj2mkiosyd2.cloudfront.net/unified-gallery/160219/5816/9a1d263b/co.png?t=1486630687",
    },
    phoneNumber: String,
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
