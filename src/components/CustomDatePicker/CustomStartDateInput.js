import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { DatePicker } from "@progress/kendo-react-dateinputs";

const Label = styled.label`
  .title {
    margin-right: ${({ theme }) => theme.size.componentSpace};
  }
`;

const CustomStartDateInput = ({ value }) => {
  const { startDate } = useSelector((state) => state.gnb);
  return (
    <Label>
      <span className="title">검색시작일</span>
      <DatePicker
        format="yyyy-MM-dd"
        defaultValue={new Date(startDate)}
        value={new Date(value)}
        label={undefined}
        show={false}
      />
    </Label>
  );
};

CustomStartDateInput.propTypes = {
  value: PropTypes.string,
};

export default CustomStartDateInput;
