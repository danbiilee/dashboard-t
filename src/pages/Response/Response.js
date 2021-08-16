import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import ChartWrapper from "../../containers/ChartWrapper";
import { AiFillAndroid, AiFillApple } from "react-icons/ai";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { convertDateFormat, getDateList } from "../../utils";
import Indicator from "../../components/Indicator";
import UserService from "../../service/UserService";
import ExcelDownButton from "../../components/ExcelDownButton/ExcelDownButton";
import {
  CHART_COLORS,
  INIT_OPTIONS,
  INIT_SERIES_OPTIONS,
} from "../../constants/chart";

const Div = styled.div`
  margin-bottom: ${({ theme }) => theme.size.baseSpace};
  &:last-of-type {
    margin-bottom: 0;
  }
  & > section:first-of-type {
    margin-right: ${({ theme }) => theme.size.baseSpace};
  }
  & > section:last-of-type {
    float: right;
  }
`;

const Section = styled.section`
  display: inline-block;
  width: 49.18%;
  padding: ${({ theme }) => theme.size.componentSpace};
  border: 1px solid #cbced5;
  background-color: #fff;
  .title {
    position: relative;
    margin-bottom: ${({ theme }) => theme.size.componentSpace};
    color: #202c5c;
    font-size: 1.5rem;
    text-align: center;
  }
  .browser {
    position: absolute;
    top: -2px;
    left: 0;
    display: flex;
    align-items: center;
    color: #2f56a7;
    font-size: 1.3rem;
    .circle {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 23px;
      height: 23px;
      background: gray;
      border-radius: 50%;
      margin-right: 0.5rem;
      background-color: #2f56a7;
    }
    svg {
      color: #fff;
      font-size: 1.5rem;
    }
    &.ios svg {
      margin-left: 1px;
    }
  }
  .excel {
    position: absolute;
    right: -8px;
    top: -8px;
  }
  .chart {
    flex: 1;
  }
`;

