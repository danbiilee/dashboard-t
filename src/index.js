import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import App from "../src/components/App";
import { theme } from "./utils/theme";
import { store } from "./redux";
import { Provider } from "react-redux";
import UserService from "./service/UserService";

window.CONFIG_GLOBAL.NODE_ENV = process.env.NODE_ENV;
const userService = new UserService();

ReactDOM.render(
  <HashRouter>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App userService={userService} />
      </ThemeProvider>
    </Provider>
  </HashRouter>,
  document.getElementById("root")
);
