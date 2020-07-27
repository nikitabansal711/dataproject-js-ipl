//problem 2: plotting graph between players and corresponding total runs

document.addEventListener("DOMContentLoaded", function () {
  fetch("https://my-json-server.typicode.com/nikitabansal711/players_scores/db")
    .then((response) => response.json())
    .then((data) => {
      data = data["players_scores"];
      let obj;
      for (obj of data) JSON.stringify(obj);
      let players = Object.keys(obj);
      let scores = Object.values(obj);
      let data_list = [];
      Highcharts.chart("container", {
        chart: {
          type: "column",
        },
        title: {
          text: "Players vs scores of Royal challengers",
        },
        xAxis: {
          type: "category",
          labels: {
            rotation: -90,
            style: {
              fontSize: "13px",
              fontFamily: "Verdana, sans-serif",
            },
          },
        },
        yAxis: {
          min: 0,
          title: {
            text: "Scores",
          },
        },
        legend: {
          enabled: false,
        },
        tooltip: {
          pointFormat: "total runs: <b>{point.y:.1f}</b>",
        },
        series: [
          {
            data: Object.entries(obj),
            dataLabels: {
              enabled: true,
              rotation: -90,
              color: "#FFFFFF",
              align: "right",
              format: "{point.y:.1f}",
              y: 10,
              style: {
                fontSize: "13px",
                fontFamily: "Verdana, sans-serif",
              },
            },
          },
        ],
      });
    });
});
