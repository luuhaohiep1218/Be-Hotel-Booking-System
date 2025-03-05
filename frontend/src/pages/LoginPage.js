import React, { useState } from "react";
import API from "../utils/axiosInstance";

import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Input, Typography, Card, Image, message } from "antd";

import { MailOutlined, LockOutlined } from "@ant-design/icons";
import ModalForgotPassword from "../components/ModalComponent/ModalForgotPassword";
import { useHotelBooking } from "../context/HotelBookingContext";

const { Title } = Typography;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 90vh;
  background-color: #f3f4f6;
`;

const StyledCard = styled(Card)`
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 500px;
  background: #fff;
  height: 600px;
`;

const StyledButton = styled(Button)`
  width: 100%;
  height: 40px;
  background: black;
  color: white;
  &:hover {
    background: #333;
  }
`;

const StyledLink = styled(Link)`
  color: #1890ff;
  &:hover {
    text-decoration: underline;
  }
`;

const SocialButton = styled(Button)`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginPage = () => {
  const navigate = useNavigate();

  const { setAccessToken, setUser } = useHotelBooking(); // 🔥 Lấy từ Context

  const [isModalOpen, setIsModalOpen] = useState(false);

  const onFinish = async (values) => {
    try {
      const { data } = await API.post("/auth/login", values);

      // 🟢 Cập nhật trạng thái đăng nhập
      localStorage.setItem("accessToken", data.accessToken);
      setAccessToken(data.accessToken);
      setUser(data.user); // 🔥 Lưu thông tin user vào context

      message.success("Đăng nhập thành công!");
      navigate("/");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Lỗi không xác định!";

      // 🟡 Nếu lỗi 401 (Sai email/mật khẩu), hiển thị thông báo cụ thể
      if (error.response?.status === 401) {
        message.error("Sai email hoặc mật khẩu! Vui lòng kiểm tra lại.");
      } else {
        message.error(`Lỗi đăng nhập: ${errorMessage}`);
      }
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleLoginWithGoogle = () => {
    window.location.href = "http://localhost:8000/api/auth/google";
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  return (
    <Container>
      <StyledCard>
        <Title level={3} style={{ textAlign: "center", marginBottom: 30 }}>
          Đăng nhập
        </Title>
        <Form
          name="login"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email của bạn!" },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="Nhập email của bạn"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu của bạn!" },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Nhập mật khẩu của bạn"
              size="large"
            />
          </Form.Item>

          <div
            style={{
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
              marginBottom: "16px",
            }}
          >
            {/* <Checkbox>Remember me</Checkbox> */}
            <StyledLink to="#" onClick={showModal}>
              Quên mật khẩu?
            </StyledLink>
          </div>

          <Form.Item>
            <StyledButton type="primary" htmlType="submit">
              Đăng nhập
            </StyledButton>
          </Form.Item>
        </Form>

        <div style={{ textAlign: "center", marginTop: "16px" }}>
          Bạn chưa có tài khoản? <StyledLink to="/signup">Đăng ký</StyledLink>
        </div>

        <div style={{ textAlign: "center", margin: "16px 0" }}>Or With</div>

        <div style={{ display: "flex", gap: "10px" }}>
          <SocialButton onClick={handleLoginWithGoogle}>
            <Image
              width={23}
              preview={false}
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png"
            />
            Đăng nhập với Google
          </SocialButton>
        </div>
      </StyledCard>
      <ModalForgotPassword
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </Container>
  );
};

export default LoginPage;
