import React from "react";
import styled from "styled-components";

const Wrapper = styled.header`
  position: relative;
  height: 70px;
  border-bottom: 1px solid #a5aab3;
  background-color: #fff;
  box-shadow: 0px 1px 3px #a5aab37d;
  text-align: center;
  .logo {
    position: absolute;
    top: 0;
    left: ${({ theme }) => theme.size.baseSpace};
    color: #2f56a7;
    font-size: 2.3rem;
    line-height: 70px;
  }
  .title {
    color: #202c5c;
    font-size: 2.8rem;
    line-height: 70px;
  }
`;

const Header = () => {
  return (
    <Wrapper>
      <h1 className="logo">AP QA</h1>
      <h2 className="title">기능 및 성능테스트 조회</h2>
    </Wrapper>
  );
};

export default Header;
