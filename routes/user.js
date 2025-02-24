import auth from "../auth.js";
import {
    createUserRoute,
    getUserRoute
} from "../controllers/user.js";

const userRoutes = (app)=>{
    app.post("/user", createUserRoute);
    app.get("/user/:userId", auth(), getUserRoute);
}

export default userRoutes;
