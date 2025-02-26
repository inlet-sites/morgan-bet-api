import mongoose from "mongoose";

const GameSchema  = new mongoose.Schema({
    apiId: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    homeTeam: {
        team: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        hits: {
            type: Number,
            required: false
        },
        runs: {
            type: Number,
            required: false
        },
        errors: {
            type: Number,
            required: false
        },
        inningScores: {
            type: [Number],
            required: false
        }
    },
    awayTeam: {
        team: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        hits: {
            type: Number,
            required: false
        },
        runs: {
            type: Number,
            required: false
        },
        errors: {
            type: Number,
            required: false
        },
        inningScores: {
            type: [Number],
            required: false
        }
    }
});

export default mongoose.model("game", GameSchema);
