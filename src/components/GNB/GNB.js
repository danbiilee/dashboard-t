import React, { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setLevel1,
  setLevel2,
  setLevel3,
  setDateRange,
} from "../../redux/gnbSlice";
import { useHistory } from "react-router-dom";
import styled, { css } from "styled-components";
import { RadioButton } from "@progress/kendo-react-inputs";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { DateRangePicker } from "@progress/kendo-react-dateinputs";
import { Button } from "@progress/kendo-react-buttons";
import { CustomStartDateInput, CustomEndDateInput } from "../CustomDatePicker";
import { treemenu } from "../../utils/listData";
import { convertDateFormat } from "../../utils";

const level2List = Object.keys(treemenu); // 첫번째 드롭다운 리스트

const Wrapper = styled.nav`
  height: 4.8rem;
  padding: 0 ${({ theme }) => theme.size.baseSpace};
  background-color: #d6dae0;
  border-bottom: 1px solid #abb3c1;
  .list-wrapper {
    display: flex;
    align-items: center;
    height: inherit;
    list-style: none;
  }
  .feature,
  .search {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .response {
    padding: 0.9rem 5rem;
    border: 1px solid #abb3c1;
    border-width: 0 1px;
  }
  .search {
    padding-left: ${({ theme }) => theme.size.baseSpace};
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

const GNB = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { level1, level2, level3, startDate, endDate } = useSelector(
    (state) => state.gnb
  );

  // 두번째 드롭다운 리스트
  const [level3List, setLevel3List] = useState(treemenu[level2]);
  useEffect(() => {
    setLevel3List(treemenu[level2]);
  }, [level2]);

  const [selectedStartDate, setSelectedStartDate] = useState(startDate);
  const [selectedEndDate, setSelectedEndDate] = useState(endDate);
  const handleChange = (e) => {
    const { start, end } = e.value;
    if (start !== null && end !== null) {
      setSelectedStartDate(convertDateFormat(start));
      setSelectedEndDate(convertDateFormat(end));
    }
  };

  const onClick = useCallback(() => {
    dispatch(
      setDateRange({
        start: selectedStartDate,
        end: selectedEndDate,
      })
    );

    // 라우팅
    if (level1 === "기능테스트" && level2 === "직영몰") {
      history.push("/");
    } else if (level1 === "기능테스트" && level2 === "브랜드") {
      history.push("/brand");
    } else {
      history.push("/response");
    }
  }, [level1, level2, history, dispatch, selectedStartDate, selectedEndDate]);

  return (
    <Wrapper>
      <ul className="list-wrapper">
        <li className="feature">
          <RadioButton
            id="featureTest"
            value="기능테스트"
            checked={level1 === "기능테스트"}
            onChange={(e) => dispatch(setLevel1(e.value))}
          />
          <Label htmlFor="featureTest" checked={level1 === "기능테스트"}>
            기능테스트
          </Label>
          <DropDownList
            data={level2List}
            value={level2}
            disabled={level1 === "응답시간"}
            onChange={(e) => dispatch(setLevel2(e.target.value))}
          />
          <DropDownList
            data={level3List}
            value={level3}
            disabled={level1 === "응답시간"}
            onChange={(e) => dispatch(setLevel3(e.target.value))}
          />
        </li>
        <li className="response">
          <RadioButton
            id="response"
            value="응답시간"
            checked={level1 === "응답시간"}
            onChange={(e) => dispatch(setLevel1(e.value))}
          />
          <Label htmlFor="response" checked={level1 === "응답시간"}>
            응답시간
          </Label>
        </li>
        <li className="search">
          <DateRangePicker
            max={new Date()}
            startDateInput={() => (
              <CustomStartDateInput value={selectedStartDate} />
            )}
            endDateInput={() => <CustomEndDateInput value={selectedEndDate} />}
            defaultValue={{
              start: new Date(selectedStartDate),
              end: new Date(selectedEndDate),
            }}
            onChange={handleChange}
          />
          <Button icon="search" look="flat" onClick={onClick} />
        </li>
      </ul>
    </Wrapper>
  );
};

export default GNB;
