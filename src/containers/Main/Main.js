import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import GNB from "../../components/GNB";
import UserService from "../../service/UserService";

const Wrapper = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #f8f9fa;
`;

const Main = ({ children, userService }) => {
  return (
    <Wrapper>
      <GNB userService={userService} />
      {children}
    </Wrapper>
  );
};

Main.propTypes = {
  children: PropTypes.node,
  userService: PropTypes.instanceOf(UserService),
};

export default Main;
