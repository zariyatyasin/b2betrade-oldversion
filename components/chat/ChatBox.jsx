// ChatBox.js
import React, { useState } from "react";

const ChatBox = ({ storeName, onClose }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSendMessage = () => {
    if (message.trim() === "") {
      return; // Don't send empty messages
    }

    // Update state to include the new message
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: message, sender: "user" },
    ]);

    // Clear the message input after sending
    setMessage("");
  };

  return (
    <div className="fixed z-50 bottom-0 flex items-end justify-center px-4 pb-6 pointer-events-none sm:p-0 sm:items-start sm:justify-end">
      <div className="max-w-md w-full mx-auto bg-white shadow-md rounded-md overflow-hidden sm:rounded-lg pointer-events-auto">
        {/* Chat header */}
        <div className="bg-gray-200 px-4 py-2 flex items-center justify-between">
          <span className="font-semibold">{storeName}</span>
          <button onClick={onClose}>&times;</button>
        </div>

        {/* Chat messages */}
        <div className="p-4 max-h-96 overflow-y-auto">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-2 ${
                msg.sender === "user" ? "text-right" : "text-left"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        {/* Message input */}
        <div className="p-4 border-t border-gray-200">
          <input
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full border rounded-md py-2 px-3"
          />
          <button
            onClick={handleSendMessage}
            className="mt-2 bg-green-500 text-white rounded-md py-2 px-4"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
