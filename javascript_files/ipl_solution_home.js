//problem 1: plotting graph between teams and corresponding total runs

document.addEventListener("DOMContentLoaded", function () {
    fetch("https://my-json-server.typicode.com/nikitabansal711/demo/db")
      .then((response) => response.json())
      .then((data) => {
        data = data["runs_team"];
        let obj;
        for (obj of data) JSON.stringify(obj);
        let teams = Object.keys(obj);
        let scores = Object.values(obj);
        let data_list = [];
        Highcharts.chart("container", {
          chart: {
            type: "column",
          },
          title: {
            text: "TEAMS VS SCORES",
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
            pointFormat: "Total runs: <b>{point.y:.1f}</b>",
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
