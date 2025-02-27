import auth from "../auth.js";
import {
    createGameRoute,
    joinRequestRoute
} from "../controllers/rankingGame.js";

const rankingGameRoutes = (app)=>{
    app.post("/rankinggame", auth("createGame"), createGameRoute);
    app.put("/rankinggame/:rankingGameId/join", auth(), joinRequestRoute);
}

export default rankingGameRoutes;
