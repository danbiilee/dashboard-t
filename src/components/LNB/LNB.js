import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled, { css } from "styled-components";
import { RadioButton } from "@progress/kendo-react-inputs";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { Button } from "@progress/kendo-react-buttons";
import { RiFileExcel2Fill } from "react-icons/ri";
import { getAddedDay, convertDateFormat } from "../../utils";
import { devices } from "../../utils/listData";

const Wrapper = styled.nav`
  height: 4rem;
  padding: 0 ${({ theme }) => theme.size.baseSpace};
  margin-bottom: ${({ theme }) => theme.size.componentSpace};
  background-color: #eff0f3;
  border: 1px solid #cbced5;
`;

const Ul = styled.ul`
  display: flex;
  align-items: center;
  height: inherit;
  list-style: none;
`;

const Label = styled.label`
  ${(props) =>
    props.checked &&
    css`
      color: #2f56a7;
    `}
`;
const getDateRangeList = (start, end) => {
  const result = [];
  let curr = start;
  while (curr <= end) {
    result.push(curr);
    curr = convertDateFormat(getAddedDay(curr));
  }
  return result.reverse();
};

const LNB = () => {
  const { startDate, endDate } = useSelector((state) => state.gnb);
  const dateRangeList = getDateRangeList(startDate, endDate);
  const [selectedInputs, setSelectedInputs] = useState({
    state: "fail",
    date: dateRangeList[0],
    device: devices[0],
  });

  useEffect(() => {
    // 비동기 setState -> 변경된 시작일, 종료일에 맞는 dateRangeList 값으로 바꿔줌
    setSelectedInputs((prevState) => ({
      ...prevState,
      date: dateRangeList[0],
    }));
  }, [startDate, endDate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // RadioButton: e.target 값 undefined
    if (name == null && value == null) {
      setSelectedInputs({ ...selectedInputs, state: e.value });
      return;
    }
    setSelectedInputs({ ...selectedInputs, [name]: value });
  };

  return (
    <Wrapper>
      <Ul>
        <li>
          <RadioButton
            id="fail"
            name="state"
            value="fail"
            checked={selectedInputs.state === "fail"}
            onChange={handleChange}
          />
          <Label htmlFor="fail" checked={selectedInputs.state === "fail"}>
            Fail
          </Label>
          <RadioButton
            id="pass"
            name="state"
            value="pass"
            checked={selectedInputs.state === "pass"}
            onChange={handleChange}
          />
          <Label htmlFor="pass" checked={selectedInputs.state === "pass"}>
            Pass
          </Label>
        </li>
        <li>
          <DropDownList
            name="date"
            data={dateRangeList}
            value={selectedInputs.date}
            onChange={handleChange}
          />
        </li>
        <li>
          <DropDownList
            name="device"
            data={devices}
            value={selectedInputs.device}
            onChange={handleChange}
          />
        </li>
        <li>
          <Button look="flat">상세보기</Button>
        </li>
        <li>
          <Button look="flat">
            <RiFileExcel2Fill />
          </Button>
        </li>
      </Ul>
    </Wrapper>
  );
};

export default LNB;
