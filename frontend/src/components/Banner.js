import React, { useEffect, useRef } from 'react';
function Banner() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log("Tự động phát bị chặn:", error);
      });
    }
  }, []);
  const style = {
    position: 'relative',
    width: '100%',
    height: 'auto',
    objectFit: 'cover',
    borderRadius: '20px'
  }
  
  return (
    <div className="banner mt-2" style ={{position: 'relative' , width: '100%', height: 'auto' }}>
    <div style ={style}>
    <video ref={videoRef} style = {{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '24px'}} autoPlay muted loop  src="https://minio.fares.vn/mixivivu-dev/video/MixivivuHotel.mp4">
      Trình duyệt của bạn không hỗ trợ video.
    </video>
    </div>  
  </div>
  )
}

export default Banner
