import React from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import DetailIcon from "../DetailIcon";

const Wrapper = styled.li`
  display: flex;
  flex-direction: column;
  min-height: 10rem;
  margin-bottom: ${(props) =>
    props.flag ? 0 : props.theme.size.componentSpace};
  &:nth-of-type(odd) {
    margin-right: ${({ theme }) => theme.size.componentSpace};
  }
  border: 1px solid #d6dae0;
  background-color: white;
`;

const Row = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  padding: 0 ${({ theme }) => theme.size.baseSpace};
  border-bottom: 1px solid #d6dae0;
  &:last-of-type {
    border-bottom: 0;
  }

  .device__wrapper,
  .date__wrapper {
    display: flex;
    align-items: center;
  }
  .device__wrapper {
    flex: 1;
  }
  .date__wrapper {
    height: 100%;
    padding-left: ${({ theme }) => theme.size.baseSpace};
    margin-left: ${({ theme }) => theme.size.baseSpace};
    border-left: 1px solid #ebedf0;
  }
  .date__title {
    color: #8086a0;
  }
`;

const Detail = ({ flag }) => {
  const { pathname } = useLocation();
  const type = pathname === "/" ? "device" : "global";

  return (
    <Wrapper flag={flag}>
      <Row>
        <div className="device__wrapper">
          <DetailIcon type={type} />
          갤럭시8
        </div>
        <div className="date__wrapper">
          <span className="date__title">발생일시 :&nbsp;</span>2021-07-01
          00:05:39
        </div>
      </Row>
      <Row>
        <DetailIcon type="type" />
        Non___
      </Row>
      <Row>
        <DetailIcon type="message" />
        상품 상세 페이지에서 비로그인 결제하기 선택 후 ~~~~
      </Row>
    </Wrapper>
  );
};

Detail.propTypes = {
  flag: PropTypes.bool,
};

export default Detail;
