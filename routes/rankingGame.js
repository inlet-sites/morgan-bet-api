import auth from "../auth.js";
import {
    createGameRoute
} from "../controllers/rankingGame.js";

const rankingGameRoutes = (app)=>{
    app.post("/rankinggame", auth("createGame"), createGameRoute);
}

export default rankingGameRoutes;
