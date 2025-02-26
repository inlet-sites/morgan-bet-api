import {HttpError} from "../HttpError.js";

export default (data)=>{
    if(data.teams) validateTeams(data.teams);
    if(data.gamesCount) validateGamesCount(data.gamesCount);
}

const validateTeams = (teams)=>{
    for(let i = 0; i < teams.length; i++){
        if(!Number.isInteger(teams[i].apiId)) throw new HttpError(401, "Invalid API ID");
        const date = new Date(teams[i].startDate);
        if(isNaN(date.getTime())) throw new HttpError(401, "Invalid start date");
    }
}

const validateGamesCount = (gamesCount)=>{
    if(!Number.isInteger(gamesCount)) throw new HttpError(401, "Invalid game count");
}
