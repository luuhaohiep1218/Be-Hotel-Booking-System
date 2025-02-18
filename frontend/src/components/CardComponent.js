import React from "react";
import { Card, Col, Row } from "antd";
import PaginationComponent from "./PaginationComponent";

const CardComponent = () => {
  const { Meta } = Card;
  const onChange = (pageNumber) => {
    console.log("Page: ", pageNumber);
  };
  return (
    <>
      <Row gutter={40} className="mb-4">
        <Col span={8} className="mt-5">
          <Card
            hoverable
            cover={
              <img
                alt="example"
                src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/ba/29/5c/img-worlds-of-adventure.jpg?w=900&h=500&s=1"
              />
            }
          >
            <Meta title="Europe Street beat" description="www.instagram.com" />
          </Card>
        </Col>
        <Col span={8} className="mt-5">
          <Card
            hoverable
            cover={
              <img
                alt="example"
                src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/ba/29/5c/img-worlds-of-adventure.jpg?w=900&h=500&s=1"
              />
            }
          >
            <Meta title="Europe Street beat" description="www.instagram.com" />
          </Card>
        </Col>
        <Col span={8} className="mt-5">
          <Card
            hoverable
            cover={
              <img
                alt="example"
                src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/ba/29/5c/img-worlds-of-adventure.jpg?w=900&h=500&s=1"
              />
            }
          >
            <Meta title="Europe Street beat" description="www.instagram.com" />
          </Card>
        </Col>
        <Col span={8} className="mt-5">
          <Card
            hoverable
            cover={
              <img
                alt="example"
                src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/ba/29/5c/img-worlds-of-adventure.jpg?w=900&h=500&s=1"
              />
            }
          >
            <Meta title="Europe Street beat" description="www.instagram.com" />
          </Card>
        </Col>
      </Row>
      <PaginationComponent
        align="end"
        pageSize={6}
        total={500}
        onChange={onChange}
      />
    </>
  );
};

export default CardComponent;
