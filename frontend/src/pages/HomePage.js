import { React, useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Descriptions } from 'antd';


const cruises = [
    {
        id: 1,
        image: 'https://storage.googleapis.com/a1aa/image/2hBJSz-SOguJ2-GgVyxCjpl2G4_MVtHZ4BgcdlQS9-4.jpg',
        rating: '4.9 (11 đánh giá)',
        location: 'Vịnh Hạ Long',
        title: 'Du thuyền Heritage Bình Chuẩn Cát Bà',
        details: 'Hạ thủy 2019 - Tàu vỏ Kim loại - 20 phòng',
        price: '3,675,000',
    },
    {
        id: 2,
        image: 'https://storage.googleapis.com/a1aa/image/iaTy4_1yAA-QuDCz-GIOsk-EkH3ZOR0ljBIZplQavpo.jpg',
        rating: '5.0 (7 đánh giá)',
        location: 'Vịnh Hạ Long',
        title: 'Du thuyền Stellar of the Seas',
        details: 'Hạ thủy 2018 - Tàu vỏ Kim loại - 22 phòng',
        price: '5,450,000',
    },
    {
        id: 3,
        image: 'https://storage.googleapis.com/a1aa/image/HknWlPSeF46Nq9fX4vhpvuIIChqJAn6YVY-v9hKllm0.jpg',
        rating: '5.0 (3 đánh giá)',
        location: 'Vịnh Hạ Long',
        title: 'Du thuyền Ambassador Hạ Long',
        details: 'Hạ thủy 2018 - Tàu vỏ Kim loại - 46 phòng',
        price: '4,225,000',
    },
    {
        id: 4,
        image: 'https://storage.googleapis.com/a1aa/image/tTlp2Vbxpj7E9qqY878UEq8tm9T1jjfq_dmQtlrlAvQ.jpg',
        rating: '5.0 (3 đánh giá)',
        location: 'Vịnh Hạ Long',
        title: 'Du thuyền Grand Pioneers',
        details: 'Hạ thủy 2023 - Tàu vỏ Kim loại - 56 phòng',
        price: '4,700,000',
    },
    {
        id: 5,
        image: 'https://storage.googleapis.com/a1aa/image/1nx0ByZrww9iidA9IXxuD7-6VPG3MNpiriIpeg47gUY.jpg',
        rating: '5.0 (4 đánh giá)',
        location: 'Vịnh Hạ Long',
        title: 'Du thuyền Catherine',
        details: 'Hạ thủy 2023 - Tàu vỏ Kim loại - 39 phòng',
        price: '5,050,000',
    },
    {
        id: 6,
        image: 'https://storage.googleapis.com/a1aa/image/S_LAdYVx2JWLaSUkvW8mOESth0oPBTofHMCQcQ2L0hY.jpg',
        rating: '5.0 (2 đánh giá)',
        location: 'Vịnh Hạ Long',
        title: 'Du thuyền Capella',
        details: 'Hạ thủy 2020 - Tàu vỏ Kim loại - 30 phòng',
        price: '4,450,000',
    },
];


const reviews = [
    {
        name: "Chị Thu Hà",
        title: "Du thuyền Heritage Bình Chuẩn",
        content:
            "Chị rất cảm ơn team đã tư vấn cho chị chọn du thuyền Heritage Bình Chuẩn. Bố mẹ chị rất ưng ý em ạ!\nTàu đẹp, mang đậm phong cách Á Đông. Đồ ăn hợp khẩu vị. Các bạn nhân viên trên tàu nhiệt tình và chu đáo.",
    },
    {
        name: "Anh Khánh",
        title: "Du thuyền Stellar of the Seas",
        content:
            "Anh chọn ngày đi tàu trùng với sinh nhật vợ anh. Muốn là món quà tặng vợ. Với lại, vợ anh thích chụp ảnh nữa. May quá bên em lại có phòng tàu này.\nCảm ơn dịch vụ của bên em nhé! Tàu đẹp, sang trọng, rất ổn! Tối sinh nhật vợ anh thì tàu có tặng 1 bánh sinh nhật nhỏ. Nói chung, cả gia đình anh rất hài lòng về chuyến đi cũng như dịch vụ tư vấn của bên em.",
    },
    {
        name: "Chị Linh - Anh Dũng",
        title: "Tour du thuyền 2 ngày 1 đêm",
        content:
            "Đi đúng hôm thời tiết đẹp, ngắm cảnh vịnh Hạ Long đẹp tuyệt vời. Du thuyền 5 sao và trải nghiệm tuyệt vời. Đồ ăn khá đa dạng, nấu vừa với khẩu vị của tất cả mọi độ tuổi.",
    },
    {
        name: "Cô Thanh Hằng và bạn",
        title: "Trải nghiệm du thuyền",
        content:
            "Nhân viên tư vấn nhiệt tình còn note lại khách dị ứng món gì, phục vụ chu đáo, buffet hải sản tươi ngon, phòng ốc đẹp. Tuyệt vời lắm !!!",
    },
    {
        name: "Bạn Minh Hoàng",
        title: "Du thuyền đẳng cấp",
        content:
            "Rất đáng nhớ !!! Một chuyến đi không thể nào quên với những trải nghiệm trên du thuyền cao cấp. Hẹn gặp lại Hạ Long!",
    },
];

