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

const acceptRequestRoute = async (req, res, next)=>{
    try{
        const game = await getGame(req.params.rankingGameId);
        checkOwnership(game, res.locals.user);
        acceptJoinRequest(game, req.body.user);
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
 @param {String} userId - ID of the user to accept
 @return {Game} Updated game object
 */
const acceptJoinRequest = (game, userId)=>{
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
        picks: []
    });

    return game;
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
    createGameRoute,
    joinRequestRoute,
    acceptRequestRoute
}
