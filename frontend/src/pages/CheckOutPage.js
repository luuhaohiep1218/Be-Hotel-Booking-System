import { useLocation } from "react-router-dom";
import CheckoutRoomForm from "../components/CheckoutRoomForm";
import CheckoutServiceForm from "../components/CheckoutServiceForm";

const CheckoutPage = () => {
  const location = useLocation();
  const { type } = location.state || {};
  console.log(type);

  return (
    <div>
      {type === "room" ? (
        <CheckoutRoomForm />
      ) : type === "service" ? (
        <CheckoutServiceForm />
      ) : (
        <p>Không tìm thấy trang</p>
      )}
    </div>
  );
};

export default CheckoutPage;
