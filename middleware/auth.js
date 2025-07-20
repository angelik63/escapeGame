const jwt = require("jsonwebtoken");
const { findUserByUsername } = require("../repositories/userRepository");

const JWT_SECRET = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing or invalid token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    //TODO : Vérifier le token JWT avec la clé secrète JWT_SECRET
     const payload = jwt.verify(token, JWT_SECRET);
    const user = findUserByUsername(payload.username);
    if (!user) throw new Error("User not found");
    req.user = user;
    next();
    
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};
 
