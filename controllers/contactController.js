import Contact from '../models/Contact.js';
import { sendEmail } from "../utils/sendEmail.js";

// Send a message (user/partner)
export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id, role, email } = req.user;  // ✅ Get email from authenticated user

    if (!message || message.trim() === '') {
      return res.status(400).json({ message: 'Message is required' });
    }

    const newMessage = await Contact.create({
      senderId: id,
      senderRole: role,
      email,        // ✅ Store the sender email
      message
    });

    res.status(201).json({ 
      message: 'Message sent successfully', 
      data: newMessage 
    });
  } catch (error) {
    console.error("Send message error:", error);
    res.status(500).json({ message: 'Failed to send message', error: error.message });
  }
};


// Admin: Get all messages
export const getAllMessages = async (req, res) => {
  try {
    const messages = await Contact.find()
      .populate("senderId", "name email") // ✅ sender name & email populate
      .sort({ createdAt: -1 });

    res.status(200).json({ messages });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch messages" });
  }
};

// Admin: Reply to message
export const replyToMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { reply } = req.body;

    if (!reply || reply.trim() === "") {
      return res.status(400).json({ message: "Reply cannot be empty" });
    }

    // Update the message with the reply
    const message = await Contact.findByIdAndUpdate(
      id,
      { reply },
      { new: true, runValidators: false }
    );

    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    // Send email notification
    try {
      if (message.email) {
        await sendEmail(message.email, "WrapForge Admin Reply", reply);
        console.log(`✅ Reply email sent to ${message.email}`);
      } else {
        console.warn("⚠️ No email address for this message");
      }
    } catch (emailError) {
      console.error("❌ Email sending failed:", emailError.message);
    }

    console.log("Reply saved and email sent");
    res.status(200).json({
      message: "Reply saved successfully",
      data: message
    });
  } catch (error) {
    console.error("❌ Reply error:", error);
    res.status(500).json({ message: "Reply failed", error: error.message });
  }
};


// User/Partner: Update their own message
export const updateContactMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { message } = req.body;
    const userId = req.user.id;

    const contact = await Contact.findById(id);
    if (!contact) return res.status(404).json({ message: 'Message not found' });

    if (contact.senderId.toString() !== userId.toString()) {
      return res.status(403).json({ message: 'You are not allowed to edit this message' });
    }

    contact.message = message;
    await contact.save();

    res.status(200).json({ message: 'Message updated successfully', data: contact });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Admin: Delete message
export const deleteContactMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findById(id);
    if (!contact) return res.status(404).json({ message: 'Message not found' });

    await contact.deleteOne();
    res.json({ message: 'Message deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete message', error: error.message });
  }
};
