import mongoose from "mongoose";

const RankingGameSchema = new mongoose.Schema({
    players: [{
        id: mongoose.Schema.Types.ObjectId,
        picks: [String]
    }],
    owner: mongoose.Schema.Types.ObjectId,
    teams: [{
        apiId: Number,
        name: String,
        location: String,
        games: [{
            apiId: Number,
            date: Date,
            win: Boolean
        }]
    }]
});

export default mongoose.model("rankingGame", RankingGameSchema);
