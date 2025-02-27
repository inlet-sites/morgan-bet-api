import Game from "../models/rankingGame.js";
import {HttpError} from "../HttpError.js";

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
 Create modified game object for frontend
 @param {Game} game - Game object
 @return {Object} Modified game object
 */
const responseGame = (game)=>{
    return {
        players: game.players,
        owner: game.owner.toString(),
        season: game.season,
        part: game.part
    };
}

export {
    createGameRoute,
    joinRequestRoute
}
