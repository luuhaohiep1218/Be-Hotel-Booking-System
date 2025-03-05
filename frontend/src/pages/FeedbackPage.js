import React, { useState } from "react";
import styled from "styled-components";
import { Card, Rate, Input, Button, Flex, message } from "antd";
import UploadImage from "../components/UploadImage";
import API from "../utils/axiosInstance"; // Import API instance

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
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]); // Danh sách ảnh

  const desc = ["Tệ hại", "Dở", "Bình thường", "Tốt", "Tuyệt vời"];

  const handleSubmit = async () => {
    if (!feedback.trim()) {
      message.warning("Vui lòng nhập nội dung đánh giá!");
      return;
    }

    setLoading(true);
    const accessToken = localStorage.getItem("accessToken");

    try {
      let imageUrls = [];

      if (fileList.length > 0) {
        const formData = new FormData();
        fileList.forEach((file) => {
          formData.append("files", file.originFileObj);
        });

        // ✅ Chỉ upload ảnh khi nhấn "Gửi đánh giá"
        const uploadResponse = await API.post("/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        });

        imageUrls = uploadResponse.data.imageUrls || [];
      }

      // ✅ Sau khi upload ảnh thành công, gửi dữ liệu đánh giá
      const response = await API.post(
        "/feedback",
        {
          rating: value,
          comment: feedback,
          images: imageUrls,
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      message.success("Cảm ơn bạn đã gửi đánh giá!");
      setFeedback("");
      setValue(5);
      setFileList([]); // ✅ Xóa file sau khi gửi thành công
    } catch (error) {
      if (error.response?.status === 401) {
        message.error("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại!");
        localStorage.removeItem("accessToken");
        window.location.href = "/login";
      } else {
        message.error("Gửi đánh giá thất bại, vui lòng thử lại!");
      }
    } finally {
      setLoading(false);
    }
  };

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
            placeholder="Viết đánh giá của bạn..."
            maxLength={200}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
          <UploadImage fileList={fileList} setFileList={setFileList} />
          <Button
            type="primary"
            style={{ marginTop: "15px" }}
            onClick={handleSubmit}
            loading={loading}
          >
            Gửi đánh giá
          </Button>
        </Flex>
      </StyledCard>
    </Container>
  );
};

export default FeedbackPage;
