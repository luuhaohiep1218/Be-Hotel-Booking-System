import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spin, Typography } from "antd";

const { Title } = Typography;

const LoginSuccess = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    console.log("🔹 Token từ URL:", token);

    if (token && token.trim() !== "") {
      localStorage.setItem("accessToken", token);

      setTimeout(() => {
        setLoading(false);
        navigate("/");
      }, 1500);
    } else {
      setLoading(false);
      navigate("/login?error=google_auth_failed");
    }
  }, [navigate]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      {loading ? (
        <>
          <Spin size="large" />
          <Title level={4} style={{ marginTop: 16 }}>
            Đang xử lý đăng nhập...
          </Title>
        </>
      ) : null}
    </div>
  );
};

export default LoginSuccess;
