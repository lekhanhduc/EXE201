import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";
import "./style.scss";

interface Message {
  text: string;
  sender: "user" | "ai";
}

const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false); // Kiểm tra trạng thái mở/đóng chat
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Toggle mở/đóng chat
  const toggleChat = () => {
    setIsChatOpen((prevState) => !prevState);
  };

  const handleSendMessage = () => {
    if (input.trim()) {
      const newMessages: Message[] = [
        { text: input, sender: "user" },
        { text: "AI đang trả lời...", sender: "ai" },
      ];

      setMessages((prevMessages) => [...prevMessages, ...newMessages]);
      setInput("");

      // Giả lập phản hồi AI sau 1 giây
      setTimeout(() => {
        const updatedMessages = newMessages.map((msg) =>
          msg.sender === "ai" ? { ...msg, text: "Đây là phản hồi của AI." } : msg
        );
        setMessages((prevMessages) => [...prevMessages, ...updatedMessages]);
      }, 1000);
    }
  };

  // Cuộn đến tin nhắn mới mỗi khi messages thay đổi
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="chatbox-container">
      {/* Thay thế button bằng icon chat */}
      <div
        className={`chatbox-button ${isChatOpen ? "open" : ""}`}
        onClick={toggleChat}
      >
        <FontAwesomeIcon icon={faComments} size="1x" />
      </div>

      {/* Khung chat khi isChatOpen là true */}
      {isChatOpen && (
        <div className="chatbox">
          <div className="chatbox-header">
            <h3>Soaring event AI</h3>
            <button className="close-button" onClick={toggleChat}>
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
            <button onClick={handleSendMessage}>Gửi</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
