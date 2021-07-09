import React from "react";
import styled from "styled-components";
import Detail from "./Detail";

const Wrapper = styled.ul`
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: 50%;
  overflow-y: auto;
  min-height: 21rem;
  list-style: none;
`;

const Details = () => {
  // 짝수일 때는 뒤에서 두 개, 홀수일 때는 뒤에서 한 개 flag=true 전달
  return (
    <Wrapper>
      <Detail />
      <Detail />
      {/* <Detail flag={true} />
      <Detail flag={true} /> */}
      <Detail />
      <Detail />
      <Detail flag={true} />
    </Wrapper>
  );
};

export default Details;
