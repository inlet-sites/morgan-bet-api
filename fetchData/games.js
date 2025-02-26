import mongoose from "mongoose";
import axios from "axios";
import Team from "../models/team.js";
import Game from "../models/game.js";

let mongoString = "mongodb://127.0.0.1/morganbet";
if(process.env.NODE_ENV === "product"){
    mongoString = `mongodb://website:${process.env.MONGODB_PASS}@127.0.0.1:27017/morganbet?authSource=admin`;
}
mongoose.connect(mongoString);

const season = 2025;
axios({
    method: "get",
    url: `https://api.balldontlie.io/mlb/v1/games?seasons[]=2025`,
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
                homeTeam: {team: homeTeam._id},
                awayTeam: {team: awayTeam._id}
            });

            dbGames.push(game.save());
        }

        return Promise.all(dbGames);
    })
    .then((response)=>{
        console.log("Games all downloaded");
    })
    .catch((err)=>{
        console.error(err);
    });
