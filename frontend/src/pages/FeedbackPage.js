import React, { useState } from "react";
import styled from "styled-components";
import { Card, Rate, Input, Button, Flex } from "antd";
import UploadImage from "../components/UploadImage";

const { TextArea } = Input;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 90vh;
  background-color: #f8f9fa;
`;

const StyledCard = styled(Card)`
  width: 600px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Label = styled.p`
  font-size: 16px;
  margin: 10px 0;
`;

const FeedbackPage = () => {
  const [value, setValue] = useState(5);
  const [feedback, setFeedback] = useState("");

  const desc = ["Terrible", "Bad", "Normal", "Good", "Wonderful"];

  return (
    <Container>
      <StyledCard>
        <Title>Đánh giá từ những người đã trải nghiệm</Title>
        <Label>Bạn đánh giá trải nghiệm của mình thế nào?</Label>
        <Flex gap="middle" vertical>
          <Rate tooltips={desc} onChange={setValue} value={value} />
          <Label>
            Khách hàng chia sẻ về những kỷ niệm tuyệt vời trên chuyến du lịch
            với chúng tôi.
          </Label>
          <TextArea
            rows={6}
            placeholder="Write your feedback..."
            maxLength={200}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
          <UploadImage />
          <Button type="primary" style={{ marginTop: "15px" }}>
            Submit Feedback
          </Button>
        </Flex>
      </StyledCard>
    </Container>
  );
};

export default FeedbackPage;
