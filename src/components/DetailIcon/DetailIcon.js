import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { AiFillFile, AiFillFileText, AiOutlineGlobal } from "react-icons/ai";
import { FaMobileAlt } from "react-icons/fa";

const Wrapper = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  margin-right: 1.5rem;
  background-color: #abb3c1;
  border-radius: 3px;
  svg {
    fill: #fff;
    font-size: 1.6rem;
  }
`;

const DetailIcon = ({ type }) => {
  return (
    <Wrapper>
      {type === "device" && <FaMobileAlt />}
      {type === "global" && <AiOutlineGlobal />}
      {type === "type" && <AiFillFile />}
      {type === "message" && <AiFillFileText />}
    </Wrapper>
  );
};

DetailIcon.propTypes = {
  type: PropTypes.string,
};

export default DetailIcon;
