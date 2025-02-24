import User from "../models/User.js";
import {HttpError} from "../HttpError.js";
import validate from "../validation/user.js";
import bcrypt from "bcrypt";

const createUserRoute = (req, res, next)=>{
    try{
        validate(req.body);
        const pass = hashPass(req.body.password);
        const user = createUser(req.body, pass);
        await user.save();
        res.json(user);
    }catch(e){next(e)}
}

/*
 Hash a password
 @param {String} pass - User provided password
 @return {String} Hashed password
 */
const hashPass = (pass)=>{
    return await bcrypt.hash(password, 10);
}

export {
    createUserRoute
}
