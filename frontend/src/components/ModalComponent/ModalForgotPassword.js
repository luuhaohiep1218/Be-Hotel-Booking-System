import React, { useState } from "react";
import { Modal, notification, Spin } from "antd";
import styled from "styled-components";
import API from "../../utils/axiosInstance";

const SubscribeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: 20px;
  background-color: #fff;
  border-radius: 4px;
  color: #333;
`;

const Title = styled.p`
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  line-height: 28px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #d4d4d4;
  border-radius: 4px;
  background: transparent;
  transition: all 0.25s ease;
  &:focus {
    outline: none;
    border-color: #0d095e;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  margin-top: 20px;
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #0f0092;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.25s ease;
  &:hover {
    background-color: #07013d;
  }
`;

const ModalForgotPassword = ({ isModalOpen, setIsModalOpen }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCancel = () => {
    setEmail("");
    setIsModalOpen(false);
  };

  const handleSubmit = async () => {
    if (!email) {
      notification.error({
        message: "Lỗi",
        description: "Vui lòng nhập email của bạn",
      });
      return;
    }
    setLoading(true);
    try {
      await API.post("/auth/forgot-password", { email });
      notification.success({
        message: "Thành công",
        description:
          "Email đặt lại mật khẩu đã được gửi vào gmail cho bạn.Vui lòng vào gmail kiểm tra",
      });
      setEmail("");
      setIsModalOpen(false);
    } catch (error) {
      notification.error({
        message: "Lỗi",
        description: "Có lỗi xảy ra, vui lòng thử lại",
      });
    }
    setLoading(false);
  };

  return (
    <Modal
      open={isModalOpen}
      footer={null}
      onCancel={handleCancel}
      width={500}
      maskClosable={false}
    >
      <SubscribeContainer>
        <Title>Đặt lại mật khẩu</Title>

        <Input
          placeholder="Nhập email của bạn"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <SubmitButton onClick={handleSubmit}>Gửi</SubmitButton>
      </SubscribeContainer>
    </Modal>
  );
};

export default ModalForgotPassword;
