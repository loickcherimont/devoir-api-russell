import mongoose from "mongoose";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;

const User = new Schema({
    email: {
        type: String,
        trim: true,
        required: [true, "L'adresse de messagerie est requis"],
        unique: true,
        lowercase: true
    },
    username: {
        type: String,
        trim: true,
        required: [true, "Le nom d'utilisateur est requis"]
    },
    password: {
        type: String,
        trim: true,
        required: [true, "Le mot de passe est requis"],
        minlength: [12, "Le mot de passe doit faire minimum 12 caractères"] 
    }
}, {
    timestamps: true
});

User.pre("save", function (next) {
    const SALT_ROUNDS = 10; // standard bcrypt cost factor (historical default value)

    if (!this.isModified("password")) return next();

    this.password = bcrypt.hashSync(this.password, SALT_ROUNDS);

    next();
});


export default mongoose.model("User", User);