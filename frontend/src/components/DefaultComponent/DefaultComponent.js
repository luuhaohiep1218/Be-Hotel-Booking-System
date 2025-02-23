import React from "react";
import HeaderComponent from "../HeaderComponent/HeaderComponent";
import FooterComponent from "../FooterComponent/FooterComponent";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Full viewport height */
`;

const MainContent = styled.main`
  flex: 1; /* This will make the content expand to take up available space */
  // margin-bottom: 30px;
`;

const DefaultComponent = ({ children }) => {
  return (
    <Wrapper>
      <HeaderComponent />
      <MainContent>{children}</MainContent>
      <FooterComponent />
    </Wrapper>
  );
};

export default DefaultComponent;
