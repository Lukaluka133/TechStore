// components/chat_support
import React, { useState, useRef, useEffect } from 'react';

const ChatSupport = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const staffName = " Joel"; // Replace with actual staff name
  const staffPhoto = "https://www.iconpacks.net/icons/2/free-chat-support-icon-1721-thumb.png"; // Replace with a real staff photo URL

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    const newMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputValue('');

    // Simulate assistant's reply
    setTimeout(() => {
      const assistantReply = {
        id: messages.length + 2,
        text: "მალე დაგეხმარებით თქვენი პრობლემის მოგვარებაში!",
        sender: 'assistant',
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prevMessages) => [...prevMessages, assistantReply]);
    }, 500);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      {/* Chat Icon */}
      <button
        onClick={toggleChat}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: '#007bff',
          color: 'white',
          fontSize: '24px',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        💬
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '90px',
            right: '20px',
            width: '350px',
            height: '450px',
            backgroundColor: 'white',
            borderRadius: '10px',
            boxShadow: '0 5px 20px rgba(0,0,0,0.3)',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 1000,
            overflow: 'hidden',
          }}
        >
          {/* Chat Header */}
          <div
            style={{
              backgroundColor: '#007bff',
              color: 'white',
              padding: '15px',
              borderTopLeftRadius: '10px',
              borderTopRightRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <h4 style={{ margin: 0 }}>მხარდაჭერა: {staffName}</h4>
            <img
              src={staffPhoto}
              alt="Staff"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: '2px solid white',
              }}
            />
            <button
              onClick={toggleChat}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '20px',
                cursor: 'pointer',
              }}
            >
              &times;
            </button>
          </div>

          {/* Chat Messages */}
          <div
            style={{
              flexGrow: 1,
              padding: '15px',
              overflowY: 'auto',
              backgroundColor: '#f7f7f7',
            }}
          >
            {messages.length === 0 && (
                <p style={{ textAlign: 'center', color: '#555' }}>ახალი ჩატის დაწყება...</p>
            )}
            {messages.map((message) => (
              <div
                key={message.id}
                style={{
                  display: 'flex',
                  justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                  marginBottom: '10px',
                }}
              >
                <div
                  style={{
                    backgroundColor: message.sender === 'user' ? '#dcf8c6' : '#e0e0e0',
                    borderRadius: '10px',
                    padding: '8px 12px',
                    maxWidth: '80%',
                    wordBreak: 'break-word',
                    fontSize: '14px',
                  }}
                >
                  {message.text}
                  <div style={{ fontSize: '10px', color: '#777', marginTop: '5px', textAlign: message.sender === 'user' ? 'right' : 'left' }}>
                    {message.timestamp}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <form
            onSubmit={handleSendMessage}
            style={{
              padding: '15px',
              borderTop: '1px solid #eee',
              display: 'flex',
            }}
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="შეიყვანეთ თქვენი შეტყობინება..."
              style={{
                flexGrow: 1,
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                marginRight: '10px',
              }}
            />
            <button
              type="submit"
              style={{
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                padding: '10px 15px',
                cursor: 'pointer',
              }}
            >
              გაგზავნა
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatSupport;