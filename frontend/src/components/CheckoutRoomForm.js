import { Button, Card, DatePicker, Input, message, Radio } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useHotelBooking } from "../context/HotelBookingContext";
import SuccessModal from "./ModalComponent/SuccessModal";
const CheckoutRoomForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [bookingId, setBookingId] = useState(null); // Thêm state để lưu bookingId
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    paymentMethod: "counter",
    notes: "",
    checkIn: location.state?.checkIn ? dayjs(location.state.checkIn) : null,
    checkOut: location.state?.checkOut ? dayjs(location.state.checkOut) : null,
  });

  const { user } = useHotelBooking();
  useEffect(() => { 
    console.log(selectedRooms);
    if (location.state?.selectedRooms) {
      setSelectedRooms(location.state.selectedRooms);
     
    }
  }, [location.state]);

  const totalPrice = selectedRooms.reduce(
    (sum, room) => sum + room.count * room.price,
    0
  );

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

  setLoading(true);

  try {
    if (!user._id) {
      message.error("Lỗi: Không tìm thấy User ID, vui lòng đăng nhập!");
      setLoading(false);
      return;
    }

    const formattedRooms = selectedRooms.map((room) => ({
      roomId: room.roomId.toString(),
      quantity: room.count,
    }));

    // === BƯỚC 1: Tạo booking trước khi thanh toán ===
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

    const bookingResponse = await axios.post(
      "http://localhost:8000/api/booking/rooms",
      bookingData
    );

    const newBookingId = bookingResponse.data.booking._id || bookingResponse.data._id;
    setBookingId(newBookingId);

    console.log("Booking ID:", newBookingId);

    // === BƯỚC 2: Nếu thanh toán tại quầy, hiện modal thành công ===
    if (formData.paymentMethod === "counter") {
      setIsModalVisible(true);
      setLoading(false);
      return;
    }

    // === BƯỚC 3: Nếu thanh toán bằng VNPay, sử dụng bookingId làm orderId ===
    const orderId = `${Date.now()}`;

    console.log("VNPay Payload:", {
      amount: totalPrice,
      orderId: orderId,
      returnUrl: window.location.origin + "/payment-success",
    });

    const vnpayResponse = await axios.post(
      "http://localhost:8000/api/vnpay/create-payment",
      {
        amount: totalPrice,
        orderId: orderId, // Dùng bookingId trong orderId
        returnUrl: window.location.origin + "/payment-success",
      }
    );

    console.log("VNPay Response:", vnpayResponse.data);

    if (vnpayResponse.data.paymentUrl) {
      window.location.href = vnpayResponse.data.paymentUrl;
    } else {
      message.error("Lỗi khi tạo thanh toán VNPay.");
    }
  } catch (error) {
    console.error("Lỗi đặt phòng:", error.response?.data || error.message);
    message.error("Đã xảy ra lỗi khi đặt phòng.");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="container mx-auto grid md:grid-cols-3 gap-6 p-6">
      <div className="md:col-span-2">
        <Card title="Danh sách phòng đã đặt">
          {selectedRooms.map((room, index) => (
            <Card key={index} className="mb-4">
              <div className="flex justify-between">
                <div>
                  <p>{room._id}</p>
                  <h3 className="text-lg font-medium">{room.name}</h3>
                  <p>Số lượng: {room.count}</p>
                  <p>Giá: {room.price.toLocaleString()} đ</p>
                </div>
                <p className="text-lg font-semibold">
                  {(room.count * room.price).toLocaleString()} đ
                </p>
              </div>
            </Card>
          ))}
        </Card>
      </div>

      <Card className="md:col-span-1 bg-gray-100 p-4">
        <h2 className="text-xl font-semibold mb-4">Hóa đơn</h2>
        {selectedRooms.map((room, index) => (
          <div key={index} className="flex justify-between">
            <span>{room.name} x{room.count}</span>
            <span>{(room.count * room.price).toLocaleString()} đ</span>
          </div>
        ))}
        <hr className="my-2" />
        <div className="flex justify-between font-bold">
          <span>Tổng tiền:</span>
          <span>{totalPrice.toLocaleString()} đ</span>
        </div>
      </Card>

      <Card className="md:col-span-3 p-6">
        <h2 className="text-xl font-semibold mb-4">Thông tin đặt phòng</h2>
        <div className="space-y-4">
          <Input
            type="text"
            name="fullName"
            placeholder="Họ và tên"
            value={formData.fullName}
            onChange={handleInputChange}
            required
          />
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <Input
            type="tel"
            name="phone"
            placeholder="Số điện thoại"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
          <DatePicker
            placeholder="Chọn ngày nhận phòng"
            value={formData.checkIn}
            onChange={(value) => handleDateChange("checkIn", value)}
            className="w-full"
          />
          <DatePicker
            placeholder="Chọn ngày trả phòng"
            value={formData.checkOut}
            onChange={(value) => handleDateChange("checkOut", value)}
            className="w-full"
          />
          <Radio.Group
            onChange={handlePaymentChange}
            value={formData.paymentMethod}
            className="w-full"
          >
            <Radio value="counter">Thanh toán tại quầy</Radio>
            <Radio value="vnpay">VNPay</Radio>
          </Radio.Group>
          <Button 
            type="primary" 
            loading={loading} 
            onClick={handlePayment} 
            className="w-full bg-blue-500"
          >
            Xác nhận thanh toán
          </Button>
           <SuccessModal 
        isVisible={isModalVisible} 
        onClose={() => setIsModalVisible(false)} 
      />
        </div>
      </Card>
    </div>
  );
};

export default CheckoutRoomForm;
