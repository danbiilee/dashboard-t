import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import App from "../src/components/App";
import { theme } from "./utils/theme";

ReactDOM.render(
  <HashRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
  </HashRouter>,
  document.getElementById("root")
);
