import React from 'react';
import { useParams } from "react-router-dom";
import CarouselBlog from '../components/CarouselBlog';
function RoomDetail() {
   const { roomName } = useParams(); // Lấy tên phòng từ URL
  const decodedName = decodeURIComponent(roomName); // Giải mã tên phòng
  return (
    <div>
      <CarouselBlog />
      Chi tiết phòng: {decodedName}
    </div>
  )
}

export default RoomDetail
