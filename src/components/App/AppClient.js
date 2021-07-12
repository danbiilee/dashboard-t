import React, { useEffect } from "react";
import { Route, useLocation, useHistory } from "react-router-dom";
import "@progress/kendo-theme-material/dist/all.scss";
import "@style/main.scss";
import styled from "styled-components";
import Header from "../../containers/Header";
import Main from "../../containers/Main";
import Mall from "../../pages/Mall";
import Brand from "../../pages/Brand";
import Response from "../../pages/Response";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  min-width: 1790px;
  min-height: 970px;
  height: 100%;
  background-color: #f8f9fa;
`;

const AppClient = () => {
  const history = useHistory();
  const { pathname } = useLocation();

  useEffect(() => {
    // 페이지 새로고침 됐을 때(첫 마운트) url 초기화
    pathname !== "/" && history.push("/");
  }, []);

  return (
    <Wrapper>
      <Header />
      <Main>
        <Route exact path="/" component={Mall} />
        <Route path="/brand" component={Brand} />
        <Route path="/response" component={Response} />
      </Main>
    </Wrapper>
  );
};

export default AppClient;
