import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./App.css";

const socket = io.connect("http://localhost:5000");

const App = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");

  // Use useRef to track if the effect has run already
  useEffect(() => {
    if (!username) {
      const user = prompt("Enter your name:") || "Anonymous";
      setUsername(user);
    }
  }, []);

  useEffect(() => {
    const handleMessage = (msg) => {
      setMessages((prev) => [...prev, msg]); // Only update on receiving
    };
  
    socket.on("receiveMessage", handleMessage);
  
    return () => {
      socket.off("receiveMessage", handleMessage); // Cleanup listener
    };
  }, []);
  

  const sendMessage = () => {
    if (message.trim() !== "") {
      const newMessage = { message, sender: username };
      socket.emit("sendMessage", newMessage); // Send only
      setMessage(""); // Clear input field
    }
  };
  

  return (
    <div className="chat-container">
      <div className="chat-header">Chat - {username}</div>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.sender === username ? "sent" : "received"}`}
          >
            <strong>{msg.sender}:</strong> {msg.message}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default App;
