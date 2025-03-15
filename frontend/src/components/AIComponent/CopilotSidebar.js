import { useCopilotChat } from "@copilotkit/react-core";
import React from "react";
import "./Copilot.css";
const CopilotSidebar = () => {
  const { messages = [], sendMessage } = useCopilotChat();


  return (
    <div className="copilot-sidebar">
      <h3>Chat hỗ trợ</h3>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <p key={index}>{msg.text}</p>
        ))}
      </div>
      <input
        type="text"
        placeholder="Nhập câu hỏi..."
        onKeyDown={(e) => {
          if (e.key === "Enter") sendMessage(e.target.value);
        }}
      />
    </div>
  );
};

export default CopilotSidebar;