import { Button, Result } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentFailed = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const orderId = params.get("orderId");
  const bookingId = params.get("bookingId");

  return (
    <Result
      status="error"
      title="Thanh toán thất bại!"
      subTitle={`Mã đơn hàng: ${orderId} | Mã đặt phòng: ${bookingId}`}
      extra={[
        <Button type="primary" key="retry" onClick={() => navigate("/checkout")}>
          Thử lại thanh toán
        </Button>,
        <Button key="home" onClick={() => navigate("/")}>
          Quay về trang chủ
        </Button>,
      ]}
    />
  );
};

export default PaymentFailed;
