import Game from "../models/rankingGame.js";
import User from "../models/user.js";
import Team from "../models/mlbTeam.js";
import MlbGame from "../models/mlbGame.js";
import {HttpError} from "../HttpError.js";

const getGameRoute = async (req, res, next)=>{
    try{
        const game = await getGame(req.params.rankingGameId);
        isPlayerOrOwner(game, res.locals.user);
        res.json(responseGame(game));
    }catch(e){next(e)}
}

const getWinsRoute = async (req, res, next)=>{
    try{
        const game = await getGame(req.params.rankingGameId);
        isPlayerOrOwner(game, res.locals.user);
        const teams = await getTeams(game.league);
        const teamWins = await getTeamWins(teams, game.season, game.part);
        res.json(teamWins);
    }catch(e){next(e)}
}

const createGameRoute = async (req, res, next)=>{
    try{
        const game = createGame(req.body, res.locals.user);
        await game.save();
        res.json(responseGame(game));
    }catch(e){next(e)}
}

const joinRequestRoute = async (req, res, next)=>{
    try{
        const game = await getGame(req.params.rankingGameId);
        checkJoinByDate(game);
        checkForPlayer(game, res.locals.user);
        game.joinRequests.push(res.locals.user._id);
        await game.save();
        res.json({success: true});
    }catch(e){next(e)}
}

const acceptRequestRoute = async (req, res, next)=>{
    try{
        const gamePromise = getGame(req.params.rankingGameId);
        const userPromise = getUser(req.body.user);
        const [game, user] = await Promise.all([gamePromise, userPromise]);
        checkOwnership(game, res.locals.user);
        acceptJoinRequest(game, user);
        await game.save();
        res.json({success: true});
    }catch(e){next(e)}
}

const createPicksRoute = async (req, res, next)=>{
    try{
        const game = await getGame(req.params.rankingGameId);
        const player = getPlayer(game, res.locals.user);
        if(player.picks.length > 0) throw new HttpError(401, "You have already made your picks");
        player.picks = req.body.picks;
        await game.save();
        res.json(responseGame(game));
    }catch(e){next(e)}
}

/*
 Retrieve a game from the database
 Throws error if game doesn't exist
 @param {String} id - ID of the game
 @return {Game} Game object
 */
const getGame = async (id)=>{
    const game = await Game.findOne({_id: id});
    if(!game) throw new HttpError(401, "No Ranking Game with this ID");
    return game;
}

/*
 Retrieve a user form the database
 Throws error if user doesn't exist
 @param {String} id - User ID
 @return {User} User object
 */
const getUser = async (id)=>{
    const user = await User.findOne({_id: id});
    if(!user) throw new HttpError(401, "No user with this id");
    return user;
}

/*
 Retrieve list of teams
 @param {String} league - League to get teams from. "all" for both leagues
 @return {[Team]} Array of Teams
 */
const getTeams = async (league)=>{
    let teams = [];
    if(league === "all"){
        teams = await Team.find({});
    }else{
        teams = await Team.find({league: league})
    }
    return teams;
}

/*
 Create a new game
 @param {Object} data - Data from the request
 @param {User} user - User object
 @return {Game} Ranking Game object
 */
const createGame = (data, user)=>{
    return new Game({
        players: [],
        owner: user._id,
        season: data.season,
        part: data.part,
        joinRequests: [],
        league: data.league,
        joinByDate: new Date(data.joinByDate)
    });
}

/*
 Throw error if user is in game already
 @param {Game} game - Game object
 @param {User} user = User object
 */
const checkForPlayer = (game, user)=>{
    let userExists = false;
    if(game.players.find(g => g.id.toString() == user._id.toString())){
        throw new HttpError(401, "You are already in this game");
    }
    if(game.joinRequests.find(r => r.toString() === user._id.toString())){
        throw new HttpError(401, "You have already requested to join this game");
    }
}

/*
 Throws error if too late to join game
 @param {Game} game - Game object
 */
