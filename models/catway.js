import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Catway = new Schema({
    catwayNumber: {
        type: Number,
        required: [true, "Le numéro de catway est requis"],
        unique: true
    },
    catwayType: {
        type: String,
        required: [true, "Le type de catway est requis"],
        enum: {
            values: ["long", "short"],
            message: "Le type de catway doit être 'long' ou 'short'"
        }
    },
    catwayState: {
        type: String,
        maxlength: [255, "L'état du catway ne peut pas dépasser 255 caractères"]
    }
}, {
    timestamps: true
});

export default mongoose.model("Catway", Catway);
