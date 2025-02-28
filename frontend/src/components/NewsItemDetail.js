import React from "react";
import { Col } from "react-bootstrap";
import styled from "styled-components";
import BreadcrumbNav from "../components/BreadcrumbNav";

const NewsItemDetail = ({ newsItem }) => {
  if (!newsItem) {
    return (
      <Col md={9}>
        <p>Loading news details...</p>
      </Col>
    );
  }

  const contentParagraphs = newsItem.content ? newsItem.content.split("\n") : [];
  const image = newsItem.image || null;

  return (
    <>
      <BreadcrumbWrapper>
        <BreadcrumbNav title={newsItem.title} />
      </BreadcrumbWrapper>

      <Container>
        <Title>{newsItem.title}</Title>
        <Date>22/02/2025</Date>
        <Separator />

        <ContentContainer>
          {contentParagraphs.map((paragraph, index) => (
            <React.Fragment key={index}>
              <Text>{paragraph}</Text>
              {index === Math.floor(contentParagraphs.length / 2) && image && (
                <ImageWrapper>
                  <Image src={image} alt={`news-image`} />
                </ImageWrapper>
              )}
            </React.Fragment>
          ))}
        </ContentContainer>
      </Container>
    </>
  );
};

export default NewsItemDetail;

// Styled Components
const BreadcrumbWrapper = styled.div`
  padding: 15px 20px; 
  background: #f9f9f9; 
`;

const Container = styled(Col)`
  max-width: 1200px; 
  margin: 0 auto;
  padding: 40px 20px; 
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: bold;
  color: #0d1321;
  text-align: left;
  margin-bottom: 10px;
`;

const Date = styled.span`
  display: inline-block;
  background: #eef1f6;
  color: #333;
  font-size: 14px;
  padding: 5px 12px;
  border-radius: 12px;
  font-weight: 500;
  margin-bottom: 10px;
`;

const Separator = styled.div`
  width: 100px;
  height: 4px;
  background: #22ACC1;
  margin: 10px 0 20px;
`;

const ContentContainer = styled.div`
  font-size: 18px;
  color: #4a4a4a;
  line-height: 1.8;
  font-style: italic;
`;

const Text = styled.p`
  margin-bottom: 20px;
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 30px 0;
`;

const Image = styled.img`
  width: 90%;
  max-width: 1000px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;