const checkJoinByDate = (game)=>{
    const now = new Date();
    const joinByDate = new Date(game.joinByDate);
    if(joinByDate < now) throw new HttpError(401, "Too late to join this game");
}

/*
 Throw error if user is not owner of game
 @param {Game} game - Game object
 @param {User} user - User object
 */
const checkOwnership = (game, user)=>{
    if(game.owner.toString() !== user._id.toString()){
        throw new HttpError(401, "Forbidden");
    }
}

/*
 Move a user from requested to join, to a player
 @param {Game} game - Game object
 @param {User} user - User object
 @return {Game} Updated game object
 */
const acceptJoinRequest = (game, user)=>{
    const userId = user._id.toString();
    let exists = false;
    for(let i = 0; i < game.joinRequests.length; i++){
        if(game.joinRequests[i].toString() === userId){
            exists = true;
            game.joinRequests.splice(i, 1);
            break;
        }
    }
    if(!exists) throw new HttpError(401, "No request for that user");

    game.players.push({
        user: userId,
        name: user.name,
        picks: []
    });

    return game;
}

/*
 Retrieve player from the Game
 Throw error if no player
 @param {Game} game - Game object
 @param {User} user - User object
 @return {Object} Player from the game object
 */
const getPlayer = (game, user)=>{
    const player = game.players.find(p => p.user.toString() === user._id.toString());
    if(!player) throw new HttpError(401, "You have not joined this game");
    return player;
}

/*
 Throw error if user is not allowed access to game
 @param {Game} game - Game object
 @param {User} user - User object
 */
const isPlayerOrOwner = (game, user)=>{
    const userId = user._id.toString();
    if(
        !game.players.find(p => p.user.toString() === userId) &&
        game.owner.toString() !== userId
    ) throw new HttpError(403, "Forbidden");
}

/*
 Check all games for team wins
 Format data to list of teams with: id, name, location, league, wins
 @param {[Team]} teams - List of team objects
 @param {Number} season - Season (year)
 @param {String} part - "full", "firstHalf", "secondHalf"
 @return {[Object]} Array of modified Team objects
 */
const getTeamWins = async (teams, season, part)=>{
    const startDate = new Date(season, 0, 0);
    const endDate = new Date(season + 1, 0, 0);
    const promises = [];
    for(let i = 0; i < teams.length; i++){
        const teamPromise = MlbGame.aggregate([
            {$match: {
                $or: [{"homeTeam.team": teams[i]._id}, {"awayTeam.team": teams[i]._id}],
                date: {$gte: startDate, $lt: endDate},
            }},
            {$sort: {date: -1}}
        ])
            .then((games)=>{
                const firstGame= part === "secondHalf" ? 81 : 0;
                const lastGame = part === "firstHalf" ? 81 : games.length;

                return {
                    id: teams[i]._id.toString(),
                    name: teams[i].name,
                    location: teams[i].location,
                    league: teams[i].league,
                    wins: calculateWins(games.slice(firstGame, lastGame), teams[i]._id.toString())
                };
            })
            .catch((err)=>{
                console.log(err);
            });

        promises.push(teamPromise);
    }

    return await Promise.all(promises);
}

const calculateWins = (games, teamId)=>{
    let wins = 0;
    for(let i = 0; i < games.length; i++){
        if(games[i].homeTeam.team.toString() === teamId){
            if(games[i].homeTeam.runs > games[i].awayTeam.runs) wins++;
        }else{
            if(games[i].awayTeam.runs > games[i].homeTeam.runs) wins++;
        }
    }

    return wins;
}

/*
 Create modified game object for frontend
 @param {Game} game - Game object
 @return {Object} Modified game object
 */
const responseGame = (game)=>{
    return {
        id: game._id.toString(),
        players: game.players,
        owner: game.owner.toString(),
        season: game.season,
        part: game.part
    };
}

export {
    getGameRoute,
    getWinsRoute,
    createGameRoute,
    joinRequestRoute,
    acceptRequestRoute,
    createPicksRoute
}
