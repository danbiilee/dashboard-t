import React from "react";
import PropTypes from "prop-types";
import { RiFileExcel2Fill } from "react-icons/ri";
import { Button } from "@progress/kendo-react-buttons";
import UserService from "../../service/UserService";

const ExcelDownButton = ({ userService, params }) => {
  const handleDownload = () => {
    userService.downloadExcel(params);
  };

  return (
    <Button look="flat" onClick={handleDownload}>
      <RiFileExcel2Fill />
    </Button>
  );
};

ExcelDownButton.propTypes = {
  userService: PropTypes.instanceOf(UserService),
  params: PropTypes.object,
};

export default ExcelDownButton;
