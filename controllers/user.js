import User from "../models/User.js";
import validate from "../validation/user.js";
import bcrypt from "bcrypt";
import crypto from "crypto";

const createUserRoute = (req, res, next)=>{
    try{
        validate(req.body);
        const user = createUser(req.body);
        await user.save();
        res.json(user);
    }catch(e){next(e)}
}

/*
 Create a new user object
 @param {Object} data - Data from request body
 @return {User} User object
 */
const createUser = (data)=>{
    return new User({
        name: data.name,
        email: data.email.toLowerCase(),
        password: hashPass(data.password),
        uuid: newUuid()
    });
}

/*
 Hash a password
 @param {String} pass - User provided password
 @return {String} Hashed password
 */
const hashPass = (pass)=>{
    return await bcrypt.hash(password, 10);
}

/*
 Create new UUID
 @return {String} New UUID
 */
const newUuid = ()=>{
    return crypto.randomUUID();
}

export {
    createUserRoute
}