const hotels = [
    { room: "Phòng 1", Descriptions: "Phòng 1", count: 40, image: "https://a25hotel.com/files/images/khach-san-tai-ha-noi/khach-san-tai-quan-hai-ba-trung/khach-san-tue-tinh/cao-cap/_Y5A2749-HDR.jpg" },
    { room: "Phòng 1", Descriptions: "Phòng 1", count: 1, image: "https://a25hotel.com/files/images/khach-san-tai-ha-noi/khach-san-tai-quan-hai-ba-trung/khach-san-tue-tinh/cao-cap/_Y5A2749-HDR.jpg" },
    { room: "Phòng 1", Descriptions: "Phòng 1", count: 22, image: "https://a25hotel.com/files/images/khach-san-tai-ha-noi/khach-san-tai-quan-hai-ba-trung/khach-san-tue-tinh/cao-cap/_Y5A2749-HDR.jpg" },
    { room: "Phòng 1", Descriptions: "Phòng 1", count: 1, image: "https://a25hotel.com/files/images/khach-san-tai-ha-noi/khach-san-tai-quan-hai-ba-trung/khach-san-tue-tinh/cao-cap/_Y5A2749-HDR.jpg" },
];

const styles = {
    card: {
        borderRadius: "20px",
        overflow: "hidden",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        transition: "all 0.3s ease-in-out",
        border: "none",
        width: "80%",
        height: "100%",
        padding: "15px",
        marginLeft: "12%",
    },
    imageContainer: {
        position: "relative",
    },
    image: {
        width: "100%",
        height: "180px",
        objectFit: "cover",
        borderRadius: "20px",
    },
    ratingBadge: {
        position: "absolute",
        top: "10px",
        left: "10px",
        background: "rgba(255, 193, 7, 0.9)",
        color: "white",
        fontSize: "12px",
        padding: "5px 10px",
        borderRadius: "15px",
        display: "flex",
        alignItems: "center",
        gap: "5px",
    },
    location: {
        fontSize: "14px",
        color: "#6c757d",
        marginBottom: "5px",
    },
    title: {
        fontSize: "16px",
        fontWeight: "bold",
        marginBottom: "8px",
    },
    details: {
        fontSize: "13px",
        color: "#6c757d",
    },
    footer: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: "15px",
    },
    price: {
        fontSize: "18px",
        fontWeight: "bold",
        color: "#000",
    },
    button: {
        backgroundColor: "#17a2b8",
        color: "white",
        borderRadius: "20px",
        padding: "8px 15px",
        fontSize: "14px",
        border: "none",
    },
    titlecontainer: {
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        maxWidth: "90%",
        margin: "auto",
        textAlign: "left",
        padding: "50px 0",
    },
    titleheading: {
        fontSize: "32px",
        fontWeight: "bold",
    },
    titletext: {
        color: "#6c757d",
        maxWidth: "450px",
        lineHeight: "1.6",
    },
    underline: {
        width: "50px",
        height: "3px",
        background: "#63c5da",
        marginTop: "5px",
    },
    buttonmore: {
        marginTop: '30px',
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },
    recontainer: {
        marginTop: '60px',
        background: "url('https://mixivivu.com/section-background.png') no-repeat center center/cover",
        backgroundColor: "#f3ffff",
        padding: "50px 0",
        textAlign: "center",
        width: '100%',
        borderRadius: '16px',
    },
    retitle: {
        fontSize: "28px",
        fontWeight: "bold",
        marginBottom: "10px",
    },
    resubtitle: {
        fontSize: "16px",
        color: "#6c757d",
        marginBottom: "30px",
    },
    carouselItem: {
        marginTop: "10px",
        marginBottom: "20px",
    },
    reviewBox: {
        maxWidth: "800px",
        margin: "auto",
        background: "white",
        padding: "20px",
        borderRadius: "15px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        textAlign: "left",
        height: '260px',
    },
    quoteIcon: {
        color: "#17a2b8",
        fontSize: "24px",
        fontWeight: 'bold',
    },
    reviewTitle: {
        fontSize: "24px",
        fontWeight: "bold",
        marginBottom: "10px",
        height: '40px',
    },
    reviewText: {
        fontSize: "16px",
        color: "#333",
        lineHeight: "1.6",
        height: '84px',
    },
    reviewerName: {
        marginTop: "15px",
        fontWeight: "bold",
        fontSize: "16px",
        height: '60px',
    },
    reviewerList: {
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        marginTop: "20px",
        gap: "10px",
    },
    reviewerItem: {
        background: "#fff",
        padding: "8px 15px",
        borderRadius: "20px",
        fontSize: "14px",
        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
        cursor: "pointer",
    },
    roomContainer: {
        textAlign: "center",
        background: "url('https://mixivivu.com/section-background.png') no-repeat center center/cover",
        padding: "50px 0",
        height: "800px",
        backgroundColor: "#f3ffff",
    },
    tiroomContainer: {
        width: "50%",
    },
    roomTitle: {
        fontWeight: "bold",
        color: "#17a2b8",
    },
    roomSubtitle: {
        marginBottom: "20px",
        color: "#333",
    },
    roomCard: {
        border: "none",
        overflow: "hidden",
        position: "relative",
        cursor: "pointer",
        height: "240px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    },
    roomImage: {
        height: "240px",
        objectFit: "cover",
        transition: "transform 0.3s ease-in-out",
    },
    roomOverlay: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "end",
        background: "rgba(0, 0, 0, 0.5)",
        padding: "15px",
        opacity: 0,
        transition: "opacity 0.3s ease-in-out",
    },
    roomOverlayHover: {
        opacity: 1,
    },
    roomImageHover: {
        transform: "scale(1.05)",
    },
    tiroomName: {
        fontSize: "18px",
        fontWeight: "bold",
        color: "white",
        position: "absolute",
        margin: "10px",
    },
    roomButton: {
        marginTop: "20px",
        backgroundColor: "transparent",
        border: "1px solid #17a2b8",
        color: "#17a2b8",
        padding: "10px 20px",
        fontSize: "12px",
        transition: "background-color 0.3s, color 0.3s",
        borderRadius: "100px",
    },
    roomButtonHover: {
        color: "white",
        backgroundColor: "#17a2b8",
    },
};

