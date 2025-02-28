import mongoose from "mongoose";
import axios from "axios";
import Team from "../models/mlbTeam.js";

let mongoString = "mongodb://127.0.0.1/morganbet";
if(process.env.NODE_ENV === "product"){
    mongoString = `mongodb://website:${process.env.MONGODB_PASS}@127.0.0.1:27017/morganbet?authSource=admin`;
}
mongoose.connect(mongoString);

axios({
    method: "get",
    url: "https://api.balldontlie.io/mlb/v1/teams",
    headers: {
        "Content-Type": "application/json",
        Authorization: process.env.SPORTAPI_KEY
    }
})
    .then((response)=>{
        const teams = response.data.data;
        const dbTeams = [];

        for(let i = 0; i < teams.length; i++){
            const newTeam = new Team({
                apiId: teams[i].id,
                name: teams[i].name,
                location: teams[i].location,
                league: teams[i].league.toLowerCase(),
                division: teams[i].division.toLowerCase()
            });

            dbTeams.push(newTeam.save());
        }

        return Promise.all(dbTeams);
    })
    .then((response)=>{
        console.log("All teams added");
    })
    .catch((err)=>{
        console.error(err);
    });
