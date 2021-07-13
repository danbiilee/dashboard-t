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
import { DatePicker } from "@progress/kendo-react-dateinputs";
import { Button } from "@progress/kendo-react-buttons";
import { treemenu } from "../../../config/nav.config";
import {
  convertDateFormat,
  getRangeMinDate,
  filterDropDownList,
} from "../../utils";

const level2List = Object.keys(treemenu); // 첫번째 드롭다운 리스트

const Wrapper = styled.nav`
  height: 70px;
  padding: 0 ${({ theme }) => theme.size.baseSpace};
  background-color: #d6dae0;
  border-bottom: 1px solid #abb3c1;
  .list-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: inherit;
    list-style: none;
  }
  .feature,
  .response,
  .search {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .response {
    flex: 0.8;
    height: 48px;
    border: 1px solid #abb3c1;
    border-width: 0 1px;
    label {
      margin-right: 0;
    }
  }
  .search {
    padding-left: ${({ theme }) => theme.size.componentSpace};
    label {
      margin-right: ${({ theme }) => theme.size.componentSpace};
    }
  }
`;

const RadioLabel = styled.label`
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
  const [level3List, setLevel3List] = useState(
    filterDropDownList(treemenu[level2])
  );
  useEffect(() => {
    setLevel3List(filterDropDownList(treemenu[level2]));
  }, [level2]);

  const [searchDate, setSearchDate] = useState({
    startDate,
    endDate,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (
      name === "startDate" &&
      new Date(value) > new Date(searchDate.endDate)
    ) {
      setSearchDate({
        ...searchDate,
        startDate: searchDate.endDate,
      });
      return;
    } else if (
      name === "endDate" &&
      new Date(value) < new Date(searchDate.startDate)
    ) {
      setSearchDate({
        ...searchDate,
        endDate: searchDate.startDate,
      });
      return;
    }
    setSearchDate({
      ...searchDate,
      [name]: convertDateFormat(value),
    });
  };

  const onClick = useCallback(() => {
    const ms = new Date(searchDate.endDate) - new Date(searchDate.startDate);
    const term = ms / 1000 / 60 / 60 / 24 + 1;
    console.log(term);
    if (term > 5) {
      // 📌📌📌📌📌📌5일 초과 공휴일 검사 필요📌📌📌📌📌📌📌
      return;
    }

    dispatch(
      setDateRange({
        start: searchDate.startDate,
        end: searchDate.endDate,
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
  }, [level1, level2, history, dispatch, searchDate]);

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
          <RadioLabel htmlFor="featureTest" checked={level1 === "기능테스트"}>
            기능테스트
          </RadioLabel>
          <DropDownList
            data={level2List}
            value={level2}
            disabled={level1 === "응답시간"}
            onChange={(e) => dispatch(setLevel2(e.target.value))}
          />
          <DropDownList
            data={level3List}
            textField="menuValue"
            dataItemKey="id"
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
          <RadioLabel htmlFor="response" checked={level1 === "응답시간"}>
            응답시간
          </RadioLabel>
        </li>
        <li className="search">
          <label htmlFor="startDate">검색시작일</label>
          <DatePicker
            id="startDate"
            name="startDate"
            format="yyyy-MM-dd"
            value={new Date(searchDate.startDate)}
            onChange={handleChange}
          />
          <label htmlFor="endDate">검색종료일</label>
          <DatePicker
            id="endDate"
            name="endDate"
            format="yyyy-MM-dd"
            max={new Date()}
            value={new Date(searchDate.endDate)}
            onChange={handleChange}
          />
          <Button icon="search" look="flat" onClick={onClick} />
        </li>
      </ul>
    </Wrapper>
  );
};

export default GNB;
