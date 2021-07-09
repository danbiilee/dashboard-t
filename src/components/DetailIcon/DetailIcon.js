import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  AiOutlineFile,
  AiOutlineFileText,
  AiOutlineGlobal,
} from "react-icons/ai";
import { FaMobileAlt } from "react-icons/fa";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 25px;
  margin-right: ${({ theme }) => theme.size.baseSpace};
  background-color: #abb3c1;
  border-radius: 3px;
  svg {
    fill: #fff;
    font-size: 1.3rem;
  }
`;

const DetailIcon = ({ type }) => {
  return (
    <Wrapper>
      {type === "device" && <FaMobileAlt />}
      {type === "global" && <AiOutlineGlobal />}
      {type === "type" && <AiOutlineFile />}
      {type === "message" && <AiOutlineFileText />}
    </Wrapper>
  );
};

DetailIcon.propTypes = {
  type: PropTypes.string,
};

export default DetailIcon;
