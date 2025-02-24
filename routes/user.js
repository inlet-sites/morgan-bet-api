import {
    createUserRoute
} from "../controllers/user.js";

const userRoutes = (app)=>{
    app.post("/user", createUserRoute);
}

export default userRoutes;
