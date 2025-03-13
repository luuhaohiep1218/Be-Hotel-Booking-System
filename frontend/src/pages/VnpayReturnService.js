import { notification } from "antd"; // Thay vì dùng message
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useHotelBooking } from "../context/HotelBookingContext";
import API from "../utils/axiosInstance";

const VNPayReturnService = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState("");
  const { user, accessToken } = useHotelBooking();

  useEffect(() => {
    const responseCode = searchParams.get("vnp_ResponseCode");
    if (responseCode === "00") {
      setStatus("success");
      setMessage("Thanh toán thành công!");

      const serviceId = sessionStorage.getItem("serviceId");
      const serviceQuantity = sessionStorage.getItem("serviceQuantity");

      if (serviceId && serviceQuantity && user && accessToken) {
        API.post(
          "/booking/service",
          {
            userId: user._id,
            serviceId,
            serviceQuantity: Number(serviceQuantity),
            paymentMethod: "vnpay",
          },
          { headers: { Authorization: `Bearer ${accessToken}` } }
        )
          .then(() => {
            notification.success({
              message: "Đặt dịch vụ thành công",
              description: "Bạn đã đặt dịch vụ thành công!",
            });

            sessionStorage.removeItem("serviceId");
            sessionStorage.removeItem("serviceQuantity");
          })
          .catch(() => {
            notification.error({
              message: "Lỗi lưu đơn",
              description:
                "Đặt dịch vụ thành công nhưng không thể lưu vào hệ thống!",
            });
          });
      }
    } else {
      setStatus("failed");
      setMessage("Thanh toán thất bại. Vui lòng thử lại!");

      notification.error({
        message: "Thanh toán thất bại",
        description: "Vui lòng thử lại sau!",
      });
    }
  }, [searchParams, user, accessToken]);

  return (
    <div className="container text-center mt-5">
      {status === "success" ? (
        <div className="alert alert-success">{message}</div>
      ) : (
        <div className="alert alert-danger">{message}</div>
      )}
      <a href="/" className="btn btn-primary mt-3">
        Quay lại trang chủ
      </a>
    </div>
  );
};

export default VNPayReturnService;