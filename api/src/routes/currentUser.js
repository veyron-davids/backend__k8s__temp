const currentUser = require("../middleware/current-user");
const requireAuth = require("../middleware/require-auth");
const router = express.Router();

router.post("/currentuser", currentUser, requireAuth, async (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});

module.exports = router;
