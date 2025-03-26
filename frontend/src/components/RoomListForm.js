import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { RoomContext } from "../context/RoomContext";

// Styled components
const Container = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  position: relative;
`;

const ClearButton = styled.button`
  position: absolute;
  right: 16px;
  top: 16px;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  font-size: 12px;
  border-radius: 9999px;
  border: 1px solid #e2e8f0;
  background-color: white;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f7fafc;
  }
`;

const RoomList = styled.div`
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const RoomCard = styled.div`
  padding: 16px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
`;

const RoomImage = styled.div`
  flex-shrink: 0;
  margin-right: 16px;
`;

const StyledImg = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 8px;
  object-fit: cover;
`;

const RoomInfo = styled.div`
  flex-grow: 1;
`;

const RoomName = styled.h3`
  font-weight: bold;
  font-size: 14px;
  margin: 0;
`;

const RoomDetails = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #6b7280;
  margin-top: 4px;
`;

const DetailItem = styled.span`
  display: flex;
  align-items: center;
`;

const Divider = styled.span`
  margin: 0 8px;
`;

const PriceInfo = styled.div`
  text-align: right;
  margin-right: 16px;
`;

const Price = styled.div`
  font-weight: bold;
  font-size: 16px;
  color: #0891b2;
`;

const PriceLabel = styled.div`
  font-size: 12px;
  color: #6b7280;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
`;

const QuantityButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 9999px;
  border: 1px solid #e2e8f0;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f7fafc;
  }
`;

const QuantityValue = styled.span`
  width: 32px;
  text-align: center;
`;

const Footer = styled.div`
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TotalSection = styled.div``;

const TotalLabel = styled.div`
  font-size: 14px;
  font-weight: 500;
`;

const TotalPrice = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const OutlineButton = styled.button`
  padding: 8px 16px;
  border-radius: 9999px;
  border: 1px solid #e2e8f0;
  background-color: white;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f7fafc;
  }
`;

const PrimaryButton = styled.button`
  padding: 8px 16px;
  border-radius: 9999px;
  border: none;
  background-color: #14b8a6;
  color: white;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #0d9488;
  }
`;

const ArrowIcon = styled.span`
  margin-left: 4px;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 16px;
  color: #6b7280;
`;

const ErrorContainer = styled.div`
  padding: 16px;
  background-color: #fee2e2;
  border-radius: 8px;
  color: #b91c1c;
  margin-top: 16px;
`;

// SVG Icons as React components
const CloseIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const MinusIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const PlusIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

// Styled components (same as the previous ones)

export default function RoomBookingForm() {
  const { rooms, loading, resetSelections } = useContext(RoomContext);
  const [selectedRooms, setSelectedRooms] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const formatPrice = (price) => new Intl.NumberFormat("vi-VN").format(price);

  useEffect(() => {
    // Initialize selected rooms with count set to 0 for all rooms
    const initialSelectedRooms = rooms.reduce((acc, room) => {
      acc[room.id] = { ...room, count: 0 }; // Initialize count to 0
      return acc;
    }, {});
    setSelectedRooms(initialSelectedRooms);
  }, [rooms]);

  if (loading) {
    return (
      <Container>
        <LoadingContainer>
          <div>Đang tải dữ liệu phòng...</div>
        </LoadingContainer>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <ErrorContainer>{error}</ErrorContainer>
      </Container>
    );
  }

  // Handle room quantity change (only update the clicked room's count)
   const handleRoomChange = (roomId, price, maxQty, change) => {
    setSelectedRooms((prev) => {
      const selectedRoom = rooms.find((r) => r._id === roomId); // Tìm đúng phòng
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
  const totalPrice = Object.values(selectedRooms).reduce(
    (sum, room) => sum + room.count * room.price,
    0
  );

  return (
    <Container>
      <ClearButton onClick={resetSelections}>
        <CloseIcon />
        Xóa lựa chọn
      </ClearButton>

      <RoomList>
        {rooms.map((room) => (
          <RoomCard key={room.id}>
            <RoomImage>
              <StyledImg src={room.images[0] || "https://via.placeholder.com/80"} alt={room.name} />
            </RoomImage>

            <RoomInfo>
              <RoomName>{room.name}</RoomName>
              <RoomDetails>
                <DetailItem>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ marginRight: "4px" }}
                  >
                    <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  {room.size} m²
                </DetailItem>
                <Divider>|</Divider>
                <DetailItem>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ marginRight: "4px" }}
                  >
                    <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Tối đa: {room.beds} 👤
                </DetailItem>
              </RoomDetails>
            </RoomInfo>

            <PriceInfo>
              <Price>{formatPrice(room.price)} đ</Price>
              <PriceLabel>/KHÁCH</PriceLabel>
            </PriceInfo>

            <QuantityControl>
              <QuantityButton
                onClick={() => handleRoomChange(room._id, room.price, room.quantityLeft, -1)}
                disabled={(selectedRooms[room._id]?.count || 0) <= 0}
              >
                <MinusIcon />
              </QuantityButton>
              <QuantityValue>{selectedRooms[room._id]?.count || 0}</QuantityValue>
              <QuantityButton
                onClick={() => handleRoomChange(room._id, room.price, room.quantityLeft, 1)}
                disabled={(selectedRooms[room._id]?.count || 0) >= room.quantityLeft}
              >
                <PlusIcon />
              </QuantityButton>
            </QuantityControl>
          </RoomCard>
        ))}
      </RoomList>

      <Footer>
        <TotalSection>
          <TotalLabel>Tổng tiền</TotalLabel>
          <TotalPrice>{formatPrice(totalPrice) || 0} đ</TotalPrice>
        </TotalSection>

        <ActionButtons>
          <PrimaryButton
            variant="success"
            disabled={totalPrice === 0}
            onClick={() =>
             navigate('/checkout', {
            state: {
              selectedRooms: Object.values(selectedRooms).map((room) => ({
                roomId: room.roomId,
                count: room.count,
                price: room.price,
                name: room.name
              })),
              type: "room"
            }
          })
            }
          >
            Đặt ngay ({formatPrice(totalPrice)} đ)
            <ArrowIcon>→</ArrowIcon>
          </PrimaryButton>
        </ActionButtons>
      </Footer>
    </Container>
  );
}

