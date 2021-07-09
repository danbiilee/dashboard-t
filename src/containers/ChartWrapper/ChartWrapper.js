import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { useLocation } from "react-router-dom";

const Wrapper = styled.div`
  ${(props) =>
    props.type === "flex"
      ? css`
          flex: 1.3;
          display: flex;
          margin-bottom: ${({ theme }) => theme.size.baseSpace};
        `
      : css`
          flex: 1;
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-auto-rows: 33.3%;
          padding: ${({ theme }) => theme.size.baseSpace};
        `}
`;

const ChartWrapper = ({ children }) => {
  const { pathname } = useLocation();
  return (
    <Wrapper type={pathname === "/response" ? "grid" : "flex"}>
      {children}
    </Wrapper>
  );
};

ChartWrapper.propTypes = {
  children: PropTypes.node,
};

export default ChartWrapper;
