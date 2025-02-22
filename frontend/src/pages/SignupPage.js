import React, { useState } from "react";
import axios from "axios";
import API from "../utils/axiosInstance";

import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Input, Typography, Card, Image, message } from "antd";
import { MailOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";

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

const SignupPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    if (values.password !== values.confirmPassword) {
      message.error("Mật khẩu xác nhận không khớp!");
      return;
    }

    try {
      setLoading(true);
      const response = await API.post("/auth/register", {
        fullName: values.fullName,
        email: values.email,
        password: values.password,
      });

      localStorage.setItem("accessToken", response.data.accessToken);

      message.success("Đăng ký thành công!");
      navigate("/");
    } catch (error) {
      message.error(error.response?.data?.message || "Đăng ký thất bại!");
    } finally {
      setLoading(false);
    }
  };

  const handleSignupWithGoogle = () => {
    window.location.href = "http://localhost:8000/api/auth/google";
  };

  return (
    <Container>
      <StyledCard>
        <Title level={3} style={{ textAlign: "center", marginBottom: 30 }}>
          Đăng ký
        </Title>
        <Form name="signup" layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="fullName"
            rules={[
              { required: true, message: "Vui lòng nhập họ và tên của bạn!" },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Nhập tên đầy đủ của bạn"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email của bạn!" },
              { type: "email", message: "Email không hợp lệ!" },
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
              { required: true, message: "Vui lòng nhập mật khẩu!" },
              // { min: 8, message: "Mật khẩu phải có ít nhất 8 ký tự!" },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Nhập mật khẩu"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Vui lòng xác nhận mật khẩu!" },
              // ({ getFieldValue }) => ({
              //   validator(_, value) {
              //     if (!value || getFieldValue("password") === value) {
              //       return Promise.resolve();
              //     }
              //     return Promise.reject(
              //       new Error("Mật khẩu xác nhận không khớp!")
              //     );
              //   },
              // }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Nhập lại mật khẩu"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <StyledButton type="primary" htmlType="submit" loading={loading}>
              Đăng ký
            </StyledButton>
          </Form.Item>
        </Form>

        <div style={{ textAlign: "center", marginTop: "16px" }}>
          Bạn đã có tài khoản? <StyledLink to="/login">Đăng nhập</StyledLink>
        </div>
      </StyledCard>
    </Container>
  );
};

export default SignupPage;
