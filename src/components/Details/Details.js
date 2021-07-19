import React from "react";
import styled from "styled-components";
import Detail from "./Detail";
import { useSelector } from "react-redux";
import Indicator from "../Indicator";

const Wrapper = styled.ul`
  overflow-y: auto;
  flex: 1 1 30rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: max-content;
  list-style: none;
  font-size: 1.4rem;
`;

const Details = () => {
  const {
    detail: { isLoading, list, isError },
  } = useSelector((state) => state.functionTest);
  const length = list.length;

  return (
    <>
      {isError && <Indicator type="error" isDetail={true} />}
      {isLoading && <Indicator type="loading" isDetail={true} />}
      {!isLoading && !list.length ? (
        <Indicator type="empty" isDetail={true} />
      ) : (
        <Wrapper>
          {list.map((detail, index) => (
            <Detail
              key={index}
              detail={detail}
              // 📌 짝수일 때는 뒤에서 두 개, 홀수일 때는 뒤에서 한 개 flag=true 전달
              flag={
                length % 2 === 0
                  ? index === length - 1 || index === length - 2
                  : index === length - 1
              }
            />
          ))}
        </Wrapper>
      )}
    </>
  );
};

export default Details;
