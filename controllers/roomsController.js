const rooms = require("../data/rooms");
const { users } = require("../repositories/userRepository");

exports.getRoom = (req, res) => {
  //TODO : Récupérer l'id de la room depuis les paramètres de la requête
  const roomId = parseInt(req.params.id);
  // TODO : Trouver la room correspondante dans le tableau rooms. Le tableau rooms est importé
  const room = rooms.find(r => r.id === roomId)

  if (!room) return res.status(404).json({ error: "Room not found" });
  res.json({ question: room.question });
};

exports.submitAnswer = (req, res) => {
  const roomId = parseInt(req.params.id);
  // TODO : Récupérer la réponse depuis le corps de la requête
  const { answer } = req.body;
  const user = users.find(u => u.username === req.user.username);
  // TODO : Trouver la room correspondante dans le tableau rooms. Le tableau rooms est importé
  const room = rooms.find(r => r.id === roomId);

  // TODO : Vérifier si la room existe, sinon retourner un statut 404
  if(!room) {
    return res.status(404).json({error: "Room not found"});
  }

  if (room.answer.toLowerCase() === answer.trim().toLowerCase()) {
    if(user.currentRoom === rooms.length+1) {
      return res.json({ success: true, message: "Congratulations! You've completed the game!" });
    }
    if (user.currentRoom < roomId + 1) user.currentRoom = roomId + 1;
    return res.json({ success: true, nextRoom: user.currentRoom });
  } else {
    // TODO : Retourner un JSON {error: avec "Wrong answer" et un statut de votre choix
    return res.status(400).json({error : "Wrong answer"})
  }
};
