import User from "../models/user";

export async function getByEmail(req, res, next) {
    const email = req.params.email;

    try {
        const user = await User.findOne({ email });

        if (user) return res.status(200).json(user);

        return res.status(404).json("Utilisateur non trouvé");
    } catch (error) {
        return res.status(500).json(error);
    }
}

export async function addUser(req, res, next) {
    const temp = {
        email: req.body.email.trim().toLowerCase(),
        username: req.body.username.trim(),
        password: req.body.password,
    };


    try {

        await validateEmail(temp.email);
        await validatePassword(temp.password);

        const user = await User.create(temp);
        if (user) return res.status(201).json(user);
    } catch (error) {
        return res.status(400).json(error);
    }
}

async function validateEmailIsUnique(email) {
    const existingUser = await User.findOne({ email });

    if (existingUser) throw new Error("L'adresse de messagerie existe déjà");
}

async function validateEmailFormat(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) throw new Error("Le format de l'adresse de messagerie n'est pas valide");
}

async function validateEmail(email) {
    await validateEmailFormat(email);
    await validateEmailIsUnique(email);
}

async function validatePassword(password) {

    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    if (!hasLowercase || !hasUppercase || !hasNumber) {
        throw new Error("Le mot de passe doit contenir minuscule, majuscule et chiffre");
    }
}