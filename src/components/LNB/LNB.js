import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import styled, { css } from "styled-components";
import { RadioButton } from "@progress/kendo-react-inputs";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { Button } from "@progress/kendo-react-buttons";
import { fetchFunctionTests } from "../../redux/functionTestSlice";
import UserService from "../../service/UserService";
import ExcelDownButton from "../ExcelDownButton/ExcelDownButton";

const Wrapper = styled.nav`
  height: 64px;
  padding: 0 ${({ theme }) => theme.size.baseSpace};
  margin-bottom: ${({ theme }) => theme.size.componentSpace};
  background-color: #eff0f3;
  border: 1px solid #cbced5;
  .list-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: inherit;
    list-style: none;
  }
  .details {
    display: flex;
    align-items: center;
  }
  .radio-wrapper {
    margin-right: 3rem;
  }
`;

const Label = styled.label`
  margin-right: ${({ theme }) => theme.size.baseSpace};
  ${(props) =>
    props.checked &&
    css`
      color: #2f56a7;
    `}
`;

const LNB = ({ userService }) => {
  const dispatch = useDispatch();
  const {
    inputs: { level2, level3 },
    validList,
  } = useSelector((state) => state.control);
  const { dates, devices, langs } = validList;

  const [selectedInputs, setSelectedInputs] = useState({
    state: "Fail",
    date: dates[dates.length - 1], // 디폴트: chartList의 첫번째 데이터 기준
    name: level2.menuId === "APPLICATION" ? devices[0] : langs[0],
  });

  useEffect(() => {
    setSelectedInputs({
      state: "Fail",
      date: dates[dates.length - 1],
      name: level2.menuId === "APPLICATION" ? devices[0] : langs[0],
    });
  }, [dates, devices, langs, level2]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // RadioButton: e.target 값 undefined
    if (name == null && value == null) {
      setSelectedInputs({ ...selectedInputs, state: e.value });
      return;
    }
    setSelectedInputs({ ...selectedInputs, [name]: value });
  };

  const handleFetchDetail = () => {
    dispatch(
      fetchFunctionTests({
        flag: "detail",
        date: selectedInputs.date,
        name: selectedInputs.name,
        success: selectedInputs.state,
        type: level2.menuId,
        application_name: level3.menuId,
      })
    );
  };

  return (
    <Wrapper>
      <ul className="list-wrapper">
        <li className="details">
          <div className="radio-wrapper">
            <RadioButton
              id="fail"
              name="state"
              value="Fail"
              checked={selectedInputs.state === "Fail"}
              onChange={handleChange}
            />
            <Label htmlFor="fail" checked={selectedInputs.state === "Fail"}>
              Fail
            </Label>
            <RadioButton
              id="pass"
              name="state"
              value="Pass"
              checked={selectedInputs.state === "Pass"}
              onChange={handleChange}
            />
            <Label htmlFor="pass" checked={selectedInputs.state === "Pass"}>
              Pass
            </Label>
          </div>
          <DropDownList
            name="date"
            data={dates}
            value={selectedInputs.date}
            onChange={handleChange}
          />
          <DropDownList
            name="name"
            data={level2.menuId === "APPLICATION" ? devices : langs}
            value={selectedInputs.name}
            onChange={handleChange}
          />
          <Button look="flat" onClick={handleFetchDetail}>
            상세보기
          </Button>
        </li>
        <li className="excel">
          <ExcelDownButton
            userService={userService}
            params={{
              type: "functionTest",
              data: {
                inputs: selectedInputs,
                levels: { level2, level3 },
              },
            }}
          />
        </li>
      </ul>
    </Wrapper>
  );
};

LNB.propTypes = {
  userService: PropTypes.instanceOf(UserService),
};

export default LNB;
