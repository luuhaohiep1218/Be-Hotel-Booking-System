import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const VNPayReturn = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const responseCode = searchParams.get("vnp_ResponseCode");
    if (responseCode === "00") {
      setStatus("success");
      setMessage("Thanh toán thành công!");
    } else {
      setStatus("failed");
      setMessage("Thanh toán thất bại. Vui lòng thử lại!");
    }
  }, [searchParams]);

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

export default VNPayReturn;
