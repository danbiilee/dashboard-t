import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Loader } from "@progress/kendo-react-indicators";

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${({ isDetail }) => (!isDetail ? "38.2rem" : "100%")};
  padding: ${({ theme }) => theme.size.baseSpace};
  font-weight: normal;
  border: ${({ isDetail }) => (isDetail ? "1px solid #cbced5" : 0)};
`;

const Indicator = ({ type, isDetail }) => {
  const isLoading = type === "loading" ? true : false;
  let message;
  if (type === "error") {
    message = "AN ERROR OCCURRED";
  } else if (type === "empty") {
    message = "NO RESULTS FOUND";
  }

  return (
    <Wrapper isDetail={isDetail}>
      {isLoading ? (
        <Loader type="infinite-spinner" style={{ color: "#2F56A7" }} />
      ) : (
        message
      )}
    </Wrapper>
  );
};

Indicator.propTypes = {
  type: PropTypes.string,
  isDetail: PropTypes.bool,
};

export default Indicator;
