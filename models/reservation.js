import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Reservation = new Schema({
    catwayNumber: {
        type: Number,
        required: [true, "Le numéro de catway est requis"]
    },
    clientName: {
        type: String,
        trim: true,
        maxlength: [255, "Le nom du client ne peut pas dépasser 255 caractères"],
        required: [true, "Le nom du client est requis"]
    },
    boatName: {
        type: String,
        trim: true,
        maxlength: [255, "Le nom du bateau ne peut pas dépasser 255 caractères"],
        required: [true, "Le nom du bateau est requis"]
    },
    startDate: {
        type: Date,
        required: [true, "La date de début est requise"]
    },
    endDate: {
        type: Date,
        required: [true, "La date de fin est requise"]
    }
}, {
    timestamps: true
});

Reservation.pre("validate", async function () {
    if (this.endDate <= this.startDate) {
        this.invalidate("endDate", "La date de fin doit être strictement supérieure à la date de début");
    }
});

export default mongoose.model("Reservation", Reservation);
