import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import LNB from "../../components/LNB";
import Details from "../../components/Details";
import ChartWrapper from "../../containers/ChartWrapper";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { fetchFunctionTests } from "../../redux/functionTestSlice";
import { setValidList } from "../../redux/controlSlice";
import Indicator from "../../components/Indicator";
import UserService from "../../service/UserService";
import { convertDateFormat } from "../../utils";

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) =>
    `${theme.size.componentSpace} ${theme.size.baseSpace}`};
`;

const Section = styled.section`
  flex: 1;
  height: 100%;
  ${({ isEmpty }) =>
    isEmpty &&
    css`
      display: flex;
      flex-direction: column;
      .chart {
        flex: 1;
      }
    `}
  .title {
    margin-bottom: ${({ theme }) => theme.size.componentSpace};
    font-size: 2rem;
    text-align: center;
  }
  .chart {
    border: 1px solid #cbced5;
    background-color: #fff;
  }
`;

const Mall = ({ userService }) => {
  const dispatch = useDispatch();
  const {
    chart: { isLoading, list: chartList, isError },
  } = useSelector((state) => state.functionTest);
  const {
    inputs: { level2, level3 },
    validList: { dates },
  } = useSelector((state) => state.control);

  const [series, setSeries] = useState([]);
  const { INIT_OPTIONS } = window.CONFIG_CHART;
  const categories = dates.map((date) => Date.parse(date));
  const options = {
    ...INIT_OPTIONS,
    xAxis: {
      ...INIT_OPTIONS.xAxis,
      labels: {
        ...INIT_OPTIONS.xAxis.labels,
        formatter: function () {
          return convertDateFormat(new Date(categories[this.value]), true);
        },
      },
    },
    series,
  };

  // dispatch chart -> setValidList -> dispatch detail
  useEffect(() => {
    if (isLoading || isError || !chartList.length) {
      return;
    }

    let dateList = new Set();
    let deviceList = new Set();
    for (let item of chartList) {
      dateList.add(item.START_TIME);
      deviceList.add(item.DEVICE_NAME);
    }
    dateList = Array.from(dateList);
    deviceList = Array.from(deviceList);

    dispatch(setValidList({ type: "dates", list: dateList.sort() }));
    dispatch(setValidList({ type: "devices", list: deviceList.sort() }));

    dispatch(
      fetchFunctionTests({
        refType: "detail",
        params: {
          type: level2.menuId,
          applicationName: level3.menuId,
          deviceName: deviceList[0],
          date: dateList[dateList.length - 1], // 가장 최근 날짜
          status: "Fail", // Default
        },
      })
    );

    // highcharts 데이터
    const { COLORS, INIT_SERIES_OPTIONS } = window.CONFIG_CHART;
    const seriesTmp = [];
    for (let i = 0; i < deviceList.length; i++) {
      const filtered = chartList.filter(
        (item) => item.DEVICE_NAME === deviceList[i]
      );
      const pass = {
        ...INIT_SERIES_OPTIONS,
        name: `${filtered[0].DEVICE_NAME}(Pass)`,
        color: COLORS[i],
        marker: { ...INIT_SERIES_OPTIONS.marker, lineColor: COLORS[i] },
      };
      const fail = {
        ...INIT_SERIES_OPTIONS,
        name: `${filtered[0].DEVICE_NAME}(Fail)`,
        color: COLORS[i],
        marker: { ...INIT_SERIES_OPTIONS.marker, lineColor: COLORS[i] },
        dashStyle: "shortdash",
      };

      const passData = [];
      const failData = [];
      for (let f of filtered) {
        passData.push(f.PASS);
        failData.push(f.FAIL);
      }
      pass.data = [...passData];
      fail.data = [...failData];

      seriesTmp.push(pass);
      seriesTmp.push(fail);
    }

    setSeries([...seriesTmp]);
  }, [dispatch, chartList, level2, level3, isLoading, isError]);

  return (
    <Wrapper>
      <ChartWrapper isEmpty={!chartList.length}>
        <Section isEmpty={!chartList.length}>
          <h3 className="title">{level3.menuValue}</h3>
          <div className="chart">
            {isError && <Indicator type="error" isFullHeight={true} />}
            {isLoading && <Indicator type="loading" isFullHeight={true} />}
            {!isError &&
              !isLoading &&
              (!chartList.length ? (
                <Indicator type="empty" isFullHeight={true} />
              ) : (
                <HighchartsReact highcharts={Highcharts} options={options} />
              ))}
          </div>
        </Section>
      </ChartWrapper>
      <LNB userService={userService} />
      <Details />
    </Wrapper>
  );
};

Mall.propTypes = {
  userService: PropTypes.instanceOf(UserService),
};

export default Mall;
