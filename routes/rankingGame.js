import auth from "../auth.js";
import {
    getTeamsRoute,
    createGameRoute
} from "../controllers/rankingGame.js";

const rankedGameRoutes = (app)=>{
    app.get("/rankinggame/teams/:league", auth("createGame"), getTeamsRoute);
    app.post("/rankinggame", auth("createGame"), createGameRoute);
}

export default rankedGameRoutes;
