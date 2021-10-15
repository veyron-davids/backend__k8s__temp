const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const router = express.Router();

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email });
  if (!user) return res.status(403).json({ message: "Account does not exist" });

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword)
    return res.status(403).json({ message: "Invalid Password" });

  const token = user.generateAuthToken();
  req.session.jwt = token;
  res.status(200).send(user);
});

module.exports = router;
