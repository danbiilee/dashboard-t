window.CONFIG_CHART = {
  COLORS: [
    "#2F56A7",
    "#118CC5",
    "#9463CE",
    "#54B133",
    "#D5A403",
    "#8B9BBC",
    "#79AAC1",
    "#9585A8",
    "#9585A8",
    "#907870",
    "#87aeed",
    "#42b0b8",
    "#d99be8",
    "#d18cb4",
    "#d1cf8c",
    "#d9b17e",
  ],
  INIT_OPTIONS: {
    chart: {
      type: "line",
      reflow: true,
      plotBorderWidth: 1,
      margin: [30, 30, 90, 60],
    },
    credits: {
      enabled: false,
    },
    title: {
      text: undefined,
    },
    yAxis: {
      title: {
        text: undefined,
      },
      labels: {
        style: {
          color: "#6D6F77",
          fontWeight: "normal",
          fontSize: "13px",
        },
      },
    },
    xAxis: {
      type: "datetime",
      labels: {
        enabled: true,
        style: {
          color: "#6D6F77",
          fontWeight: "normal",
          fontSize: "13px",
        },
      },
      tickLength: 0,
      tickInterval: 1,
      minPadding: 0,
      maxPadding: 0,
      startOnTick: true,
      endOnTick: true,
      gridLineWidth: 1,
      gridLineColor: "#d1d4d9",
    },
    tooltip: {
      shared: true,
      backgroundColor: "#2F56A7",
      style: {
        color: "#fff",
        fontWeight: "normal",
      },
      formatter: function () {
        return this.points.reduce(function (s, point) {
          return s + "<br/>" + point.series.name + ": " + point.y;
        }, "");
      },
    },
    legend: {
      symbolWidth: 30,
      itemStyle: {
        color: "#6D6F77",
        fontWeight: "normal",
        fontSize: "13px",
      },
    },
    series: [],
  },
  INIT_SERIES_OPTIONS: {
    name: "",
    color: "",
    marker: {
      symbol: "circle",
      radius: 3,
      fillColor: "#fff",
      lineWidth: 2,
      lineColor: "",
    },
    data: [],
  },
};