const HomePage = () => {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isManualSelect, setIsManualSelect] = useState(false);
    const [hoverIndex, setHoverIndex] = useState(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
            setIsManualSelect(false);
        }, 4000);

        return () => clearInterval(interval);
    }, [reviews.length]);

    const handleSelectReviewer = (name) => {
        const foundIndex = reviews.findIndex(review => review.name === name);
        if (foundIndex !== -1) {
            setCurrentIndex(foundIndex);
            setIsManualSelect(true);
        }
    };

    return (
        <div>
            
            <div className="text-center py-5" style={styles.roomContainer}>
                <Container style={styles.tiroomContainer}>
                    <h2 style={styles.roomTitle}>HỆ THỐNG PHÒNG CỦA GOLODGE</h2>
                    <p style={styles.roomSubtitle}>
                        Chúng tôi luôn sẵn sàng phục vụ quý khách tại những điểm đến phù hợp với nhu cầu của quý khách!
                    </p>
                    <Row className="g-3">
                        {hotels.map((hotel, index) => (
                            <Col key={index} md={6} sm={6} xs={12}>
                                <Card
                                    style={styles.roomCard}
                                    className="text-white"
                                    onMouseEnter={() => setHoverIndex(index)}
                                    onMouseLeave={() => setHoverIndex(null)}
                                >
                                    <Card.Title style={styles.tiroomName}>{`${hotel.room.toUpperCase()}`}</Card.Title>
                                    <Card.Img
                                        src={hotel.image}
                                        alt={hotel.room}
                                        style={{
                                            ...styles.roomImage,
                                            ...(hoverIndex === index ? styles.roomImageHover : {}),
                                        }}
                                    >
                                    </Card.Img>
                                    <Card.ImgOverlay
                                        style={{
                                            ...styles.roomOverlay,
                                            ...(hoverIndex === index ? styles.roomOverlayHover : {}),
                                        }}
                                    >
                                        <Card.Title style={styles.roomName}>{`${hotel.room.toUpperCase()}`}</Card.Title>
                                        <Card.Text style={styles.roomCount}>{`${hotel.count} Phòng`}</Card.Text>
                                        <Card.Text style={styles.roomDes}>{`Mô tả : ${hotel.Descriptions}`}</Card.Text>
                                    </Card.ImgOverlay>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                    <Button
                        style={styles.roomButton}
                        onMouseOver={(e) => (e.target.style.backgroundColor = styles.roomButtonHover.backgroundColor, e.target.style.color = styles.roomButtonHover.color)}
                        onMouseOut={(e) => (e.target.style.backgroundColor = styles.roomButton.backgroundColor, e.target.style.color = styles.roomButton.color)}
                    >
                        XEM TẤT CẢ
                    </Button>
                </Container>
            </div>
            <Container style={styles.bigcontainer}>
                <div style={styles.titlecontainer}>
                    <div>
                        <h1 style={styles.titleheading}>Dịch vụ nổi bật</h1>
                        <h1 style={styles.titleheading}>của chúng tôi</h1>
                        <div style={styles.underline}></div>
                    </div>
                    <p style={styles.titletext}>
                        Tận hưởng sự xa hoa và đẳng cấp tối đa trên du thuyền mới nhất và phổ biến nhất.
                        Khám phá một hành trình tuyệt vời đưa bạn vào thế giới của sự sang trọng,
                        tiện nghi và trải nghiệm không thể quên.
                    </p>
                </div>
                <Row >
                    {cruises.map((cruise) => (
                        <Col key={cruise.id} xs={12} sm={6} lg={4} className="mb-4">
                            <Card style={styles.card} >
                                <div style={styles.imageContainer}>
                                    <Card.Img style={styles.image} variant="top" src={cruise.image} alt={cruise.title} />
                                    <div style={styles.ratingBadge}>
                                        {cruise.rating} {cruise.reviews}
                                    </div>
                                </div>
                                <Card.Body>
                                    <div style={styles.location}>{cruise.location}</div>
                                    <Card.Title style={styles.title}>{cruise.title}</Card.Title>
                                    <Card.Text style={styles.details}>{cruise.details}</Card.Text>
                                    <div style={styles.footer}>
                                        <span style={styles.price}>{cruise.price}đ / khách</span>
                                        <Button style={styles.button}>Đặt ngay</Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
                <div style={styles.buttonmore}>
                    <Button variant="light" style={styles.button}>
                        <span className="text-gray-800">Xem tất cả Dịch vụ</span>
                        <i className="fas fa-arrow-right ml-2"></i>
                    </Button>
                </div>
            </Container>

            <div style={styles.recontainer}>
                <h2 style={styles.retitle}>Đánh giá từ những người đã trải nghiệm</h2>
                <p style={styles.resubtitle} >
                    Khách hàng chia sẻ về những kỷ niệm tuyệt vời trên chuyến du lịch với chúng tôi.
                </p>
                {isManualSelect ? (
                    <div style={styles.reviewBox}>
                        <span style={styles.quoteIcon}>““</span>
                        <h4 style={styles.reviewTitle}>{reviews[currentIndex].title}</h4>
                        <p style={styles.reviewText}>{reviews[currentIndex].content}</p>
                        <p style={styles.reviewerName}>{reviews[currentIndex].name}</p>
                    </div>
                ) : (
                    <Carousel interval={4000} controls={false} indicators={false} fade>
                        {reviews.map((review, index) => (
                            <Carousel.Item key={index} style={styles.carouselItem}>
                                <div style={styles.reviewBox}>
                                    <span style={styles.quoteIcon}>““</span>
                                    <h4 style={styles.reviewTitle}>{review.title}</h4>
                                    <p style={styles.reviewText}>{review.content}</p>
                                    <p style={styles.reviewerName}>{review.name}</p>
                                </div>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                )}
                <div style={styles.reviewerList}>
                    {reviews.map((review, index) => (
                        <span
                            key={index}
                            style={styles.reviewerItem}
                            onClick={() => handleSelectReviewer(review.name)}
                        >
                            {review.name}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default HomePage;
