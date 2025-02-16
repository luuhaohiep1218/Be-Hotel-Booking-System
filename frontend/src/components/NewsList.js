import React from "react";
import { Row } from "react-bootstrap";
import NewsItem from "./NewsItem";

const NewsList = ({ news }) => {
  return (
    <Row>
      {news.map((item, index) => (
        <NewsItem key={index} item={item} />
        
      ))}
    </Row>
  );
};

export default NewsList;