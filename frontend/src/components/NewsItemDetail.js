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

  return (
    <>
      <BreadcrumbWrapper>
        <BreadcrumbNav title={newsItem.title} />
      </BreadcrumbWrapper>

      <Container>
        <Title>{newsItem.title}</Title>
        <Separator />

        <ContentContainer>
          {newsItem.sections?.map((section, index) => (
            <React.Fragment key={index}>
              <Text>{section.text}</Text>
              {section.image && (
                <ImageWrapper>
                  <Image src={section.image} alt={`news-image-${index}`} />
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

const Separator = styled.div`
  width: 100px;
  height: 4px;
  background: #22acc1;
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
