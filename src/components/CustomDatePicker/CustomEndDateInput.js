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

const CustomEndDateInput = ({ value }) => {
  const { endDate } = useSelector((state) => state.gnb);
  return (
    <Label>
      <span className="title">검색종료일</span>
      <DatePicker
        format="yyyy-MM-dd"
        defaultValue={new Date(endDate)}
        value={new Date(value)}
        label={undefined}
        show={false}
      />
    </Label>
  );
};

CustomEndDateInput.propTypes = {
  value: PropTypes.string,
};

export default CustomEndDateInput;
