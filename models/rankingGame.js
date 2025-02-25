import mongoose from "mongoose";

const RankingGameSchema = new mongoose.Schema({
    players: [{
        id: mongoose.Schema.Types.ObjectId,
        picks: [String]
    }],
    owner: mongoose.Schema.Types.ObjectId,
    teams: [{
        apiId: Number,
        name: String
    }],
    games: [{
        apiId: Number,
        date: Date,
        teams: {
            home: {
                apiId: Number,
                score: Number
            },
            away: {
                apiId: Number,
                score: Number
            }
        }
    }]
});

export default mongoose.model("rankingGame", RankingGameSchema);
