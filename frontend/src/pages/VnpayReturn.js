import { message, Spin } from "antd";
import axios from "axios";
import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const VnpayReturn = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isProcessingRef = useRef(false); // Dùng ref để tránh re-render

  useEffect(() => {
    if (isProcessingRef.current) return; // Ngăn chặn gọi lại API nhiều lần
    isProcessingRef.current = true; // Đánh dấu đã xử lý

    const query = new URLSearchParams(location.search);
    const vnp_ResponseCode = query.get("vnp_ResponseCode");
    const orderId = query.get("vnp_TxnRef");
    const amount = query.get("vnp_Amount");

    console.log("🔍 VNPay Callback Data:", { vnp_ResponseCode, orderId, amount });

    if (!orderId || !amount) {
      message.error("Lỗi: Không tìm thấy thông tin giao dịch.");
      navigate("/");
      return;
    }

    const handleBookingSuccessVnPay = async () => {
        console.log("🟢 Gọi handleBookingSuccessVnPay:");

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

        // Kiểm tra xem đơn hàng đã tồn tại trong DB chưa
        // const existingBooking = await axios.get(
        //   `http://localhost:8000/api/booking/check?transactionId=${orderId}`
        // );

        // if (existingBooking.data.exists) {
        //   console.warn("⚠ Đơn hàng đã tồn tại, không tạo lại.");
        //   message.warning("Thanh toán đã được ghi nhận trước đó.");
        //   navigate("/room-list");
        //   return;
        // }

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

        console.log("📌 Sending Booking Data:", bookingData);
        const response = await axios.post("http://localhost:8000/api/booking/rooms", bookingData);
        console.log("✅ API Response:", response.data);

        message.success("Thanh toán & đặt phòng thành công!");
        localStorage.removeItem("selectedRooms");
        localStorage.removeItem("formData");

        setTimeout(() => navigate("/room-list"), 2000);
      } catch (error) {
        console.error("🚨 API Error:", error.response?.data || error.message);
        message.error("Lỗi khi lưu thông tin đặt phòng.");
        navigate("/payment-failed");
      }
    };

    if (vnp_ResponseCode === "00") {
      console.log("✅ Thanh toán thành công, bắt đầu tạo đơn đặt phòng...");
      handleBookingSuccessVnPay();
    } else {
      console.error("❌ Thanh toán thất bại, mã lỗi:", vnp_ResponseCode);
      message.error("Thanh toán thất bại. Vui lòng thử lại.");
      navigate("/checkout");
    }
  }, [location]); // `useEffect` chỉ chạy khi `location` thay đổi

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <Spin size="large" />
    </div>
  );
};

export default VnpayReturn;
