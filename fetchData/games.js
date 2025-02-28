import mongoose from "mongoose";
import axios from "axios";
import Team from "../models/mlbTeam.js";
import Game from "../models/mlbGame.js";

let mongoString = "mongodb://127.0.0.1/morganbet";
if(process.env.NODE_ENV === "product"){
    mongoString = `mongodb://website:${process.env.MONGODB_PASS}@127.0.0.1:27017/morganbet?authSource=admin`;
}
mongoose.connect(mongoString);

const getGames = (season, cursor)=>{
    let url = `https://api.balldontlie.io/mlb/v1/games?seasons[]=${season}&per_page=100&postseason=false`;
    if(cursor) url += `&cursor=${cursor}`;
    axios({
        method: "get",
        url: url,
        headers: {
            "Content-Type": "application/json",
            Authorization: process.env.SPORTAPI_KEY
        }
    })
        .then(async (response)=>{
            const games = response.data.data;
            const dbGames = [];

            for(let i = 0; i < games.length; i++){
                const homeTeam = await Team.findOne({apiId: games[i].home_team.id});
                const awayTeam = await Team.findOne({apiId: games[i].away_team.id});
                const game = new Game({
                    apiId: games[i].id,
                    date: new Date(games[i].date),
                    homeTeam : {
                        team: homeTeam._id,
                        ...games[i].home_team_data
                    },
                    awayTeam: {
                        team: awayTeam._id,
                        ...games[i].away_team_data
                    }
                });

                dbGames.push(game.save());
            }

            Promise.all(dbGames);

            if(response.data.meta.next_cursor){
                getGames(season, response.data.meta.next_cursor);
            }else{
                console.log("Games all downloaded");
            }
        })
        .catch((err)=>{
            console.error(err);
        });
}

getGames(2024);
