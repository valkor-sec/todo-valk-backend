const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try {
        const token = req.header("Authorization");

        if (!token) {
            return res.status(401).json({ message: "Accès refusé, token manquant" });
        }

        // format: Bearer token
        const realToken = token.split(" ")[1];

        const verified = jwt.verify(realToken, process.env.JWT_SECRET);

        req.user = verified;
        next();

    } catch (err) {
        res.status(401).json({ message: "Token invalide" });
    }
};

module.exports = authMiddleware;