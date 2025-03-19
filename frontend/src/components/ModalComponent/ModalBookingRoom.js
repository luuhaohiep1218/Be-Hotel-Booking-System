import React, { useState } from "react";
import { Alert, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// Styled Components
const CustomModal = styled(Modal)`
  .modal-content {
    background: white;
    border-radius: 15px;
    box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.3);
    padding: 20px;
    animation: fadeIn 0.3s ease-in-out;
    max-width: 600px;
    margin: auto;
  }

  .modal-header {
    border-bottom: none;
  }

  .modal-footer {
    border-top: none;
    display: flex;
    justify-content: space-between;
  }

  .room-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #ddd;
  }

  .counter {
    display: flex;
    align-items: center;
  }

  .counter button {
    background: #22acbf;
    color: white;
    border: none;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin: 0 5px;
    cursor: pointer;
  }

  .counter button:disabled {
    background: #ccc;
    cursor: not-allowed;
  }

  .total-price {
    font-size: 18px;
    font-weight: bold;
    text-align: right;
    margin-top: 20px;
  }

  .alert {
    font-size: 14px;
    padding: 5px 10px;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.8);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

function ModalBookingRoom({ show, handleClose, filteredRooms, room }) {
  const [selectedRooms, setSelectedRooms] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();
  // Hàm tăng/giảm số lượng phòng
  const handleRoomChange = (roomId, price, maxQty, change) => {
    setSelectedRooms((prev) => {
      const selectedRoom = filteredRooms.find((r) => r._id === roomId); // Tìm đúng phòng
      if (!selectedRoom) return prev; // Tránh lỗi nếu không tìm thấy phòng

      const newCount = (prev[roomId]?.count || 0) + change;
      if (newCount < 0) return prev;
      if (newCount > maxQty) {
        setError(`Số lượng phòng "${selectedRoom.name}" không đủ!`);
        return prev;
      }

      setError(""); // Xóa lỗi nếu số lượng hợp lệ
      return {
        ...prev,
        [roomId]: {
          roomId: selectedRoom._id,
          name: selectedRoom.name,
          descriptions: selectedRoom.descriptions,
          count: newCount,
          price: price,
        },
      };
    });
  };

  // Tính tổng tiền
  const totalPrice = Object.values(selectedRooms).reduce(
    (sum, room) => sum + room.count * room.price,
    0
  );

  return (
    <CustomModal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Chọn phòng của bạn</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger" className="alert">{error}</Alert>}
        {room.map((room) => (
          <div key={room._id} className="room-item">
            <div>
              <h6>{room.name}</h6>
              <p>{room.price.toLocaleString()} đ / phòng</p>
              <p>Còn lại: {room.quantityLeft} phòng</p>
            </div>
            <div className="counter">
              <button
                onClick={() => handleRoomChange(room._id, room.price, room.quantityLeft, -1)}
                disabled={(selectedRooms[room._id]?.count || 0) <= 0}
              >
                -
              </button>
              <span>{selectedRooms[room._id]?.count || 0}</span>
              <button
                onClick={() => handleRoomChange(room._id, room.price, room.quantityLeft, 1)}
                disabled={(selectedRooms[room._id]?.count || 0) >= room.quantityLeft}
              >
                +
              </button>
            </div>
          </div>
        ))}
        <div className="total-price">
          Tổng tiền: {totalPrice.toLocaleString()} đ
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Đóng
        </Button>
        <Button
          variant="success"
          disabled={totalPrice === 0}
          onClick={() => navigate('/checkout', {
            state: {
              selectedRooms: Object.values(selectedRooms).map((room) => ({
                roomId: room.roomId,
                count: room.count,
                price: room.price,
                name: room.name
              })),
              type: "room"
            }
          })}
        >
          Đặt ngay ({totalPrice.toLocaleString()} đ)
        </Button>

      </Modal.Footer>
    </CustomModal>
  );
}

export default ModalBookingRoom;
