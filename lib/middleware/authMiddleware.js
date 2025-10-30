const jwt = require("jsonwebtoken");

const auth =
  (roles = []) =>
  (req, res, next) => {
    try {
      const header = req.headers.authorization;
      if (!header)
        return res.status(401).json({ message: "Ingen token fundet" });

      const parts = header.split(" ");
      if (parts.length !== 2 || parts[0] !== "Bearer")
        return res.status(401).json({ message: "Ugyldig token format" });

      const token = parts[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: "Ingen adgang" });
      }

      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).json({ message: "Ugyldig token" });
    }
  };

module.exports = auth;
