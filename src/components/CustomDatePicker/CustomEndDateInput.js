import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { DatePicker } from "@progress/kendo-react-dateinputs";

const CustomEndDateInput = ({ value }) => {
  const { endDate } = useSelector((state) => state.gnb);
  return (
    <label>
      <span>검색종료일</span>
      <DatePicker
        format="yyyy-MM-dd"
        defaultValue={new Date(endDate)}
        value={new Date(value)}
        label={undefined}
        show={false}
      />
    </label>
  );
};

CustomEndDateInput.propTypes = {
  value: PropTypes.string,
};

export default CustomEndDateInput;
