const csvjson = require("csvjson");
const fs = require("fs");
var sol_dict = {};

function csv_json(csvFile) {
  //converts csv to json
  var options = {
    delimiter: ",",
    quote: '"',
  };

  var file_data = fs.readFileSync(csvFile, {
    encoding: "utf8",
  });
  var result = csvjson.toObject(file_data, options);
  let data = JSON.stringify(result, null, 2);
  return result;
}

function total_run_scored(outputFile) {
  //this function calculates  teams and their corresponding total score
  var user_dict = {};
  var user_list = [];
  reader = csv_json("./data/deliveries.csv");
  for (obj of reader) {
    if (obj.batting_team in user_dict) {
      user_dict[obj.batting_team] += Number(obj.total_runs);
    } else {
      user_dict[obj.batting_team] = Number(obj.total_runs);
    }
  }
  user_list.push(user_dict);
  sol_dict["runs_team"] = user_list;
  let data = JSON.stringify(sol_dict, null, 2);
  fs.writeFile(outputFile, data, (err) => {
    if (err) throw err;
    console.log("Data written to file");
  });
}

function player_scores(outputFile) {
  //This function calculates players of Royal Challengers Banglore and their scores
  var user_dict = {};
  var user_list = [];
  reader = csv_json("./data/deliveries.csv");
  for (obj of reader) {
    if (obj.batting_team == "Royal_Challengers_Bangalore") {
      if (obj.batsman in user_dict)
        user_dict[obj.batsman] += Number(obj.total_runs);
      else user_dict[obj.batsman] = Number(obj.total_runs);
    }
  }
  user_list.push(user_dict);
  sol_dict["players_scores"] = user_list;
  let data = JSON.stringify(sol_dict, null, 2);
  fs.writeFile(outputFile, data, (err) => {
    if (err) throw err;
    console.log("Data written to file");
  });
}

function umpire_country(outputFile) {
  //this function plots computes the number of foreign umpires wrt their nationality
  var user_dict = {};
  var user_list = [];
  reader = csv_json("./data/umpires.csv");
  for (obj of reader) {
    if (obj.Nationality == "India") continue;
    else {
      if (obj.Nationality in user_dict) user_dict[obj.Nationality]++;
      else user_dict[obj.Nationality] = 1;
    }
  }
  user_list.push(user_dict);
  sol_dict["umpire_country"] = user_list;
  let data = JSON.stringify(sol_dict, null, 2);
  fs.writeFile(outputFile, data, (err) => {
    if (err) throw err;
    console.log("Data written to file");
  });
}

function games_teams_season(outputFile) {
  //this function computes the number of matches played by teams by seasons
  var user_dict = {};
  var user_list = [];
  reader = csv_json("./data/matches.csv");
  for (obj of reader) {
    if (obj.season in user_dict) {
      if (obj.team1 in user_dict[obj.season])
        user_dict[obj.season][obj.team1]++;
      else user_dict[obj.season][obj.team1] = 1;

      if (obj.team2 in user_dict[obj.season]) {
        user_dict[obj.season][obj.team2]++;
      } else user_dict[obj.season][obj.team2] = 1;
    } else {
      user_dict[obj.season] = {};
      if (obj.team1 in user_dict[obj.season])
        user_dict[obj.season][obj.team1]++;
      else user_dict[obj.season][obj.team1] = 1;

      if (obj.team2 in user_dict[obj.season]) {
        user_dict[obj.season][obj.team2]++;
      } else user_dict[obj.season][obj.team2] = 1;
    }
  }
  user_list.push(user_dict);
  sol_dict["team_season"] = user_dict;
  let data = JSON.stringify(sol_dict, null, 2);
  fs.writeFile(outputFile, data, (err) => {
    if (err) throw err;
    console.log("Data written to file");
  });
}
total_run_scored("./data.json");
player_scores("./data.json");
umpire_country("./data.json");
games_teams_season("./data.json");
