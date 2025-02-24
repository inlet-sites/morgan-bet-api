import {HttpError} from "../HttpError.js";

export default (data)=>{
    if(data.name) validName(data.name);
    if(data.email) validEmail(data.email);
    if(data.password) validPassword(data.password, data.confirmPassword);
}

const validName = (name)=>{
    if(typeof name !== "string") throw new HttpError(400, "Invalid name");
    if(name.length > 150) throw new HttpError(400, "Invalid name");
}

const validEmail = (email)=>{
    if(typeof email !== "string") throw new HttpError(400, "Invalid email");
    if(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(data.email) !== true){
        throw new HttpError(400, "Invalid email");
    }
}

const validPassword = (pass, confirmPass)=>{
    if(typeof pass !== "string") throw new HttpError(400, "Invalid password");
    if(pass.length < 10) throw new HttpError(400, "Password must contain at least 10 characters");
    if(pass !== confirmPass) throw new HttpError(400, "Passwords do not match");
}
