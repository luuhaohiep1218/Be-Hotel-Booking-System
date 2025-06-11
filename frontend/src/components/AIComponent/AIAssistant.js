import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { fetchAIAssistantResponse } from "../../services/AIAssistantAPI";
import CopilotInput from "./CopilotInput"; // Ô nhập tin nhắn

const AIContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 380px;
  width: 340px;
  height: 520px;
  background: white;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  display: ${(props) => (props.show ? "flex" : "none")};
  flex-direction: column;
  z-index: 1000;
`;

const ChatWindow = styled.div`
  flex-grow: 1;
  padding: 15px;
  overflow-y: auto;
  max-height: 400px;
  display: flex;
  flex-direction: column;
`;

const Message = styled.div`
  padding: 10px;
  border-radius: 8px;
  margin: 5px 0;
  background: ${(props) => (props.isUser ? "#22acbf" : "#f0f0f0")};
  color: ${(props) => (props.isUser ? "white" : "black")};
  align-self: ${(props) => (props.isUser ? "flex-end" : "flex-start")};
`;

const AIAssistant = ({ showAI, toggleAI, user }) => {
  const [messages, setMessages] = useState([{ text: "Xin chào! Tôi có thể giúp gì cho bạn?", isUser: false }]);
  const chatRef = useRef(null);

  const handleSendMessage = async (message) => {
    if (!message.trim()) return;
    const newMessages = [...messages, { text: message, isUser: true }];
    setMessages(newMessages);
    
    const aiResponse = await fetchAIAssistantResponse(message, user);
    setMessages([...newMessages, { text: aiResponse, isUser: false }]);
  };

  useEffect(() => {
    chatRef.current?.scrollTo(0, chatRef.current.scrollHeight);
  }, [messages]);

  return (
    <AIContainer show={showAI}>
      <ChatWindow ref={chatRef}>
        {messages.map((msg, index) => (
          <Message key={index} isUser={msg.isUser}>{msg.text}</Message>
        ))}
      </ChatWindow>
      <CopilotInput onSend={handleSendMessage} />
    </AIContainer>
  );
};

export default AIAssistant;
