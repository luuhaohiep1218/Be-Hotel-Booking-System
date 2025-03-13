import { Button, Card, DatePicker, Input, message, Radio } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import InvoiceCard from "../components/InvoiceCard";
import { useHotelBooking } from "../context/HotelBookingContext";
import SuccessModal from "./ModalComponent/SuccessModal";

const CheckoutRoomForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useHotelBooking();
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [formData, setFormData] = useState({
    fullName: user?.full_name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    paymentMethod: "counter",
    notes: "",
    checkIn: location.state?.checkIn ? dayjs(location.state.checkIn) : null,
    checkOut: location.state?.checkOut ? dayjs(location.state.checkOut) : null,
  });

  useEffect(() => {
    if (location.state?.selectedRooms) {
      setSelectedRooms(location.state.selectedRooms);
    }
  }, [location.state]);

  const totalPrice = selectedRooms.reduce((sum, room) => sum + room.count * room.price, 0);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePaymentChange = (e) => {
    setFormData({ ...formData, paymentMethod: e.target.value });
  };

  const handleDateChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

const handlePayment = async () => {
  if (!formData.fullName || !formData.email || !formData.phone) {
    message.error("Vui lòng nhập đầy đủ thông tin!");
    return;
  }

  if (!formData.checkIn || !formData.checkOut) {
    message.error("Vui lòng chọn ngày nhận và trả phòng!");
    return;
  }

  if (!totalPrice || totalPrice <= 0) {
    message.error("Lỗi: Tổng tiền không hợp lệ!");
    return;
  }

  if (!user?._id) {
    message.error("Lỗi: Không tìm thấy User ID, vui lòng đăng nhập!");
    return;
  }

  setLoading(true);

  try {
    if (formData.paymentMethod === "counter") {
      setIsModalVisible(true); 
      setLoading(false); // Giữ trạng thái để không gọi 2 lần
    } else {
      const orderId = Date.now().toString();

      localStorage.setItem("selectedRooms", JSON.stringify(selectedRooms));
      localStorage.setItem("formData", JSON.stringify(formData));
      localStorage.setItem("user", JSON.stringify(user));

      const vnpayResponse = await axios.post(
        "http://localhost:8000/api/vnpay/create-payment",
        {
          amount: totalPrice,
          orderId: orderId,
          returnUrl: `${window.location.origin}/return-vnpay`,
        }
      );

      if (vnpayResponse.data.paymentUrl) {
        window.location.href = vnpayResponse.data.paymentUrl;
      } else {
        message.error("Lỗi khi tạo thanh toán VNPay.");
      }
    }
  } catch (error) {
    message.error("Đã xảy ra lỗi khi đặt phòng.");
  } finally {
    setLoading(false);
  }
};

  const handleBookingSuccess = async () => {
      console.log("🟢 Gọi handleBookingSuccess");
    try {
      const formattedRooms = selectedRooms.map((room) => ({
        roomId: room.roomId ? room.roomId.toString() : "",
        quantity: room.count,
      }));

      const bookingData = {
        userId: user._id,
        type: "room",
        rooms: formattedRooms,
        checkIn: formData.checkIn.format("YYYY-MM-DD"),
        checkOut: formData.checkOut.format("YYYY-MM-DD"),
        price: totalPrice,
        paymentMethod: formData.paymentMethod,
        paymentStatus: formData.paymentMethod === "counter" ? "pending" : "paid",
        notes: formData.notes,
        status: "trống",
      };

      await axios.post("http://localhost:8000/api/booking/rooms", bookingData);
      message.success("Đặt phòng thành công!");
      navigate("/");
    } catch (error) {
      message.error("Lỗi khi lưu thông tin đặt phòng.");
    }
  };

  return (
    <Container>
      <Row>
        <Col md={6}>
          <Card title="Danh sách phòng đã đặt">
            {selectedRooms.map((room, index) => (
              <Card key={index} className="mb-4">
                <div>
                  <h3>{room.name}</h3>
                  <p>Số lượng: {room.count}</p>
                  <p>Giá: {room.price.toLocaleString()} đ</p>
                  <p>Tổng: {(room.count * room.price).toLocaleString()} đ</p>
                </div>
              </Card>
            ))}
          </Card>
          <Card>
            <h2>Thông tin đặt phòng</h2>
            <Input name="fullName" placeholder="Họ và tên" value={formData.fullName} onChange={handleInputChange} />
            <Input name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} />
            <Input name="phone" placeholder="Số điện thoại" value={formData.phone} onChange={handleInputChange} />
            <DatePicker placeholder="Chọn ngày nhận phòng" value={formData.checkIn} onChange={(value) => handleDateChange("checkIn", value)} />
            <DatePicker placeholder="Chọn ngày trả phòng" value={formData.checkOut} onChange={(value) => handleDateChange("checkOut", value)} />
            <Radio.Group onChange={handlePaymentChange} value={formData.paymentMethod}>
              <Radio value="counter">Thanh toán tại quầy</Radio>
              <Radio value="vnpay">VNPay</Radio>
            </Radio.Group>
            <Button type="primary" loading={loading} onClick={handlePayment}>Xác nhận thanh toán</Button>
            <SuccessModal 
  isVisible={isModalVisible} 
  onClose={() => {
    setIsModalVisible(false);
    if (!loading) {
      handleBookingSuccess();  // Đảm bảo chỉ chạy một lần
    }
  }} 
/>

          </Card>
        </Col>
        <Col md={6}>
          <InvoiceCard user={user} formData={formData} selectedRooms={selectedRooms} totalPrice={totalPrice} />
        </Col>
      </Row>
    </Container>
  );
};

export default CheckoutRoomForm;
