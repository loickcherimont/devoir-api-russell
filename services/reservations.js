import Reservation from "../models/reservation.js";

async function addReservation(req, res, next) {
    const temp = {
        catwayNumber: req.params.catwayNumber,
        clientName: req.body.clientName.trim(),
        boatName: req.body.boatName.trim(),
        startDate: req.body.startDate,
        endDate: req.body.endDate,
    };

    try {
        const reservation = await Reservation.create(temp);

        if (reservation) return res.status(201).json(reservation);
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: error.message });
    }
}

async function getAllReservations(req, res, next) {
    const catwayNumber = req.params.catwayNumber;

    try {
        const reservations = await Reservation.find({ catwayNumber });

        return res.status(200).json(reservations);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

async function getReservationById(req, res, next) {

    const catwayNumber = req.params.catwayNumber, id = req.params.id;

    try {
        const reservation = await Reservation.findOne({ _id: id, catwayNumber });

        if (reservation) return res.status(200).json(reservation);

        return res.status(404).json({ message: "Réservation non trouvée" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

async function updateReservationById(req, res, next) {
    const catwayNumber = req.params.catwayNumber, id = req.params.id;

    const temp = {
        clientName: req.body.clientName.trim(),
        boatName: req.body.boatName.trim(),
        startDate: req.body.startDate,
        endDate: req.body.endDate,
    };

    try {
        const reservation = await Reservation.findOne({ _id: id, catwayNumber });

        if (reservation) {
            Object.keys(temp).forEach((key) => {
                if (!!temp[key]) {
                    reservation[key] = temp[key];
                }
            });

            await reservation.save();
            return res.status(200).json(reservation);
        }

        return res.status(404).json({ message: "Réservation non trouvée. Veuillez choisir une réservation existante pour la modification" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

async function deleteReservationById(req, res, next) {
    const catwayNumber = req.params.catwayNumber, id = req.params.id;

    try {
        await Reservation.deleteOne({ _id: id, catwayNumber });

        return res.status(200).json({ message: "Réservation supprimée" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export default { addReservation, getAllReservations, getReservationById, updateReservationById, deleteReservationById };
