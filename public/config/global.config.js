window.IS_LOCAL = false;
window.CONFIG_GLOBAL = {
  NODE_ENV: "",
  BASE_URL: {
    development: window.IS_LOCAL
      ? "http://localhost:3000/data"
      : "http://192.168.10.65:9003/gaservice/rest/tsquare",
    production: "https://b2cmondash.amorepacific.com/gaservice/rest/tsquare",
  },
  REST_URL: {
    chart: {
      development: window.IS_LOCAL ? "tsquare.json" : "fuction/chart",
      production: "fuction/chart",
    },
    detail: {
      development: window.IS_LOCAL ? "detail.json" : "fuction/detail",
      production: "fuction/detail",
    },
    responseTime: {
      development: window.IS_LOCAL ? "response.json" : "responseTime/total",
      production: "responseTime/total",
    },
    test: {
      development: "test",
      production: "test",
    },
    excel: {
      functionTest: {
        development: "excelDownload",
        production: "excelDownload",
      },
      responseTime: {
        development: "responseTime/excelDownload",
        production: "responseTime/excelDownload",
      },
    },
  },
  B2C_DASH_URL: "https://b2cmondash.amorepacific.com/dashboard/view.do?no=2644",
  DATA_KEY: {
    development: window.IS_LOCAL ? "items" : "metricData",
    production: "metricData",
  },
};
