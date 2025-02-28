import mongoose from "mongoose";

const RankingGameSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    players: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        picks: {
            type: [mongoose.Schema.Types.ObjectId],
            required: false
        }
    }],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    season: {
        type: Number,
        required: true
    },
    //enum: "full", "firstHalf", "secondHalf"
    part: {
        type: String,
        required: true
    },
    //enum: "american", "national", "all"
    league: {
        type: String,
        required: true
    },
    joinRequests: {
        type: [mongoose.Schema.Types.ObjectId],
        required: false
    },
    joinByDate: {
        type: Date,
        required: true
    }
});

export default mongoose.model("rankingGame", RankingGameSchema);
