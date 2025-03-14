import { Button, Result } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const orderId = params.get("orderId");
  const bookingId = params.get("bookingId");

  return (
    <Result
      status="success"
      title="Thanh toán thành công!"
      subTitle={`Mã đơn hàng: ${orderId} | Mã đặt phòng: ${bookingId}`}
      extra={[
        <Button type="primary" key="home" onClick={() => navigate("/")}>
          Quay về trang chủ
        </Button>,
        <Button key="booking" onClick={() => navigate("/my-bookings")}>
          Xem đơn đặt phòng
        </Button>,
      ]}
    />
  );
};

export default PaymentSuccess;
