import { Button, Card, DatePicker, Input, message, Modal, Radio } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import InvoiceCard from "../components/InvoiceCard";
import { useHotelBooking } from "../context/HotelBookingContext";
import FailedModal from "./ModalComponent/FailedModal";
import SuccessModal from "./ModalComponent/SuccessModal";
const CheckoutRoomForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useHotelBooking();
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [bookingType, setBookingType] = useState("room");
  const [isModalFailedVisible, setIsModalFailedVisible] = useState(false);
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
      console.log("Selected Rooms from location state: ", location.state.selectedRooms);
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
    if (!value) return;

    const selectedDate = dayjs(value);
    const today = dayjs().startOf("day");

    if (field === "checkIn") {
      if (selectedDate.isBefore(today)) {
        message.error("Ngày nhận phòng không thể là quá khứ.");
        return;
      }
      setFormData({ ...formData, checkIn: selectedDate });
    }

    if (field === "checkOut") {
      if (!formData.checkIn) {
        message.error("Vui lòng chọn ngày nhận phòng trước.");
        return;
      }

      const checkInDate = dayjs(formData.checkIn);
      if (selectedDate.isSame(checkInDate) || selectedDate.isBefore(checkInDate)) {
        message.error("Ngày trả phòng phải sau ngày nhận phòng.");
        return;
      }

      setFormData({ ...formData, checkOut: selectedDate });
    }
  };

  const handlePayment = async () => {
    console.log("Handling payment with form data: ", formData);
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
        setLoading(false);
      } else {
        const orderId = Date.now().toString();
        localStorage.setItem("orderId", JSON.stringify(orderId));
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
      console.error("Error during payment process: ", error);
      message.error("Đã xảy ra lỗi khi đặt phòng.");
    } finally {
      setLoading(false);
    }
  };

  const handleBookingSuccess = async () => {
    console.log("Handling booking success");
    try {
      const validRooms = selectedRooms.filter((room) => room.count > 0);
      if (validRooms.length === 0) {
        localStorage.removeItem("selectedRooms");
        Modal.error({
          title: "Lỗi",
          content: "Không tìm thấy phòng nào để đặt.",
        });
        return;
      }

      const formattedRooms = validRooms.map((room) => ({
        roomId: room.roomId ? room.roomId.toString() : "",
        quantity: room.count,
      }));

      localStorage.setItem("selectedRooms", JSON.stringify(formattedRooms));

      const bookingData = {
        userId: user._id,
        rooms: formattedRooms,
        checkIn: formData.checkIn.toISOString(),
        checkOut: formData.checkOut.toISOString(),
        price: totalPrice,
        paymentMethod: formData.paymentMethod,
        paymentStatus: formData.paymentMethod === "counter" ? "pending" : "paid",
        notes: formData.notes,
        status: "pending",
        type: bookingType,
      };

      await axios.post("http://localhost:8000/api/booking/rooms", bookingData);

      navigate("/");

    } catch (error) {
      console.error("Error during booking success: ", error);
      message.error("Lỗi khi lưu thông tin đặt phòng.");
    }
  };

  return (
    <Container>
      <Row>
        <Col md={6}>
          <Card title="Danh sách phòng đã đặt">
            {selectedRooms
              .filter((room) => room.count > 0)
              .map((room, index) => (
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
            <DatePicker
              placeholder="Chọn ngày nhận phòng"
              value={formData.checkIn}
              onChange={(value) => handleDateChange("checkIn", value)}
            />
            <DatePicker
              placeholder="Chọn ngày trả phòng"
              value={formData.checkOut}
              onChange={(value) => handleDateChange("checkOut", value)}
            />
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
                  handleBookingSuccess();
                }
              }}
            />
            <FailedModal isVisible={isModalFailedVisible} onClose={() => setIsModalVisible(false)} />
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
