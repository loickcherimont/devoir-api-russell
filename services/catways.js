import Catway from "../models/catway.js";

async function addCatway(req, res, next) {

    const temp = {
        catwayNumber: await Catway.countDocuments() + 1,
        catwayType: req.body.catwayType,
        catwayState: req.body.catwayState,
    };

    try {
        const catway = await Catway.create(temp);

        if (catway) return res.status(201).json(catway);
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: error.message });
    }
}

async function getAllCatways(req, res, next) {
    try {
        const catways = await Catway.find();
        return res.status(200).json(catways);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

async function getCatwayByCatwayNumber(req, res, next) {
    const catwayNumber = req.params.catwayNumber;

    try {
        const catway = await Catway.findOne({ catwayNumber });

        if (catway) return res.status(200).json(catway);

        return res.status(404).json({ message: "Catway non trouvé" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

async function updateCatwayStateByCatwayNumber(req, res, next) {
    const catwayNumber = req.params.catwayNumber;

    const temp = {
        catwayState: req.body.catwayState,
    };

    try {
        const catway = await Catway.findOne({ catwayNumber });

        if (catway) {
            if (temp.catwayState) {
                catway.catwayState = temp.catwayState;
            }

            await catway.save();
            return res.status(200).json(catway);
        }

        return res.status(404).json({ message : "Catway non trouvé. Veuillez choisir un catway existant pour la modification"});

    } catch (error) {
        return res.status(500).json({ message : error.message });
    }
}

async function deleteCatwayByCatwayNumber(req, res, next) {
    const catwayNumber = req.params.catwayNumber;

    try {
        await Catway.deleteOne({ catwayNumber });

        return res.status(200).json({ message: "Catway supprimé" });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export default { addCatway, getAllCatways, getCatwayByCatwayNumber, updateCatwayStateByCatwayNumber, deleteCatwayByCatwayNumber };
