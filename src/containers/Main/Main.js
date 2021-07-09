import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import GNB from "../../components/GNB";

const Wrapper = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Main = ({ children }) => {
  return (
    <Wrapper>
      <GNB />
      {children}
    </Wrapper>
  );
};

Main.propTypes = {
  children: PropTypes.node,
};

export default Main;
