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
import { convertDateFormat, getMinFromEndDate } from "../../utils";
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
    height: 48px;
    padding-left: 2rem;
    border: 1px solid #abb3c1;
    border-width: 0 1px;
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

// 응답시간 드롭다운 리스트
const level3ResList = window.CONFIG_NAV.TREE.children.RESPONSE_MALL.filter(
  (menu) => menu.active
).sort((a, b) => a.order - b.order);

// eslint-disable-next-line no-unused-vars
const GNB = ({ userService }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    inputs: { level1, level2, level3, level3Res, startDate, endDate },
  } = useSelector((state) => state.control);
  const [selectedInputs, setSelectedInputs] = useState({
    level1,
    level2,
    level3,
    level3Res,
    startDate,
    endDate,
  });

  // 드롭다운 리스트
  const [level2List, setLevel2List] = useState([]);
  const [level3List, setLevel3List] = useState([]);

  // 드롭다운 리스트 초기화: level2List
  useEffect(() => {
    const { parent, children } = window.CONFIG_NAV.TREE;
    const filtered = parent
      .filter((menu) => menu.active)
      .sort((a, b) => a.order - b.order);

    setLevel2List(filtered);
    setSelectedInputs((prevState) => ({
      ...prevState,
      level2: filtered[0],
      level3: children[filtered[0].menuId]
        .filter((item) => item.active)
        .sort((a, b) => a.order - b.order)[0],
      level3Res: level3ResList[0],
    }));
  }, [selectedInputs.level1]);

  // 드롭다운 리스트 초기화: level3List
  useEffect(() => {
    const { children } = window.CONFIG_NAV.TREE;
    const list = children[selectedInputs.level2.menuId]
      .filter((item) => item.active)
      .sort((a, b) => a.order - b.order);

    setLevel3List(list);
    setSelectedInputs((prevState) => ({ ...prevState, level3: list[0] }));
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
    }
    if (name === "endDate") {
      const sDate = new Date(selectedInputs.startDate);
      const eDate = new Date(value);
      const diffMs = eDate.getTime() - sDate.getTime();
      const diffDay = diffMs / (1000 * 60 * 60 * 24);

      if (eDate < sDate) {
        setSelectedInputs({
          ...selectedInputs,
          endDate: selectedInputs.startDate,
        });
        return;
      } else if (diffDay > 30) {
        setSelectedInputs({
          ...selectedInputs,
          startDate: convertDateFormat(value),
          endDate: convertDateFormat(value),
        });
        return;
      }
    }
    setSelectedInputs({
      ...selectedInputs,
      [name]: convertDateFormat(value),
    });
  };

  const onClick = useCallback(async () => {
    const { level1, level2, level3, level3Res, startDate, endDate } =
      selectedInputs;
    dispatch(
      setInputs({
        level1,
        level2,
        level3,
        level3Res,
        startDate,
        endDate,
      })
    );

    // const result = await userService.checkHoliday(selectedInputs);
    if (level1 === "기능테스트") {
      dispatch(
        fetchFunctionTests({
          refType: "chart",
          params: {
            type: level2.menuId,
            applicationName: level3.menuId,
            dates: [startDate, endDate],
          },
        })
      );

      if (level2.menuId === "APPLICATION") {
        history.push("/");
      } else {
        history.push("/brand");
      }
    } else {
      dispatch(
        fetchResponseTimes({
          brandName: level3Res.menuId,
          dates: [startDate, endDate],
        })
      );
      history.push("/response");
    }
  }, [selectedInputs, history, dispatch]);

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
            className="level2"
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
          <DropDownList
            className="level3Res"
            data={level3ResList}
            value={selectedInputs.level3Res}
            textField="menuValue"
            dataItemKey="id"
            disabled={selectedInputs.level1 === "기능테스트"}
            onChange={(e) =>
              setSelectedInputs({
                ...selectedInputs,
                level3Res: e.target.value,
              })
            }
          />
        </li>
        <li className="search">
          <label htmlFor="startDate">검색시작일</label>
          <DatePicker
            id="startDate"
            name="startDate"
            format="yyyy-MM-dd"
            min={getMinFromEndDate(selectedInputs.endDate)}
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
