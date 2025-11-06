import Message from "../model/messageModel.js";

export const sendMessage = async (req, res) => {
  const { message } = req.body;
  try {
    const newMessage = await Message.create({
      sender: req.user._id,
      senderName: req.user.name,
      message,
    });

    res.status(201).json({
      data: {
        _id: newMessage._id,
        senderId: newMessage.sender.toString(),
        senderName: newMessage.senderName,
        message: newMessage.message,
        createdAt: newMessage.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: 1 });
    res.status(200).json({
      data: messages.map((msg) => ({
        _id: msg._id,
        senderId: msg.sender.toString(),
        senderName: msg.senderName,
        message: msg.message,
        createdAt: msg.createdAt,
      })),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
