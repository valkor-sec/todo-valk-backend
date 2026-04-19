const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.header("Authorization");

        if (!authHeader) {
            return res.status(401).json({ message: "Accès refusé, token manquant" });
        }

        // Vérification format Bearer
        if (!authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Format token invalide" });
        }

        const token = authHeader.replace("Bearer ", "");

        const verified = jwt.verify(token, process.env.JWT_SECRET);

        req.user = verified;
        next();

    } catch (err) {
        return res.status(401).json({ message: "Token invalide" });
    }
};

module.exports = authMiddleware;
