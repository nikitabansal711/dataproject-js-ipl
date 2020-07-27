//problem 4: plotting graph between number of matches by teams by season

document.addEventListener("DOMContentLoaded", function () {
  fetch("https://my-json-server.typicode.com/nikitabansal711/team_season/db")
    .then((response) => response.json())
    .then((data) => {
      data = data["team_season"];
      let obj = data;
      console.log(obj);
      let seasons = [];
      let season_values = [];
      seasons = Object.keys(obj);
      season_values = Object.values(obj);
      console.log(season_values);
      let data_list = [];
      let data_dict = {};
      let teams_set = new Set();
      for (obj of season_values) {
        for (key of Object.keys(obj)) teams_set.add(key);
      }
      teams_list = Array.from(teams_set);
      for (var team of teams_list) {
        for (obj of season_values) {
          let temp = Object.keys(obj);
          if (temp.includes(team) == true) {
            if (team in data_dict) {
              data_dict[team].push(obj[team]);
            } else {
              data_dict[team] = [];
              data_dict[team].push(obj[team]);
            }
          } else {
            if (team in data_dict) {
              data_dict[team].push(0);
            } else {
              data_dict[team] = [];
              data_dict[team].push(0);
            }
          }
        }
      }

      console.log(data_dict);
      let teams = Object.keys(data_dict);
      let num_matches = Object.values(data_dict);
      let solution_list = [];
      for (var i = 0; i < teams.length; i++) {
        let sol_dict = {};
        sol_dict["name"] = teams[i];
        sol_dict["data"] = num_matches[i];
        solution_list.push(sol_dict);
      }
      console.log(solution_list);
      Highcharts.chart("container", {
        chart: {
          type: "column",
        },
        title: {
          text: "Number of matches played by teams by season",
        },
        xAxis: {
          categories: seasons,
        },
        yAxis: {
          min: 0,
          title: {
            text: "Number of matches",
          },
          stackLabels: {
            enabled: true,
            style: {
              fontWeight: "bold",
              color:
                // theme
                (Highcharts.defaultOptions.title.style &&
                  Highcharts.defaultOptions.title.style.color) ||
                "gray",
            },
          },
        },
        legend: {
          align: "right",
          x: -30,
          verticalAlign: "top",
          y: 25,
          floating: true,
          backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || "white",
          borderColor: "#CCC",
          borderWidth: 1,
          shadow: false,
        },
        tooltip: {
          headerFormat: "<b>{point.x}</b><br/>",
          pointFormat: "{series.name}: {point.y}<br/>",
        },
        plotOptions: {
          column: {
            stacking: "normal",
            dataLabels: {
              enabled: true,
            },
          },
        },
        series: solution_list,
      });
    });
});
