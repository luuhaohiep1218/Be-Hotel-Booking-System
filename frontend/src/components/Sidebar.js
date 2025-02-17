import React from "react";
import { ListGroup, Image} from "react-bootstrap";

const Sidebar = ({ news }) => {
  return (
    <>
      <h5 style={{ marginBottom: "15px", fontWeight: "bold", color: "#333" }}>
        BÀI VIẾT MỚI NHẤT
      </h5>
      <ListGroup>
        {[...news]
          .sort((a, b) => b.id - a.id)
          .slice(0, 4)
          .map((item) => (
            <ListGroup.Item
              key={item.id}
              style={{
                display: "flex",
                flexDirection: "column", 
                alignItems: "flex-start", 
                padding: "10px",
                border: "none", 
              }}
            >
              <div
                style={{
                  fontSize: "0.95rem",
                  color: "#333",
                  fontWeight: "500",
                  textAlign: "left", 
                  marginBottom: "10px", 
                }}
              >
                {item.title}
              </div>
              <div>
                <Image
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: "110px",
                    height: "80px",
                    objectFit: "cover",
                  }}
                />
              </div>
            </ListGroup.Item>
          ))}
      </ListGroup>
    </>
  );
};

export default Sidebar;
