import { useState } from "react";
import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import { Form, Input, Button, Typography, Card, Row, Col } from "antd";
import styled from "styled-components";

const { Title, Paragraph } = Typography;

const Container = styled.div`
  padding: 16px;
  max-width: 900px;
  margin: auto;
`;

const StyledCard = styled(Card)`
  background: white;
  padding: 32px;
  border-radius: 40px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
  margin-top: 16px;
  text-align: center;
`;

const StyledButton = styled(Button)`
  width: 100%;
  background: #22acc1;
  border-radius: 40px;
  border: none;
  font-size: 16px;
  font-weight: bold;
  height: 48px;
  &:hover {
    background: #52c7b8;
  }
`;

const MapContainer = styled.div`
  width: 100%;
  height: 400px;
`;

const center = {
  lat: 21.016573,
  lng: 105.829216,
};

const ContactPage = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const [markerPosition] = useState(center);

  return (
    <>
      <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
        <MapContainer>
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "100%" }}
            center={center}
            zoom={15}
          >
            <Marker position={markerPosition} />
          </GoogleMap>
        </MapContainer>
      </LoadScript>
      <Container>
        <StyledCard>
          <Title level={2}>Khám phá Hạ Long thông qua Du thuyền</Title>
          <Paragraph>
            Khám phá Hạ Long qua Du thuyền cùng Mixivivu - Hãy liên hệ ngay để
            trải nghiệm hành trình tuyệt vời!
          </Paragraph>

          <Form
            name="basic"
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Họ và tên"
              name="username"
              rules={[{ required: true, message: "Bạn phải nhập họ và tên" }]}
            >
              <Input placeholder="Nhập họ và tên" />
            </Form.Item>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      type: "email",
                      message: "Bạn phải nhập email",
                    },
                  ]}
                >
                  <Input placeholder="Nhập email" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Số điện thoại"
                  name="phone"
                  rules={[
                    {
                      required: true,
                      pattern: /^[0-9]{10}$/,
                      message: "Bạn phải nhập số điện thoại",
                    },
                  ]}
                >
                  <Input placeholder="Nhập số điện thoại" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              label="Nội dung"
              name="content"
              rules={[
                { required: true, message: "Bạn cần nhập nội dung yêu cầu" },
              ]}
            >
              <Input.TextArea placeholder="Nhập yêu cầu của bạn" rows={4} />
            </Form.Item>

            <Form.Item>
              <StyledButton type="primary" htmlType="submit">
                Liên hệ với Mixivivu →
              </StyledButton>
            </Form.Item>
          </Form>
        </StyledCard>
      </Container>
    </>
  );
};

export default ContactPage;
