import Game from "../models/rankingGame.js";

const createGameRoute = async (req, res, next)=>{
    try{
        const game = createGame(req.body, res.locals.user);
        await game.save();
        res.json(responseGame(game));
    }catch(e){next(e)}
}

export {
    createGameRoute
}
