import React from "react";
import styled from "styled-components";
import { Button, Form, Input, Typography, Card } from "antd";
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

const StyledLink = styled.a`
  color: #1890ff;
  &:hover {
    text-decoration: underline;
  }
`;

const SignupPage = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  return (
    <Container>
      <StyledCard>
        <Title level={3} style={{ textAlign: "center", marginBottom: 30 }}>
          Đăng ký
        </Title>
        <Form name="signup" layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="full-name"
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
          <Form.Item
            name="confirm-password"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập xác nhận mật khẩu của bạn!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Nhập xác nhận mật khẩu của bạn"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <StyledButton type="primary" htmlType="submit">
              Đăng ký
            </StyledButton>
          </Form.Item>
        </Form>

        <div style={{ textAlign: "center", marginTop: "16px" }}>
          Don't have an account? <StyledLink href="#">Đăng nhập</StyledLink>
        </div>
      </StyledCard>
    </Container>
  );
};

export default SignupPage;
