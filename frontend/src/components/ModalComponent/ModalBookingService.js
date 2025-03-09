import React, { useState, useEffect } from "react";
import { Modal, Form, Button, message, Image } from "antd";
import styled from "styled-components";
import API, { refreshAccessToken } from "../../utils/axiosInstance";
import { useHotelBooking } from "../../context/HotelBookingContext";
import { useNavigate } from "react-router-dom";

// Styled Components
const StyledModal = styled(Modal)`
  .ant-modal-content {
    border-radius: 12px;
    padding: 16px;
  }
`;

const StyledCard = styled.div`
  display: flex;
  align-items: center;
  background: #fff;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const ServiceInfo = styled.div`
  flex: 1;
  padding-left: 16px;
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 4px;
`;

const PriceText = styled.h3`
  font-size: 18px;
  font-weight: bold;
  color: #22acc1;
  margin: 4px 0;
`;

const CounterWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #ddd;
  border-radius: 20px;
  padding: 4px 12px;
  width: 120px;
`;

const CounterButton = styled.button`
  border: none;
  background: transparent;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    color: #22acc1;
  }

  &:disabled {
    color: #ccc;
    cursor: not-allowed;
  }
`;

const QuantityText = styled.span`
  font-size: 16px;
  font-weight: bold;
`;

const ButtonGroup = styled.div`
  text-align: right;
  margin-top: 16px;
`;

const CancelButton = styled(Button)`
  border-radius: 8px;
  padding: 8px 16px;
  background: #ddd;
  color: black;

  &:hover {
    background: #ccc;
  }
`;

const ConfirmButton = styled(Button)`
  border-radius: 8px;
  padding: 8px 16px;
  background: #22acc1;
  color: white;

  &:hover {
    background: #00704d;
  }
`;

const TotalAmountWrapper = styled.div`
  margin-top: 16px;
`;

const TotalAmountLabel = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: #000;
`;

const TotalAmountValue = styled.p`
  font-size: 28px;
  font-weight: bold;
  color: #023d38;
  margin: 4px 0;
`;

const ModalBookingService = ({ isModalOpen, setIsModalOpen, service }) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { user, accessToken, setAccessToken } = useHotelBooking();

  const [totalPrice, setTotalPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (service) {
      setTotalPrice(service.price);
      form.setFieldsValue({ quantity: 1 });
    }
  }, [service, form]);

  const handleQuantityChange = (value) => {
    if (value < 1) return;
    setQuantity(value);
    setTotalPrice(service.price * value);
    form.setFieldsValue({ quantity: value });
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setQuantity(1);
    setTotalPrice(service?.price || 0);
    form.resetFields();
  };

  const handleConfirm = async () => {
    console.log("🔹 Access Token before request:", accessToken);

    // Kiểm tra accessToken CHỈ khi nhấn nút "Xác nhận"
    if (!user || !accessToken) {
      message.warning("Bạn cần đăng nhập để đặt dịch vụ!");
      navigate("/login");
      return;
    }

    try {
      const values = await form.validateFields();
      await API.post(
        "/booking/service",
        { userId: user._id, serviceId: service._id, quantity: values.quantity },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      message.success("Đặt dịch vụ thành công!");
      handleClose();
    } catch (error) {
      if (error.response?.status === 401) {
        try {
          const newToken = await refreshAccessToken();
          setAccessToken(newToken);
          localStorage.setItem("accessToken", newToken); // Lưu token mới

          await API.post(
            "/booking/service",
            {
              userId: user._id,
              serviceId: service._id,
              quantity: form.getFieldValue("quantity"),
            },
            { headers: { Authorization: `Bearer ${newToken}` } }
          );

          message.success("Đặt dịch vụ thành công!");
          handleClose();
        } catch (refreshError) {
          message.error("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại!");
          navigate("/login");
        }
      } else {
        message.error("Đặt dịch vụ thất bại, vui lòng thử lại!");
      }
    }
  };

  return (
    <StyledModal
      title="Đặt dịch vụ"
      open={isModalOpen}
      onCancel={handleClose}
      footer={null}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{ quantity: 1 }}
        autoComplete="off"
      >
        <StyledCard>
          <Image
            width={100}
            height={100}
            src={service?.images[0]}
            style={{ borderRadius: 12 }}
          />
          <ServiceInfo>
            <Title>{service?.title}</Title>
            <PriceText>{service?.price?.toLocaleString()} VND</PriceText>
          </ServiceInfo>
          <Form.Item name="quantity" label="Số lượng" shouldUpdate={false}>
            <CounterWrapper>
              <CounterButton
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity === 1}
              >
                −
              </CounterButton>
              <QuantityText>{quantity}</QuantityText>
              <CounterButton onClick={() => handleQuantityChange(quantity + 1)}>
                +
              </CounterButton>
            </CounterWrapper>
          </Form.Item>
        </StyledCard>

        <TotalAmountWrapper>
          <TotalAmountLabel>Tổng tiền</TotalAmountLabel>
          <TotalAmountValue>{totalPrice.toLocaleString()} đ</TotalAmountValue>
        </TotalAmountWrapper>

        <ButtonGroup>
          <CancelButton onClick={handleClose}>Hủy</CancelButton>
          <ConfirmButton type="primary" onClick={handleConfirm}>
            Xác nhận
          </ConfirmButton>
        </ButtonGroup>
      </Form>
    </StyledModal>
  );
};

export default ModalBookingService;
