import React, { useState } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    if (message.trim() === '') return;

    // Add user's message to chat
    const userMsg = { from: 'user', text: message };
    setChat([...chat, userMsg]);

    // Send to backend
    const response = await fetch('http://127.0.0.1:5000/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();
    const botMsg = { from: 'bot', text: data.reply };
    setChat(prev => [...prev, botMsg]);
    setMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <div className="chat-container">
      <h1>Flask Chat</h1>
      <div className="chat-box">
        {chat.map((msg, index) => (
          <div key={index} className={`msg ${msg.from}`}>
            <span>{msg.text}</span>
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;
