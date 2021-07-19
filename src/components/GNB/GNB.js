import React, { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { setInputs } from "../../redux/controlSlice";
import { useHistory } from "react-router-dom";
import styled, { css } from "styled-components";
import { RadioButton } from "@progress/kendo-react-inputs";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { DatePicker } from "@progress/kendo-react-dateinputs";
import { Button } from "@progress/kendo-react-buttons";
import { convertDateFormat, getStartMinDate } from "../../utils";
import { fetchResponseTimes } from "../../redux/responseTimeSlice";
import { fetchFunctionTests } from "../../redux/functionTestSlice";
import UserService from "../../service/UserService";

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

const level2List = window.CONFIG_NAV.TREE.parent; // 첫번째 드롭다운 리스트
const getActiveDropdownList = (list) => {
  return list.filter((item) => item.active).sort((a, b) => a.order - b.order);
};

const GNB = ({ userService }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    inputs: { level1, level2, level3, startDate, endDate },
  } = useSelector((state) => state.control);
  const [selectedInputs, setSelectedInputs] = useState({
    level1,
    level2,
    level3,
    startDate,
    endDate,
  });
  const [level3List, setLevel3List] = useState(
    getActiveDropdownList(
      window.CONFIG_NAV.TREE.children[selectedInputs.level2.menuId]
    )
  );

  useEffect(() => {
    // 초기화
    const { parent, children } = window.CONFIG_NAV.TREE;
    const level2 = parent.find((menu) => menu.active && menu.order === 1);
    setSelectedInputs((prevState) => ({
      ...prevState,
      level2,
      level3: children[level2.menuId].find(
        (menu) => menu.active && menu.order === 1
      ),
    }));
  }, [selectedInputs.level1]);

  useEffect(() => {
    const list = getActiveDropdownList(
      window.CONFIG_NAV.TREE.children[selectedInputs.level2.menuId]
    );
    setSelectedInputs((prevState) => ({ ...prevState, level3: list[0] }));
    setLevel3List(list);
  }, [selectedInputs.level2]);

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    if (
      name === "startDate" &&
      new Date(value) > new Date(selectedInputs.endDate)
    ) {
      setSelectedInputs({
        ...selectedInputs,
        startDate: selectedInputs.endDate,
      });
      return;
    } else if (
      name === "endDate" &&
      new Date(value) < new Date(selectedInputs.startDate)
    ) {
      setSelectedInputs({
        ...selectedInputs,
        endDate: selectedInputs.startDate,
      });
      return;
    }
    setSelectedInputs({
      ...selectedInputs,
      [name]: convertDateFormat(value),
    });
  };

  // 📌📌📌📌📌📌📌
  const onClick = useCallback(async () => {
    const { level1, level2, level3, startDate, endDate } = selectedInputs;
    const result = await userService.checkHoliday(selectedInputs);

    dispatch(
      setInputs({
        level1,
        level2,
        level3,
        startDate,
        endDate,
      })
    );

    if (level1 === "기능테스트") {
      dispatch(
        fetchFunctionTests({
          flag: "chart",
          date: result,
          name: level3.menuId,
          type: level2.menuId,
        })
      );

      if (level2.menuId === "APPLICATION") {
        history.push("/");
      } else {
        history.push("/brand");
      }
    } else {
      dispatch(fetchResponseTimes({ date: result }));
      history.push("/response");
    }
  }, [selectedInputs, history, dispatch, userService]);

  return (
    <Wrapper>
      <ul className="list-wrapper">
        <li className="feature">
          <RadioButton
            id="featureTest"
            value="기능테스트"
            checked={selectedInputs.level1 === "기능테스트"}
            onChange={(e) =>
              setSelectedInputs({ ...selectedInputs, level1: e.value })
            }
          />
          <RadioLabel htmlFor="featureTest" checked={level1 === "기능테스트"}>
            기능테스트
          </RadioLabel>
          <DropDownList
            data={level2List}
            value={selectedInputs.level2}
            textField="menuValue"
            dataItemKey="id"
            disabled={selectedInputs.level1 === "응답시간"}
            onChange={(e) => {
              setSelectedInputs({
                ...selectedInputs,
                level2: e.target.value,
              });
            }}
          />
          <DropDownList
            data={level3List}
            value={selectedInputs.level3}
            textField="menuValue"
            dataItemKey="id"
            disabled={selectedInputs.level1 === "응답시간"}
            onChange={(e) =>
              setSelectedInputs({
                ...selectedInputs,
                level3: e.target.value,
              })
            }
          />
        </li>
        <li className="response">
          <RadioButton
            id="response"
            value="응답시간"
            checked={selectedInputs.level1 === "응답시간"}
            onChange={(e) =>
              setSelectedInputs({ ...selectedInputs, level1: e.value })
            }
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
            min={getStartMinDate()}
            max={new Date(selectedInputs.endDate)}
            value={new Date(selectedInputs.startDate)}
            onChange={handleDateChange}
          />
          <label htmlFor="endDate">검색종료일</label>
          <DatePicker
            id="endDate"
            name="endDate"
            format="yyyy-MM-dd"
            max={new Date()}
            value={new Date(selectedInputs.endDate)}
            onChange={handleDateChange}
          />
          <Button icon="search" look="flat" onClick={onClick} />
        </li>
      </ul>
    </Wrapper>
  );
};

GNB.propTypes = {
  userService: PropTypes.instanceOf(UserService),
};

export default GNB;
