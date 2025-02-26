import mongoose from "mongoose";

const RankingGameSchema = new mongoose.Schema({
    players: [{
        id: {
            type: mongoose.Schema.Types.ObjectId,
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
    }
});

export default mongoose.model("rankingGame", RankingGameSchema);
