import Team from "../models/mlbTeam.js";

const getTeamsRoute = async (req, res, next)=>{
    try{
        const teams = await getTeamsByLeague(req.query.league);
        res.json(responseTeams(teams));
    }catch(e){next(e)}
}

/*
 Retrieve list of teams by league
 @param {String} league - League name or "all"
 @return {[Team]} List of teams
 */
const getTeamsByLeague = async (league)=>{
    league = league.toLowerCase();
    let teams = [];
    if(league === "all"){
        teams = await Team.find({});
    }else{
        teams = await Team.find({league: league});
    }

    return teams;
}

/*
 Format list of teams for response to frontend
 @param {[Team]}
 */
const responseTeams = (teams)=>{
    const responseTeams = [];
    for(let i = 0; i < teams.length; i++){
        responseTeams.push({
            id: teams[i]._id.toString(),
            name: teams[i].name,
            location: teams[i].location,
            league: teams[i].league,
            division: teams[i].division
        });
    }

    return responseTeams;
}

export {
    getTeamsRoute
}
