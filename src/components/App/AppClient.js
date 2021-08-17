import React, { useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Route, useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchFunctionTests } from "../../redux/functionTestSlice";
import Header from "../../containers/Header";
import Main from "../../containers/Main";
import Mall from "../../pages/Mall";
import Brand from "../../pages/Brand";
import Response from "../../pages/Response";
import UserService from "../../service/UserService";
import "@progress/kendo-theme-material/dist/all.scss";
import "../../assets/scss/main.scss";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 1420px;
  height: 100%;
  background-color: #f8f9fa;
  background-color: yellow;
`;

const AppClient = ({ userService }) => {
  const history = useHistory();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const {
    inputs: { level2, level3, startDate, endDate },
  } = useSelector((state) => state.control);

  useEffect(() => {
    pathname !== "/" && history.push("/"); // url 초기화
    dispatch(
      fetchFunctionTests({
        refType: "chart",
        // Test
        params: {
          type: level2.menuId,
          applicationName: "Epr",
          dates: [startDate, endDate],
        },
        // params: {
        //   type: level2.menuId,
        //   applicationName: level3.menuId,
        //   dates: [startDate, endDate],
        // },
      })
    );
  }, []);

  return (
    <Wrapper>
      <Header />
      <Main userService={userService}>
        <Route
          exact
          path="/"
          render={() => <Mall userService={userService} />}
        />
        <Route
          path="/brand"
          render={() => <Brand userService={userService} />}
        />
        <Route
          path="/response"
          render={() => <Response userService={userService} />}
        />
      </Main>
    </Wrapper>
  );
};

AppClient.propTypes = {
  userService: PropTypes.instanceOf(UserService),
};

export default AppClient;
