import React, { useState, useEffect, useRef } from 'react';
import landingimage from "../../images/Landingimage.png";
import sath from "../../images/sath.png";
import "./landing.css";

const Landing = () => {
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState([]);
  const [showChat, setShowChat] = useState(false);
  
  const chatContainerRef = useRef(null);

  const handleSendMessage = async () => {
    if (message.trim() !== '') {
      setShowChat(true);
      const userMessage = { role: 'user', content: message };
      setConversation(prevConversation => [...prevConversation, userMessage]);
     

      try {
        const requestBody = {
          user: message
        };

        const botReplyLoading = { role: 'bot', content:  'Generating reply...' };
        setConversation(prevConversation => [...prevConversation, botReplyLoading]);

        const response = await fetch('https://new-vms.azurewebsites.net/bot', {
          method: 'POST',
          body: JSON.stringify(requestBody),
          headers: {
            'Content-Type': 'application/json'
          }
        });

        const data = await response.json();
        const botReply = { role: 'bot', content: data.response };

        setConversation(prevConversation => [...prevConversation.slice(0, -1), botReply]);
      } catch (error) {
        console.error('Error fetching bot reply:', error);
        const botReplyError = { role: 'bot', content: 'Error fetching reply' };
        setConversation(prevConversation => [...prevConversation, botReplyError]);
      }

      setMessage('');
      
    }
  };

  const handleClearChat = () => {
    setConversation([]);
    setShowChat(false);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [conversation]);

  return (
    <div className={showChat ? 'chat-background' : 'landing-background'}>
      <div className={showChat ? 'chat-nav' : 'landing-nav'}>
        <p>VVMA</p>
        <p className='long-p'>A Virtual Visitor Management Assistant For All Your Inquiries</p>
        <img src={sath} alt="" srcSet="" />
      </div>

      {showChat ? (
        <div className='chat-container' ref={chatContainerRef}>
          <button className="clear-chat-button" onClick={handleClearChat}>
            <i className="fas fa-trash"></i> Clear Chat
          </button>

          {conversation.map((msg, index) => (
            <div key={index} className={msg.role === 'user' ? 'user-message' : 'bot-reply'}>
              {msg.content}
            </div>
          ))}

      

          <div className='chat-input-container'>
            <input
              type="text"
              name=""
              id="text-area"
              placeholder='Enter Your Message'
              className='input-text'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button onClick={handleSendMessage}>
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      ) : (
        <div className='landing-img'>
          <img src={landingimage} alt=" " srcSet="" />
          <h1>SATH VVMA</h1>
          <p>Ask anything</p>

          <div className='input-container'>
            <input
              type="text"
              name=""
              id="text-area"
              placeholder='Enter Your Message'
              className='input-text'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button onClick={handleSendMessage}>
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Landing;
