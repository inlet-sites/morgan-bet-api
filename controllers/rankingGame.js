import Game from "../models/rankingGame.js";

const createGameRoute = async (req, res, next)=>{
    try{
        const game = createGame(req.body, res.locals.user);
        await game.save();
        res.json(responseGame(game));
    }catch(e){next(e)}
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
    createGameRoute
}
