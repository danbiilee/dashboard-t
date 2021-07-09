import React from "react";
import styled from "styled-components";

const Wrapper = styled.header`
  position: relative;
  height: 4.3rem;
  border: 1px solid #a5aab3;
  background-color: #fff;
  box-shadow: 0px 1px 3px #a5aab37d;
  text-align: center;
  .logo {
    position: absolute;
    top: 0;
    left: ${({ theme }) => theme.size.baseSpace};
    color: #2f56a7;
    font-size: 1.4rem;
    line-height: 4.3rem;
  }
  .title {
    color: #202c5c;
    font-size: 1.6rem;
    line-height: 4.3rem;
  }
`;

const Header = () => {
  return (
    <Wrapper>
      <h1 className="logo">아모레퍼시픽 QA</h1>
      <h2 className="title">성능테스트 조회</h2>
    </Wrapper>
  );
};

export default Header;