import { Card } from "antd";
import dayjs from "dayjs";

const InvoiceCard = ({ user, formData, selectedRooms, totalPrice }) => {
  return (
    <Card className="md:col-span-1 bg-gray-100 p-4" title = "Hóa đơn xem trước">
     
      <h2 className="text-xl font-semibold mb-4">Hóa đơn</h2>

      {/* Thông tin người đặt */}
      <div className="mb-4">
        <p><strong>Người đặt:</strong> {formData.fullName}</p>
        <p><strong>Email:</strong> {formData.email}</p>
        <p><strong>Điện thoại:</strong> {formData.phone}</p>
      </div>

      {/* Danh sách phòng đã đặt */}
      <div>
        {selectedRooms.map((room, index) => (
          <div key={index} className="flex justify-between">
            <span style ={{ fontWeight: "bold", marginBottom: "8px" }}>Phòng đặt:</span >{room.name}<br/>
           <span style ={{ fontWeight: "bold", marginBottom: "8px" }}>Số lượng:</span>{room.count}<br />
            <span style ={{ fontWeight: "bold", marginBottom: "8px" }}>Giá:</span>{room.price.toLocaleString()} đ
          </div>
        ))}
      </div>

      <hr className="my-2" />

      {/* Ngày nhận và trả phòng */}
      <div className="mb-2">
        <p><strong>Ngày nhận phòng:</strong> {formData.checkIn ? dayjs(formData.checkIn).format("DD/MM/YYYY") : "Chưa chọn"}</p>
        <p><strong>Ngày trả phòng:</strong> {formData.checkOut ? dayjs(formData.checkOut).format("DD/MM/YYYY") : "Chưa chọn"}</p>
      </div>

      {/* Phương thức thanh toán */}
      <div className="mb-2">
        <p><strong>Phương thức thanh toán:</strong> {formData.paymentMethod === "counter" ? "Thanh toán tại quầy" : "VNPay"}</p>
      </div>

      <hr className="my-2" />

      {/* Tổng tiền */}
      <div className="flex justify-between font-bold">
        <span style={{ fontWeight: "bold" }}>Tổng tiền:</span>
        <span>{totalPrice.toLocaleString()} đ</span>
      </div>
    </Card>
  );
};

export default InvoiceCard;
