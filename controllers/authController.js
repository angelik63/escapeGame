const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRepo = require("../repositories/userRepository");

const JWT_SECRET = process.env.JWT_SECRET;

exports.register = async (req, res) => {
  // TODO : Récupérer le nom d'utilisateur username et le mot de passe password depuis le corps de la requête
 const { username, password } = req.body;

  if (!username || !password) {
    console.log(" ⚠️ Registration failed: Missing username or password");
    return res.status(400).json({ error: "Username and password are required" });
  }

  const existing = userRepo.findUserByUsername(username);
  if (existing) {
    console.log(" ⚠️ Registration failed: User already exists");
    return res.status(400).json({ error: "User already exists" });
  }

  // TODO : Hash the password before storing it
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds) ;
  console.log("Password hashed successfully");
  const user = userRepo.createUser({ username, password: hash, currentRoom: 1 });

  // TODO : Return a success message 
   console.log("✅ User registered successfully");
    return res.status(201).json({ message: "User registered successfully" });

};

exports.login = async (req, res) => {
  // TODO : Récupérer le nom d'utilisateur username et le mot de passe password depuis le corps de la requête
  const {username, password} =req.body;

  console.log("Login attempt for:", username);

  const user = userRepo.findUserByUsername(username);
  // TODO : Vérifier si l'utilisateur existe sinon retourner un statut 401
  if(!user) return res.status(401).json({error: "Invalid credentials"})

  // Compare the provided password with the stored hash
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ error: "Invalid credentials" });

  console.log(" ✅ User authenticated:", username);
  // TODO : Sign the JWT token with the username and JWT_SECRET
  const token = jwt.sign({ username : user.username, userId: user.id }, JWT_SECRET);
  // TODO : Return the token in the response in json
return res.json({token});
};

exports.me = (req, res) => {
  res.json({ user: req.user });
};

