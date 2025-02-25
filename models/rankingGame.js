import mongoose from "mongoose";

const RankingGameSchema = new mongoose.Schema({
    users: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        picks: {
            type: [String],
            required: false
        }
    },
    teams: [{
        apiId: Number
        name: String
        league: String
    }],
    games: [{
        apiId: Number
        teams: {
            home: {
                id: Number,
                score: Number
            },
            away: {
                id: Number,
                score: Number
            }
        },
        date: Date
    }]
});

export default mongoose.model("rankingGame", RankingGameSchema);
