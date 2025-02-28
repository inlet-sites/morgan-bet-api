import auth from "../auth.js";
import {
    getUserGamesRoute,
    getGameRoute,
    getTeamsRoute,
    createGameRoute,
    joinRequestRoute,
    acceptRequestRoute,
    createPicksRoute
} from "../controllers/rankingGame.js";

const rankingGameRoutes = (app)=>{
    app.get("/rankinggame", auth(), getUserGamesRoute);
    app.get("/rankinggame/:rankingGameId", auth(), getGameRoute);
    app.get("/rankinggame/:rankingGameId/team", auth(), getTeamsRoute);
    app.post("/rankinggame", auth("createGame"), createGameRoute);
    app.put("/rankinggame/:rankingGameId/join", auth(), joinRequestRoute);
    app.put("/rankinggame/:rankingGameId/accept", auth("createGame"), acceptRequestRoute);
    app.put("/rankinggame/:rankingGameId/picks", auth(), createPicksRoute);
}

export default rankingGameRoutes;
