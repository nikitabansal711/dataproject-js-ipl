document.addEventListener("DOMContentLoaded", function () {
  fetch("https://my-json-server.typicode.com/nikitabansal711/umpire_country/db")
    .then((response) => response.json())
    .then((data) => {
      data = data["umpire_country"];
      let obj;
      for (obj of data) JSON.stringify(obj);
      let countries = Object.keys(obj);
      let num = Object.values(obj);
      let data_list = [];
      Highcharts.chart("container", {
        chart: {
          type: "column",
        },
        title: {
          text: "NUMBER OF NON-INDIAN UMPIRES",
        },
        xAxis: {
          type: "category",
          labels: {
            rotation: -45,
            style: {
              fontSize: "13px",
              fontFamily: "Verdana, sans-serif",
            },
          },
        },
        yAxis: {
          min: 0,
          title: {
            text: "number of umpires",
          },
        },
        legend: {
          enabled: false,
        },
        tooltip: {
          pointFormat: "Number of umpires: <b>{point.y:.1f}</b>",
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
