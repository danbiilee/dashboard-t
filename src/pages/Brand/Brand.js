import React from "react";
import styled from "styled-components";
import LNB from "../../components/LNB";
import Details from "../../components/Details";
import ChartWrapper from "../../containers/ChartWrapper";
import {
  FaInternetExplorer,
  FaEdge,
  FaChrome,
  FaFirefoxBrowser,
  FaSafari,
  FaOpera,
} from "react-icons/fa";

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) =>
    `${theme.size.componentSpace} ${theme.size.baseSpace}`};
`;

const Section = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
  &:nth-of-type(1) {
    margin-right: ${({ theme }) => theme.size.componentSpace};
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
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #cbced5;
    background-color: #fff;
  }
`;

const Brand = () => {
  return (
    <Wrapper>
      <ChartWrapper>
        <Section>
          <h3 className="title">
            <div className="browser">
              <FaChrome />
              CHROME
            </div>
            AMOREPACIFIC
          </h3>
          <div className="chart">line chart here!</div>
        </Section>
        <Section>
          <h3 className="title">
            <div className="browser">
              <FaChrome />
              SAFARI
            </div>
            AMOREPACIFIC
          </h3>
          <div className="chart">line chart here!</div>
        </Section>
      </ChartWrapper>
      <LNB />
      <Details />
    </Wrapper>
  );
};

export default Brand;
