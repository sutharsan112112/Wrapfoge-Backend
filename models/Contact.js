import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    senderRole: {
      type: String,
      enum: ["user", "partner"],
      required: true,
    },
    email: {
      type: String,
      required: true, // ✅ Needed for sending admin replies
    },
    message: {
      type: String,
      required: true,
    },
    reply: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Contact", contactSchema);