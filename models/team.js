import mongoose from "mongoose";

const MlbTeamSchema = new mongoose.Schema({
    apiId: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    league: {
        type: String,
        required: true
    },
    division: {
        type: String,
        required: true
    }
});

export default mongoose.model("mlbTeam", MlbTeamSchema);
