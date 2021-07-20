import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { useLocation } from "react-router-dom";

const Wrapper = styled.div`
  ${({ type }) =>
    type === "flex"
      ? css`
          margin-bottom: ${({ theme }) => theme.size.componentSpace};
        `
      : css`
          padding: ${({ theme }) => theme.size.baseSpace};
        `}
  ${({ isEmpty }) =>
    isEmpty &&
    css`
      display: flex;
      flex-basis: 38.2rem;
    `}
`;

const ChartWrapper = ({ isEmpty, children }) => {
  const { pathname } = useLocation();
  return (
    <Wrapper
      type={pathname === "/response" ? "grid" : "flex"}
      isEmpty={isEmpty}
    >
      {children}
    </Wrapper>
  );
};

ChartWrapper.propTypes = {
  children: PropTypes.node,
  isEmpty: PropTypes.bool,
};

export default ChartWrapper;
