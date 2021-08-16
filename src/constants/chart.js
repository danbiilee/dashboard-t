export const CHART_COLORS = [
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
];

export const INIT_OPTIONS = {
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
    useHTML: true,
    formatter: function () {
      // 기능테스트에만 적용
      const points = this.points;
      points.sort((a, b) => b.y - a.y);

      const passList = [];
      const failList = [];
      for (let p of points) {
        if (!p.series.name.includes("Fail")) passList.push(p);
      }

      // passList 순서에 따라 failList 구하기
      for (let pass of passList) {
        const fail = points.find(
          (p) =>
            p.series.name.includes("Fail") &&
            p.series.name.includes(pass.series.name.split("(Pass)")[0])
        );
        failList.push(fail);
      }

      // 합계 추가
      for (let pass of passList) {
        const fail = failList.find((f) =>
          f.series.name.includes(pass.series.name.split("(Pass)")[0])
        );

        pass.total = pass.y + fail.y;
        fail.total = pass.y + fail.y;
      }

      const getHtmlString = (list) => {
        return list.reduce(function (s, point) {
          return `${s} ${point.series.name}: ${point.total}(${point.y})<br/>`;
        }, "");
      };

      let str = getHtmlString(passList);
      str +=
        '<div style="width: 100%; height: 1px; margin: 5px 0; background: #fff;"></div>';
      str += getHtmlString(failList);

      return str;
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
};

export const INIT_SERIES_OPTIONS = {
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
};
