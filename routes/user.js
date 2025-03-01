import auth from "../auth.js";
import {
    createUserRoute,
    getTokenRoute,
    getUserRoute
} from "../controllers/user.js";

const userRoutes = (app)=>{
    app.post("/user", createUserRoute);
    app.post("/user/token", getTokenRoute);
    app.get("/user", auth(), getUserRoute);
}

export default userRoutes;
