import auth from "../auth.js";
import {
    createGameRoute,
    joinRequestRoute,
    acceptRequestRoute
} from "../controllers/rankingGame.js";

const rankingGameRoutes = (app)=>{
    app.post("/rankinggame", auth("createGame"), createGameRoute);
    app.put("/rankinggame/:rankingGameId/join", auth(), joinRequestRoute);
    app.put("/rankinggame/:rankingGameId/accept", auth("createGame"), acceptRequestRoute);
}

export default rankingGameRoutes;
