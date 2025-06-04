import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";
import logo_event from "../../assets/logo.png";
import "./style.scss";

interface Message {
  text: string;
  sender: "user" | "ai";
}

const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Bắt đầu ẩn popup
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPopupOpen(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    let hideTimer: NodeJS.Timeout;

    if (isPopupOpen) {
      hideTimer = setTimeout(() => {
        setIsPopupOpen(false);
      }, 8000);
    }

    return () => {
      if (hideTimer) clearTimeout(hideTimer);
    };
  }, [isPopupOpen]);

  const openChat = () => {
    setIsPopupOpen(false);
    setIsChatOpen(true);

    setMessages((prevMessages) => {
      const hasGreeting = prevMessages.some(
        (msg) => msg.sender === "ai" && msg.text.includes("How can we help you")
      );
      if (!hasGreeting) {
        return [
          ...prevMessages,
          {
            sender: "ai",
            text: "Welcome to Our Website Soaring Events. How can we help you?",
          },
        ];
      }
      return prevMessages;
    });
  };

  const closeChat = () => {
    setIsChatOpen(false);
    setIsTyping(false);
  };

  const toggleChat = () => {
    if (isChatOpen) {
      closeChat();
    } else {
      openChat();
    }
  };

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: input, sender: "user" },
      ]);
      setInput("");
      setIsTyping(true);

      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: "Đây là phản hồi của AI.", sender: "ai" },
        ]);
        setIsTyping(false);
      }, 1500);
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  return (
    <div className="chatbox-container">
      {isPopupOpen && (
        <div
          className="chatbox-popup"
          onClick={openChat}
          style={{ cursor: "pointer" }}
        >
          <div className="chatbox-popup-header">
            <img
              src={logo_event}
              alt="Mr Đạt"
              className="chatbox-popup-avatar"
            />
            <div className="chatbox-popup-info">
              <div className="chatbox-popup-name">Soaring Event</div>
              <div className="chatbox-popup-message">
                <strong>Welcome to Our Website Soaring Events.</strong> How can
                we help you?
              </div>
            </div>
          </div>
          <button className="chatbox-popup-send" onClick={openChat}>
            Send Message
          </button>
        </div>
      )}

      {isChatOpen && (
        <div className="chatbox">
          <div className="chatbox-header">
            <h3>Soaring event AI</h3>
            <button className="close-button" onClick={closeChat}>
              &times;
            </button>
          </div>

          <div className="chatbox-messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`chatbox-message chatbox-message--${message.sender}`}
              >
                {message.text}
              </div>
            ))}

            {isTyping && (
              <div className="chatbox-message chatbox-message--ai typing-indicator">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbox-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Nhập tin nhắn..."
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      )}

      {!isChatOpen && !isPopupOpen && (
        <div className="chatbox-button" onClick={toggleChat}>
          <FontAwesomeIcon icon={faComments} size="1x" />
        </div>
      )}
    </div>
  );
};

export default ChatBox;
