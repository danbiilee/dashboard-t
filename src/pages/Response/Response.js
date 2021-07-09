import React from "react";
import styled from "styled-components";
import ChartWrapper from "../../containers/ChartWrapper";
import { AiFillAndroid, AiFillApple } from "react-icons/ai";

const Section = styled.section`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.size.componentSpace};
  margin-bottom: ${({ theme }) => theme.size.baseSpace};
  &:nth-last-of-type(-n + 2) {
    margin-bottom: 0;
  }
  &:nth-of-type(odd) {
    margin-right: ${({ theme }) => theme.size.baseSpace};
  }
  border: 1px solid #cbced5;
  background-color: #fff;

  .title {
    position: relative;
    margin-bottom: ${({ theme }) => theme.size.componentSpace};
    color: #202c5c;
    font-size: 1.3rem;
    text-align: center;
  }
  .browser {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    color: #2f56a7;
    svg {
      margin-top: -2px;
      margin-right: 0.3rem;
      font-size: 1.5rem;
    }
  }
  .chart {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    /* background-color: #fff; */
    background-color: lavender;
  }
`;

const Response = () => {
  return (
    <ChartWrapper>
      <Section>
        <h3 className="title">
          <div className="browser">
            <AiFillAndroid />
            AOS
          </div>
          MAIN
        </h3>
        <div className="chart">line chart here!</div>
      </Section>
      <Section>
        <h3 className="title">
          <div className="browser">
            <AiFillApple />
            iOS
          </div>
          MAIN
        </h3>
        <div className="chart">line chart here!</div>
      </Section>
      <Section>
        <h3 className="title">
          <div className="browser">
            <AiFillAndroid />
            AOS
          </div>
          MAIN
        </h3>
        <div className="chart">line chart here!</div>
      </Section>
      <Section>
        <h3 className="title">
          <div className="browser">
            <AiFillApple />
            iOS
          </div>
          MAIN
        </h3>
        <div className="chart">line chart here!</div>
      </Section>
      <Section>
        <h3 className="title">
          <div className="browser">
            <AiFillAndroid />
            AOS
          </div>
          MAIN
        </h3>
        <div className="chart">line chart here!</div>
      </Section>
      <Section>
        <h3 className="title">
          <div className="browser">
            <AiFillApple />
            iOS
          </div>
          MAIN
        </h3>
        <div className="chart">line chart here!</div>
      </Section>
    </ChartWrapper>
  );
};

export default Response;