const Response = ({ userService }) => {
  const dispatch = useDispatch();
  const { list, isLoading, isError } = useSelector(
    (state) => state.responseTime
  );
  const {
    inputs: { level3Res, startDate, endDate },
  } = useSelector((state) => state.control);

  // highcharts 데이터
  const [series, setSeries] = useState({
    aos: {
      main: [],
      search: [],
      login: [],
    },
    ios: {
      main: [],
      search: [],
      login: [],
    },
  });
  const defaultOptions = {
    ...INIT_OPTIONS,
    chart: {
      ...INIT_OPTIONS.chart,
      margin: [30, 30, 135, 60],
    },
    xAxis: {
      ...INIT_OPTIONS.xAxis,
      labels: {
        ...INIT_OPTIONS.xAxis.labels,
        style: {
          ...INIT_OPTIONS.xAxis.labels.style,
          fontSize: "12px",
        },
      },
    },
    tooltip: {
      ...INIT_OPTIONS.tooltip,
      formatter: function () {
        const points = this.points;
        points.sort((a, b) => b.y - a.y);
        return points.reduce(function (s, point) {
          return `${s} ${point.series.name}: ${point.y}<br/>`;
        }, "");
      },
    },
    legend: {
      symbolWidth: 0,
      symbolHeight: 0,
      symbolPadding: 0,
      useHTML: true,
      labelFormatter: function () {
        const symbol = `<span style="display: inline-block; width: 10px; height: 10px; margin-right: 4px; background-color: ${this.color}"></span>`;
        return symbol + this.name;
      },
      itemStyle: {
        color: "#6D6F77",
        fontWeight: "normal",
        fontSize: "13px",
      },
    },
  };
  const [options, setOptions] = useState({
    aos: defaultOptions,
    ios: defaultOptions,
  });

  useEffect(() => {
    if (isLoading || isError) {
      return;
    }

    // highcharts 데이터
    const brands = {
      aos: [],
      ios: [],
    };

    const setBrands = (type) => {
      for (let item of list[type]) {
        if (brands[type].indexOf(item.BRAND_NAME) < 0) {
          brands[type].push(item.BRAND_NAME);
        }
      }
    };

    const setOptionCategories = (type) => {
      let filterd = new Set();
      for (let item of list[type]) {
        filterd.add(Date.parse(item.START_TIME));
      }
      filterd = Array.from(filterd).sort();
      setOptions((prevState) => ({
        ...prevState,
        [type]: {
          ...prevState[type],
          xAxis: {
            ...prevState[type].xAxis,
            labels: {
              ...prevState[type].xAxis.labels,
              categories: filterd,
              formatter: function () {
                return convertDateFormat(new Date(filterd[this.value]), true);
              },
            },
          },
        },
      }));
    };

    const setSeriesData = (type) => {
      let main = [];
      let search = [];
      let login = [];
      for (let i = 0; i < brands[type].length; i++) {
        const filtered = list[type].filter(
          (item) => item.BRAND_NAME === brands[type][i]
        );
        const initSeries = {
          ...INIT_SERIES_OPTIONS,
          name: filtered[0].BRAND_NAME,
          color: CHART_COLORS[i],
          marker: { ...INIT_SERIES_OPTIONS.marker, lineColor: CHART_COLORS[i] },
        };
        const mainData = [];
        const searchData = [];
        const loginData = [];

        for (let f of filtered) {
          // null, space 제외 (불신의 주석처리)
          // if (
          //   (f.MAIN_TIME == null || f.MAIN_TIME === " ") &&
          //   (f.MAIN_TIME == null || f.MAIN_TIME === " ") &&
          //   (f.MAIN_TIME == null || f.MAIN_TIME === " ")
          // ) {
          //   continue;
          // }

          mainData.push(Number(Number(f.MAIN_TIME).toFixed(1)));
          loginData.push(Number(Number(f.LOGIN_TIME).toFixed(1)));
          if (f.SEARCH_TIME > -1) {
            searchData.push(Number(Number(f.SEARCH_TIME).toFixed(1)));
          }
        }

        initSeries.data = [...mainData];
        main.push({ ...initSeries });

        if (searchData.length) {
          initSeries.data = [...searchData];
          search.push({ ...initSeries });
        }

        initSeries.data = [...loginData];
        login.push({ ...initSeries });
      }

      setSeries((prevState) => ({
        ...prevState,
        [type]: {
          main,
          search,
          login,
        },
      }));
    };

    setBrands("aos");
    setBrands("ios");
    setOptionCategories("aos");
    setOptionCategories("ios");
    setSeriesData("aos");
    setSeriesData("ios");
  }, [dispatch, list, isError, isLoading]);

  return (
    <ChartWrapper>
      {Object.keys(series.aos).map((key, index) => (
        <Div key={index}>
          {Object.keys(series).map((os, index) => (
            <Section key={index}>
              <h3 className="title">
                <div className="browser">
                  <span className="circle">
                    {os === "aos" ? <AiFillAndroid /> : <AiFillApple />}
                  </span>
                  {os.toUpperCase()}
                </div>
                {key.toUpperCase()}
                {key === "main" && (
                  <div className="excel">
                    <ExcelDownButton
                      userService={userService}
                      params={{
                        type: "responseTime",
                        data: {
                          name: level3Res.menuId,
                          dates: getDateList(startDate, endDate),
                        },
                      }}
                    />
                  </div>
                )}
              </h3>
              <div className="chart">
                {isError && <Indicator type="error" />}
                {isLoading && <Indicator type="loading" />}
                {!isError &&
                  !isLoading &&
                  (!series[os][key].length ? (
                    <Indicator type="empty" />
                  ) : (
                    <HighchartsReact
                      highcharts={Highcharts}
                      options={{
                        ...options[os],
                        series: series[os][key],
                      }}
                    />
                  ))}
              </div>
            </Section>
          ))}
        </Div>
      ))}
    </ChartWrapper>
  );
};

Response.propTypes = {
  userService: PropTypes.instanceOf(UserService),
};

export default Response;
