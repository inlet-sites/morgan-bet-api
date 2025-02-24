import User from "../models/User.js";
import {HttpError} from "../HttpError.js";
import validate from "../validation/user.js";

const createUserRoute = (req, res, next)=>{
    try{
        validate(req.body);
        const pass = hashPass(req.body.password);
        const user = createUser(req.body);
        await user.save();
        res.json(user);
    }catch(e){next(e)}
}

export {
    createUserRoute
}
