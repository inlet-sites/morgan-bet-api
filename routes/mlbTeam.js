import auth from "../auth.js";
import {
    getTeamsRoute
} from "../controllers/mlbTeam.js";

const mlbTeamRoutes = (app)=>{
    app.get("/mlb/team?*", auth(), getTeamsRoute);
}

export default mlbTeamRoutes;
