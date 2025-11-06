import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMessages,
  addMessage,
  setMessages,
} from "../../redux/messageSlice";
import SendIcon from "@mui/icons-material/Send";
import profile from "../../assets/profile/profile.jpeg";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import socket from "../../utils/socket";


function ChatWindow() {
  const dispatch = useDispatch();
  const { messages, loading, error } = useSelector((state) => state.messages);
  const user = useSelector((state) => state.auth.user);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  const [activeUsers, setActiveUsers] = useState(0);
  
  // Socket: track active users
   useEffect(() => {
     // Listen for active users update
     socket.on("activeUsers", (count) => {
       setActiveUsers(count);
     });

     return () => {
       socket.off("activeUsers");
     };
   }, []);

  // Fetch messages on mount
  useEffect(() => {
    if (!user) return;

    const loadMessages = async () => {
      try {
        const msgs = await dispatch(fetchMessages()).unwrap();
        const marked = msgs.map((msg) => ({
          ...msg,
          isMine: msg.senderId === user._id,
        }));
        dispatch(setMessages(marked));
      } catch (err) {
        console.error(err);
      }
    };

    loadMessages();
  }, [dispatch, user]);

  // Socket: receive messages from others
  useEffect(() => {
    if (!user) return;

    const handleReceive = (msg) => {
      dispatch(addMessage({ ...msg, isMine: false }));
    };

    const handleSent = (msg) => {
      // Update sender message with DB _id
      dispatch(addMessage({ ...msg, isMine: true }));
    };

    socket.on("receiveMessage", handleReceive);
    socket.on("messageSent", handleSent);

    return () => {
      socket.off("receiveMessage", handleReceive);
      socket.off("messageSent", handleSent);
    };
  }, [dispatch, user]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!user || !newMessage.trim()) return;

    socket.emit("sendMessage", {
      senderId: user._id,
      message: newMessage,
    });

    setNewMessage(""); // clear input
  };

  const navigate = useNavigate();
  const handleBack = () => {
    // Handle back button click
    navigate(-1);
  };

  return (
    <div className="flex flex-col h-screen w-full bg-gray-100">
      {/* Header */}
      <div className="flex justify-between items-center p-3 bg-white shadow-sm">
        <div className="flex items-center gap-3">
          {/* //back button */}
          <button className=" lg:hidden" onClick={handleBack}>
            <ArrowBackIcon />
          </button>
          <img src={profile} alt="profile" className="h-12 w-12 rounded-full" />
          <div>
            <span className="font-semibold">Global Chat Room</span>
            <span className="text-sm text-gray-600 block"> {activeUsers} users online </span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {loading && <p>Loading messages...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`flex ${msg.isMine ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xs md:max-w-md p-2 rounded-xl shadow-sm ${
                msg.isMine
                  ? "bg-green-500 text-white rounded-br-none"
                  : "bg-white text-gray-800 rounded-bl-none"
              }`}
            >
              {!msg.isMine && (
                <div>
                  {/* Sender info */}
                  <div className="flex items-center gap-2 mb-1">
                    <img
                      src={profile}
                      alt={msg.senderName}
                      className="h-5 w-5 rounded-full object-cover"
                    />
                    <p className="font-medium text-sm">{msg.senderName}</p>
                  </div>

                  {/* Message text */}
                  <p>{msg.message}</p>

                  {/* Timestamp */}
                  <span className="text-xs text-gray-500 block text-right">
                    {new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              )}

              {msg.isMine && (
                <div>
                  <p>{msg.message}</p>
                  <span className="text-xs text-gray-200 block text-right">
                    {new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="flex items-center gap-3 p-3 bg-white shadow-inner">
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />
        <button
          onClick={handleSend}
          className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full"
        >
          <SendIcon />
        </button>
      </div>
    </div>
  );
}

export default ChatWindow;
