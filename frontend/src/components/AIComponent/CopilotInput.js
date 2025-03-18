import React, { useState } from "react";
import styled from "styled-components";

const InputContainer = styled.div`
  display: flex;
  padding: 10px;
  border-top: 1px solid #ccc;
`;

const InputField = styled.input`
  flex-grow: 1;
  padding: 8px;
  border: none;
  outline: none;
`;

const SendButton = styled.button`
  padding: 8px 12px;
  border: none;
  background: #22acbf;
  color: white;
  cursor: pointer;
  &:hover {
    background: #1a8fa0;
  }
`;

const CopilotInput = ({ onSend }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSend(message);
      setMessage("");
    }
  };

  return (
    <InputContainer>
      <InputField value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Nhập tin nhắn..." />
      <SendButton onClick={handleSend}>Gửi</SendButton>
    </InputContainer>
  );
};

export default CopilotInput;
