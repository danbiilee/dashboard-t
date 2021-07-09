import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { DatePicker } from "@progress/kendo-react-dateinputs";

const CustomStartDateInput = ({ value }) => {
  const { startDate } = useSelector((state) => state.gnb);
  return (
    <label>
      <span>검색시작일</span>
      <DatePicker
        format="yyyy-MM-dd"
        defaultValue={new Date(startDate)}
        value={new Date(value)}
        label={undefined}
        show={false}
      />
    </label>
  );
};

CustomStartDateInput.propTypes = {
  value: PropTypes.string,
};

export default CustomStartDateInput;
