import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import ChartWrapper from "../../containers/ChartWrapper";
import { AiFillAndroid, AiFillApple } from "react-icons/ai";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { convertDateFormat } from "../../utils";
import Indicator from "../../components/Indicator";

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
  .chart {
    flex: 1;
  }
`;

const Response = () => {
  const { list, isLoading, isError } = useSelector(
    (state) => state.responseTime
  );
  const {
    validList: { dates },
  } = useSelector((state) => state.control);
  const [aosSeries, setAosSeries] = useState({
    main: [],
    search: [],
    login: [],
  });
  const [iosSeries, setIosSeries] = useState({
    main: [],
    search: [],
    login: [],
  });
  const { INIT_OPTIONS } = window.CONFIG_CHART;
  const categories = dates.map((date) => Date.parse(date));
  const options = {
    ...INIT_OPTIONS,
    chart: {
      ...INIT_OPTIONS.chart,
      margin: [30, 30, 120, 60],
    },
    xAxis: {
      ...INIT_OPTIONS.xAxis,
      labels: {
        ...INIT_OPTIONS.xAxis.labels,
        style: {
          ...INIT_OPTIONS.xAxis.labels.style,
          fontSize: "12px",
        },
        formatter: function () {
          return convertDateFormat(new Date(categories[this.value]), true);
        },
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

  useEffect(() => {
    // highcharts 데이터
    const brands = {
      aos: [],
      ios: [],
    };
    let main = [];
    let search = [];
    let login = [];
    const { COLORS, INIT_SERIES_OPTIONS } = window.CONFIG_CHART;

    const setBrands = (type) => {
      for (let item of list[type]) {
        if (brands[type].indexOf(item.BRAND_NAME) < 0) {
          brands[type].push(item.BRAND_NAME);
        }
      }
    };

    const setSeriesData = (type) => {
      for (let i = 0; i < brands[type].length; i++) {
        const filtered = list[type].filter(
          (item) => item.BRAND_NAME === brands[type][i]
        );
        const series = {
          ...INIT_SERIES_OPTIONS,
          name: filtered[0].BRAND_NAME,
          color: COLORS[i],
          marker: { ...INIT_SERIES_OPTIONS.marker, lineColor: COLORS[i] },
        };
        const mainData = [];
        const searchData = [];
        const loginData = [];

        for (let f of filtered) {
          if (f.MAIN_TIME != null) {
            mainData.push(Number(f.MAIN_TIME));
          }
          if (f.SEARCH_TIME != null && f.SEARCH_TIME > -1) {
            searchData.push(Number(f.SEARCH_TIME));
          }
          if (f.LOGIN_TIME != null) {
            loginData.push(Number(f.LOGIN_TIME));
          }
        }
        series.data = mainData;
        main.push({ ...series });
        series.data = searchData;
        search.push({ ...series });
        series.data = loginData;
        login.push({ ...series });
      }
    };

    setBrands("aos");
    setBrands("ios");

    setSeriesData("aos");
    setAosSeries((prevState) => ({ ...prevState, main, search, login }));

    main = [];
    search = [];
    login = [];
    setSeriesData("ios");
    setIosSeries((prevState) => ({ ...prevState, main, search, login }));
  }, [list]);

  return (
    <ChartWrapper>
      {Object.keys(aosSeries).map((key, index) => (
        <Div key={index}>
          <Section>
            <h3 className="title">
              <div className="browser">
                <span className="circle">
                  <AiFillAndroid />
                </span>
                AOS
              </div>
              {key.toUpperCase()}
            </h3>
            <div className="chart">
              {isError && <Indicator type="error" />}
              {isLoading && <Indicator type="loading" />}
              {!isError &&
                !isLoading &&
                (!aosSeries[key].length ? (
                  <Indicator type="empty" />
                ) : (
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={{ ...options, series: aosSeries[key] }}
                  />
                ))}
            </div>
          </Section>
          <Section>
            <h3 className="title">
              <div className="browser ios">
                <span className="circle">
                  <AiFillApple />
                </span>
                iOS
              </div>
              {key.toUpperCase()}
            </h3>
            <div className="chart">
              {isError && <Indicator type="error" />}
              {isLoading && <Indicator type="loading" />}
              {!isError &&
                !isLoading &&
                (!iosSeries[key].length ? (
                  <Indicator type="empty" />
                ) : (
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={{ ...options, series: iosSeries[key] }}
                  />
                ))}
            </div>
          </Section>
        </Div>
      ))}
    </ChartWrapper>
  );
};

export default Response;
