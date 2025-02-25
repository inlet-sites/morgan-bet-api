import RankingGame from "../models/rankingGame.js";
import {HttpError} from "../HttpError.js";
import axios from "axios";

const getTeamsRoute = async (req, res, next)=>{
    try{
        const teams = await getTeamData(req.params.league);
        res.json(teams);
    }catch(e){next(e)}
}

/*
 Fetch team data from API
 @param {String} league - "American" or "National"
 @return {[Object]} A list of team objects from the API
 */
const getTeamData = async (league)=>{
    const teams = await axios({
        method: "get",
        url: `https://api.balldontlie.io/mlb/v1/teams?league=${league}`,
        headers: {
            "Authorization": process.env.SPORTAPI_KEY
        }
    });

    return formatTeams(teams.data.data);
}

/*
 Format team data from the API
 @param {[Object]} teams - Team data from API
 @return {[Object]} Formatted team data
 */
const formatTeams = (teams)=>{
    const data = [];
    for(let i = 0; i < teams.length; i++){
        data.push({
            apiId: teams[i].id,
            name: teams[i].name,
            location: teams[i].location
        });
    }
    return data;
}

export {
    getTeamsRoute
}
