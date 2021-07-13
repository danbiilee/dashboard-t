/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
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
import { useDispatch } from "react-redux";
import { fetchResponses } from "../../redux/responseSlice";
import { fetchFeatures } from "../../redux/featureSlice";
import { globalConfig } from "../../../config/global.config";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  min-width: 1320px;
  height: 100%;
  background-color: #f8f9fa;
`;

const AppClient = () => {
  const history = useHistory();
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    pathname !== "/" && history.push("/"); // url 초기화

    dispatch(fetchResponses());
    dispatch(fetchFeatures());

    // const id = setInterval(() => {
    //   dispatch(fetchResponses());
    //   dispatch(fetchFeatures());
    // }, globalConfig.setInterval * 1000);

    // return () => clearInterval(id);
  }, [dispatch]);

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
