import mongoose from "mongoose";

const UserSchema  = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    uuid: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        required: true
    },
    permissions: [String],
});

export default mongoose.model("user", UserSchema);
