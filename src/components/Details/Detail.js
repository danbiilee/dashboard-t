import React from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import DetailIcon from "../DetailIcon";

const Wrapper = styled.li`
  display: flex;
  flex-direction: column;
  height: inherit;
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
  padding: 0.7rem ${({ theme }) => theme.size.componentSpace};
  border-bottom: 1px solid #d6dae0;
  &:first-of-type {
    padding: ${({ theme }) =>
      `0 ${theme.size.baseSpace} 0 ${theme.size.componentSpace}`};
  }
  &:last-of-type {
    border-bottom: 0;
  }
  p {
    line-height: 22px;
  }

  .device__wrapper,
  .date__wrapper {
    display: flex;
    align-items: center;
    padding: 0.7rem 0;
  }
  .device__wrapper {
    flex: 1;
  }
  .date__wrapper {
    height: 100%;
    padding-left: ${({ theme }) => theme.size.baseSpace};
    margin-left: ${({ theme }) => theme.size.componentSpace};
    border-left: 1px solid #ebedf0;
  }
  .date__title {
    color: #8086a0;
  }
  .icon-wrapper {
    height: 100%;
  }
`;

const Detail = ({ flag }) => {
  const { pathname } = useLocation();
  const type = pathname === "/" ? "device" : "global";

  return (
    <Wrapper flag={flag}>
      <Row>
        <div className="device__wrapper">
          <div className="icon-wrapper">
            <DetailIcon type={type} />
          </div>
          <p>갤럭시8</p>
        </div>
        <div className="date__wrapper">
          <p>
            <span className="date__title">발생일시 :&nbsp;</span>2021-07-01
            00:05:39
          </p>
        </div>
      </Row>
      <Row>
        <div className="icon-wrapper">
          <DetailIcon type="type" />
        </div>
        <p>Non___Non___Non__</p>
      </Row>
      <Row>
        <div className="icon-wrapper">
          <DetailIcon type="message" />
        </div>
        <p>상품 상세 페이지에서 비로그인 결제하기 선택 후 ~~~~</p>
      </Row>
    </Wrapper>
  );
};

Detail.propTypes = {
  flag: PropTypes.bool,
};

export default Detail;
