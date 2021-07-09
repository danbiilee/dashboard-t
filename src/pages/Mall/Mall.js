import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import LNB from "../../components/LNB";
import Details from "../../components/Details";
import ChartWrapper from "../../containers/ChartWrapper";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.size.baseSpace};
`;

const Section = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
  .title {
    margin-bottom: ${({ theme }) => theme.size.baseSpace};
    font-size: 1.6rem;
    text-align: center;
  }
  .chart {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #cbced5;
    background-color: #fff;
    overflow: hidden;
  }
`;

const Mall = () => {
  const { startDate, endDate } = useSelector((state) => state.gnb);
  const pass = [
    {
      name: "Galaxy A8",
      data: [
        [Date.parse("2021-07-03"), 101],
        [Date.parse("2021-07-04"), 98],
        [Date.parse("2021-07-05"), 72],
        [Date.parse("2021-07-06"), 85],
        [Date.parse("2021-07-07"), 99],
        [Date.parse("2021-07-08"), 105],
      ],
    },
    {
      name: "Galaxy Note9",
      data: [
        [Date.parse("2021-07-03"), 118],
        [Date.parse("2021-07-04"), 73],
        [Date.parse("2021-07-05"), 88],
        [Date.parse("2021-07-06"), 99],
        [Date.parse("2021-07-07"), 101],
        [Date.parse("2021-07-08"), 107],
      ],
    },
    {
      name: "Galaxy Note10",
      data: [
        [Date.parse("2021-07-03"), 87],
        [Date.parse("2021-07-04"), 90],
        [Date.parse("2021-07-05"), 88],
        [Date.parse("2021-07-06"), 78],
        [Date.parse("2021-07-07"), 95],
        [Date.parse("2021-07-08"), 98],
      ],
    },
  ];
  const fail = [
    {
      name: "Galaxy A8",
      data: [
        [Date.parse("2021-07-03"), 69],
        [Date.parse("2021-07-04"), 63],
        [Date.parse("2021-07-05"), 77],
        [Date.parse("2021-07-06"), 80],
        [Date.parse("2021-07-07"), 72],
        [Date.parse("2021-07-08"), 49],
      ],
    },
    {
      name: "Galaxy Note9",
      data: [
        [Date.parse("2021-07-03"), 59],
        [Date.parse("2021-07-04"), 65],
        [Date.parse("2021-07-05"), 67],
        [Date.parse("2021-07-06"), 61],
        [Date.parse("2021-07-07"), 56],
        [Date.parse("2021-07-08"), 48],
      ],
    },
    {
      name: "Galaxy Note10",
      data: [
        [Date.parse("2021-07-03"), 43],
        [Date.parse("2021-07-04"), 55],
        [Date.parse("2021-07-05"), 51],
        [Date.parse("2021-07-06"), 57],
        [Date.parse("2021-07-07"), 62],
        [Date.parse("2021-07-08"), 67],
      ],
    },
  ];

  const options = {
    chart: {
      type: "line",
      plotBorderWidth: 1,
    },
    title: {
      text: undefined,
    },
    yAxis: {
      title: {
        text: undefined,
      },
      min: 0,
    },
    xAxis: {
      type: "datetime",
      labels: {
        format: "{value:%m-%d}",
      },
      min: Date.parse(startDate),
      max: Date.parse(endDate),
    },
    tooltip: {
      // shared: true,
    },
    plotOptions: {
      dashStyle: "shortDash",
    },
    series: [
      {
        id: "S8+",
        name: "Galaxy S8+",
        data: [
          [Date.parse("2021-07-03"), 118],
          [Date.parse("2021-07-04"), 122],
          [Date.parse("2021-07-05"), 110],
          [Date.parse("2021-07-06"), 90],
          [Date.parse("2021-07-07"), 80],
          [Date.parse("2021-07-08"), 95],
        ],
      },
      {
        name: "Galaxy S8+(Fail)",
        data: [
          [Date.parse("2021-07-03"), 75],
          [Date.parse("2021-07-04"), 49],
          [Date.parse("2021-07-05"), 66],
          [Date.parse("2021-07-06"), 57],
          [Date.parse("2021-07-07"), 33],
          [Date.parse("2021-07-08"), 30],
        ],
        linkedTo: "S8+",
        marker: {
          enabled: false,
        },
      },
      {
        id: "S105G",
        name: "Galaxy S105G",
        data: [
          [Date.parse("2021-07-03"), 110],
          [Date.parse("2021-07-04"), 115],
          [Date.parse("2021-07-05"), 80],
          [Date.parse("2021-07-06"), 100],
          [Date.parse("2021-07-07"), 90],
          [Date.parse("2021-07-08"), 93],
        ],
      },
      {
        name: "Galaxy S105G(Fail)",
        data: [
          [Date.parse("2021-07-03"), 80],
          [Date.parse("2021-07-04"), 76],
          [Date.parse("2021-07-05"), 65],
          [Date.parse("2021-07-06"), 68],
          [Date.parse("2021-07-07"), 72],
          [Date.parse("2021-07-08"), 59],
        ],
        linkedTo: "S105G",
        marker: {
          enabled: false,
        },
      },
    ],
  };

  return (
    <Wrapper>
      <ChartWrapper>
        <Section>
          <h3 className="title">APMALL</h3>
          <div className="chart">
            {/* <HighchartsReact highcharts={Highcharts} options={options} /> */}
          </div>
        </Section>
      </ChartWrapper>
      <LNB />
      <Details />
    </Wrapper>
  );
};

export default Mall;
