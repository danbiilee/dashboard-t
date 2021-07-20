import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import LNB from "../../components/LNB";
import Details from "../../components/Details";
import ChartWrapper from "../../containers/ChartWrapper";
import { setValidList } from "../../redux/controlSlice";
import { fetchFunctionTests } from "../../redux/functionTestSlice";
import { FaChrome, FaSafari } from "react-icons/fa";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { convertDateFormat } from "../../utils";
import Indicator from "../../components/Indicator";
import UserService from "../../service/UserService";

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) =>
    `${theme.size.componentSpace} ${theme.size.baseSpace}`};
`;

const Section = styled.section`
  ${({ empty }) =>
    empty
      ? css`
          flex: 1;
          display: flex;
          flex-direction: column;
          .chart {
            flex: 1;
          }
        `
      : css`
          display: inline-block;
          width: 49.46%;
          &:last-of-type {
            float: right;
          }
        `}
  &:last-of-type {
    margin-left: ${({ theme }) => theme.size.componentSpace};
  }
  .title {
    position: relative;
    margin-bottom: ${({ theme }) => theme.size.componentSpace};
    text-align: center;
  }
  .browser {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    color: #2f56a7;
    font-size: 1.4rem;
    svg {
      margin-top: -2px;
      margin-right: 0.5rem;
      font-size: 2.7rem;
    }
  }
  .chart {
    border: 1px solid #cbced5;
    background-color: #fff;
  }
`;

const Brand = ({ userService }) => {
  const dispatch = useDispatch();
  const {
    chart: { isLoading, list: chartList, isError },
  } = useSelector((state) => state.functionTest);
  const {
    inputs: { level2, level3 },
    validList: { dates },
  } = useSelector((state) => state.control);

  const [series, setSeries] = useState({
    chrome: [],
    safari: [],
  });
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
  };

  // dispatch chart -> setValidList -> dispatch detail
  useEffect(() => {
    if (isLoading || isError || !chartList.length) {
      return;
    }

    let dateList = new Set();
    let langList = new Set();
    for (let item of chartList) {
      dateList.add(item.START_TIME);
      langList.add(item.DEVICE_NAME); // 📌 실데이터는 LANGUAGE 키에 담겨있지만, DEVICE_NAME으로 받음
    }
    dateList = Array.from(dateList);
    langList = Array.from(langList);

    dispatch(setValidList({ type: "dates", list: dateList.sort() }));
    dispatch(setValidList({ type: "langs", list: langList.sort() }));

    dispatch(
      fetchFunctionTests({
        flag: "detail",
        date: dateList[dateList.length - 1], // 가장 최근 날짜
        name: langList[0],
        success: "Fail", // Default
        type: level2.menuId,
        application_name: level3.menuId,
      })
    );

    // highcharts 데이터
    const { COLORS, INIT_SERIES_OPTIONS } = window.CONFIG_CHART;
    const highData = {
      chrome: [],
      safari: [],
    };
    for (let item of chartList) {
      const ver = item.APPLICATION_VERSION.toLowerCase();
      if (ver.includes("chrome")) {
        highData.chrome.push(item);
      } else if (ver.includes("safari")) {
        highData.safari.push(item);
      }
    }

    const seriesTmp = {
      chrome: [],
      safari: [],
    };

    const setSeriesData = (type) => {
      for (let i = 0; i < langList.length; i++) {
        const filtered = highData[type].filter(
          (item) => item.DEVICE_NAME === langList[i]
        );
        if (!filtered.length) {
          continue;
        }

        let pass = {
          ...INIT_SERIES_OPTIONS,
          name: filtered[0].DEVICE_NAME,
          color: COLORS[i],
          marker: { ...INIT_SERIES_OPTIONS.marker, lineColor: COLORS[i] },
        };
        let fail = {
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
        pass = { ...pass, data: [...passData] };
        fail = { ...fail, data: [...failData] };

        seriesTmp[type].push(pass);
        seriesTmp[type].push(fail);
      }
    };

    setSeriesData("chrome");
    setSeriesData("safari");
    setSeries((prevState) => ({
      ...prevState,
      chrome: seriesTmp.chrome,
      safari: seriesTmp.safari,
    }));
  }, [dispatch, chartList, level2, level3, isLoading, isError]);

  ///!series[key].length ? true : false
  return (
    <Wrapper>
      <ChartWrapper isEmpty={!chartList.length}>
        {Object.keys(series).map((key, index) => (
          <Section key={index} empty={!chartList.length}>
            <h3 className="title">
              <div className="browser">
                {key === "chrome" ? <FaChrome /> : <FaSafari />}
                {key.toUpperCase()}
              </div>
              {level3.menuValue}
            </h3>
            <div className="chart">
              {isError && <Indicator type="error" isFullHeight={true} />}
              {isLoading && <Indicator type="loading" isFullHeight={true} />}
              {!isError &&
                !isLoading &&
                (!series[key].length ? (
                  <Indicator type="empty" isFullHeight={true} />
                ) : (
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={{ ...options, series: series[key] }}
                  />
                ))}
            </div>
          </Section>
        ))}
      </ChartWrapper>
      <LNB userService={userService} />
      <Details />
    </Wrapper>
  );
};

Brand.propTypes = {
  userService: PropTypes.instanceOf(UserService),
};

export default Brand;
