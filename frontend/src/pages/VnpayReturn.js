import { message, Spin } from "antd";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SuccessModal from "../components/ModalComponent/SuccessModal"; // Import modal

const VnpayReturn = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isProcessingRef = useRef(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    if (isProcessingRef.current) return;
    isProcessingRef.current = true;

    const query = new URLSearchParams(location.search);
    const vnp_ResponseCode = query.get("vnp_ResponseCode");
    const orderId = query.get("vnp_TxnRef");
    const amount = query.get("vnp_Amount");
    
    if (!orderId || !amount) {
      message.error("Lỗi: Không tìm thấy thông tin giao dịch.");
      navigate("/");
      return;
    }

    const handleBookingSuccessVnPay = async () => {
      try {
        const selectedRooms = JSON.parse(localStorage.getItem("selectedRooms")) || [];
        const formData = JSON.parse(localStorage.getItem("formData")) || {};
        const user = JSON.parse(localStorage.getItem("user")) || {};

        if (!user._id || !selectedRooms.length) {
          message.error("Lỗi: Không tìm thấy thông tin đặt phòng.");
          navigate("/checkout");
          return;
        }

        const formattedRooms = selectedRooms.map((room) => ({
          roomId: room.roomId?.toString() || "",
          quantity: room.count || 0,
        }));

        const bookingData = {
          userId: user._id,
          type: "room",
          rooms: formattedRooms,
          checkIn: formData.checkIn || "",
          checkOut: formData.checkOut || "",
          price: amount / 100,
          paymentMethod: "vnpay",
          paymentStatus: "paid",
          status: "confirmed",
          transactionId: orderId,
        };

        await axios.post("http://localhost:8000/api/booking/rooms", bookingData);
        
        localStorage.removeItem("selectedRooms");
        localStorage.removeItem("formData");

        setIsModalVisible(true); // Hiển thị modal thành công

      } catch (error) {
        message.error("Lỗi khi lưu thông tin đặt phòng.");
        navigate("/payment-failed");
      }
    };

    if (vnp_ResponseCode === "00") {
      console.log("✅ Thanh toán thành công, bắt đầu tạo đơn đặt phòng...");
      handleBookingSuccessVnPay();
    } else {
      message.error("Thanh toán thất bại. Vui lòng thử lại.");
      navigate("/checkout");
    }
  }, [location]);

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <Spin size="large" />
      <SuccessModal isVisible={isModalVisible} onClose={() => navigate("/room-list")} />
    </div>
  );
};

export default VnpayReturn;
