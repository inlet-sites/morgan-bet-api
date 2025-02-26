import RankingGame from "../models/rankingGame.js";
import {HttpError} from "../HttpError.js";
import validate from "../validation/rankingGame.js";
import axios from "axios";

const getTeamsRoute = async (req, res, next)=>{
    try{
        const teams = await getTeamData(req.params.league);
        res.json(teams);
    }catch(e){next(e)}
}

const createGameRoute = async (req, res, next)=>{
    try{
        validate(req.body);
        const rankingGame = await createRankingGame(req.body, res.locals.user._id);
        await rankingGame.save();
        res.json(responseRankingGame(rankingGame));
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
 Create RankingGame object
 @param {Object} data - Body data
 @param {ObjectId} owner - ID of the user that owns the game
 @return {RankingGame} RankingGame object
 */
const createRankingGame = async (data, owner)=>{
    const rankingGame = new RankingGame({
        players: [],
        owner: owner,
        teams: await createTeamsData(data.teams, data.gamesCount)
    });
    console.log(rankingGame);

    return rankingGame;
}

/*
 Fetch necessary games data from the API
 Format that data into data for our database
 @param {[Object]} teams - Teams data from the request body
 @param {Number} gamesCount - Number of games to add to Ranking Game
 @return {[Object]} Formatted teams data for the database
 */
const createTeamsData = async (teams, gamesCount)=>{
    const gamesPromises = [];
    for(let i = 0; i < teams.length; i++){
        const from = new Date(teams[i].startDate);
        const to = new Date(teams[i].startDate);
        to.setFullYear(to.getFullYear() + 1);

        let url = "https://api.balldontlie.io/mlb/v1/games?"
        url += `per_page=${gamesCount}`;
        url += `&seasons[]=2025`;
        //url += `&dates[]=${formatDate(from)}&dates[]=${formatDate(to)}`;
        url += `&team_ids[]=${teams[i].apiId}`;

        const promise = axios({
            method: "get",
            url: url,
            headers: {
                "Content-Type": "application/json",
                Authorization: process.env.SPORTAPI_KEY
            }
        });
        gamesPromises.push(promise);
    }

    const games = await Promise.all(gamesPromises);
    return formatTeamData(teams, games);
}

/*
 For the team data for database from user data and API data
 @param {[Object]} teams - Teams data from the request body
 @param {[Object]} games - Games data for the teams from the API
 @return {[Object]} Formatted teams data for the database
 */
const formatTeamData = (teams, games)=>{
    const newTeamsData = [];
    for(let i = 0; i < teams.length; i++){
        let teamData = {};
        const firstGame = games[i].data.data[0];
        if(firstGame.home_team.id === teams[i].apiId){
            teamData = firstGame.home_team;
        }else{
            teamData = firstGame.away_team;
        }

        const data = {
            apiId: teams[i].apiId,
            name: teamData.name,
            location: teamData.location,
            games: []
        };

        for(let j  = 0; j  < 81; j++){
            const thisGame = games[i].data.data[j];
            const game = {
                apiId: thisGame.id,
                date: new Date(thisGame.date),
            }
            data.games.push(game);
        }
        newTeamsData.push(data);
    }
    return newTeamsData;
}

/*
 Creates a yyy-mm-dd formate from a date object
 @param {Date} date - Date object
 @return {String} Formatted date
 */
const formatDate = (date)=>{
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = (date.getDate()).toString().padStart(2, "0");
    return `${date.getFullYear()}-${month}-${day}`;
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

/*
 Creates data for response from a RankingGame
 @param {RankingGame} game - RankingGame object
 @return {Object} Modified RankingGame
 */
const responseRankingGame = (game)=>{
    const responseGame = {
        id: game._id.toString(),
        players: game.players,
        owner: game.owner.toString(),
        teams: []
    };

    for(let i = 0; i < game.teams.length; i++){
        const wins = 0;
        for(let j = 0; j < game.teams[i].games.length; j++){
            if(game.teams[i].games[j].win) wins++;
        }

        responseGame.teams.push({
            id: game.teams[i]._id.toString(),
            name: game.teams[i].name,
            location: game.teams[i].location,
            wins: wins
        });
    }

    return responseGame;
}

export {
    getTeamsRoute,
    createGameRoute
}
