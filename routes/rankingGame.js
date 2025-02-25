import auth from "../auth.js";
import {
    getTeamsRoute
} from "../controllers/rankingGame.js";

const rankedGameRoutes = (app)=>{
    app.get("/rankedgame/teams/:league", auth("createGame"), getTeamsRoute);
}

export default rankedGameRoutes;
