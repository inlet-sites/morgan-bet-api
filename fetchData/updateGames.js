import mongoose from "mongoose";
import axios from "axios";
import Team from "../models/mlbTeam.js";
import Game from "../models/mlbGame.js";

export default async ()=>{
    let mongoString = "mongodb://127.0.0.1/morganbet";
    if(process.env.NODE_ENV === "product"){
        mongoString = `mongodb://website:${process.env.MONGODB_PASS}@127.0.0.1:27017/morganbet?authSource=admin`;
    }
    mongoose.connect(mongoString);

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const date = now.getDate();

    const url = `https://api.balldontlie.io/mlb/v1/games?dates[]=${year}-${month}-${date}`;
    const response = await axios({
        method: "get",
        url: url,
        headers: {
            "Content-Type": "application/json",
            Authorization: process.env.SPORTAPI_KEY
        }
    });

    const games = response.data.data;
    const dbGames = [];

    for(let i = 0; i < games.length; i++){
        const homeTeam = await Team.findOne({apiId: games[i].home_team.id});
        const awayTeam = await Team.findOne({apiId: games[i].away_team.id});
        const game = new Game({
            apiId: games[i].id,
            date: new Date(games[i].date),
            homeTeam: {
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

    await Promise.all(dbGames);
    console.log(`${year}-${month}-${date} downloaded`);
}
