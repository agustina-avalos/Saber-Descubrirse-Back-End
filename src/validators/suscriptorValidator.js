const { body, validationResult} = require("express-validator");
const Suscriptor = require("../models/Suscriptor");

const validateSuscriptor = [
    body("email")
    .isEmail()
    .withMessage("Debe ser un email válido"),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = validateSuscriptor;
