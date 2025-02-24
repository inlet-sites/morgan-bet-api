import User from "../models/user.js";
import {HttpError} from "../HttpError.js";
import validate from "../validation/user.js";
import bcrypt from "bcrypt";
import crypto from "crypto";

const createUserRoute = async (req, res, next)=>{
    try{
        validate(req.body);
        await uniqueUser(req.body.email.toLowerCase());
        const user = await createUser(req.body);
        await user.save();
        res.json(responseUser(user));
    }catch(e){next(e)}
}

const getTokenRoute = async (req, res, next)=>{
    try{
        const user = await getUserWithEmail(req.body.email);
        comparePassword(user.password, req.body.password);
        const token = createToken(user);
        res.json({token: token});
    }next(e){catch(e)}
}

const getUserRoute = async (req, res, next)=>{
    try{
        res.json(responseUser(res.locals.user));
    }catch(e){next(e)}
}

/*
 Retrieve user by email
 Throws http error if not found
 @param {String} email - User email address
 @return {User} User object
 */
const getUserWithEmail = async (email)=>{
    const user = await User.findOne({email: email.toLowerCase()});
    if(!user) throw new HttpError(401, "No user with that email");
    return user;
}

/*
 Create a new user object
 @param {Object} data - Data from request body
 @return {User} User object
 */
const createUser = async (data)=>{
    return new User({
        name: data.name,
        email: data.email.toLowerCase(),
        password: await hashPass(data.password),
        uuid: newUuid()
    });
}

/*
 Hash a password
 @param {String} pass - User provided password
 @return {String} Hashed password
 */
const hashPass = async (pass)=>{
    return await bcrypt.hash(pass, 10);
}

/*
 Create new UUID
 @return {String} New UUID
 */
const newUuid = ()=>{
    return crypto.randomUUID();
}

/*
 Check if user already exists in database
 Throw http error if user with emailalready exists
 @param {String} email - User email address
 */
const uniqueUser = async (email)=>{
    const user = await User.findOne({email: email});
    if(user !== null) throw new HttpError(400, "User with this email already exists");
}

/*
 Check input password vs saved password
 Throw http error if passwords do not match
 @param {String} hashedPass - Hashed password from database
 @param {String} inputPass - User input password
 */
const comparePassword = async (hashedPass, inputPass)=>{
    const result = await bcrypt.compare(inputPass, hashedPass);
    if(result !== true) throw new HttpError(401, "Invalid credentials");
}

/*
 Create a User object for sending to frontend
 @param {User} user - User object
 @return {Object} Modified User object
 */
const responseUser = (user)=>{
    return {
        id: user._id,
        name: user.name,
        email: user.email,
    };
}


export {
    createUserRoute,
    getTokenRoute,
    getUserRoute
}
