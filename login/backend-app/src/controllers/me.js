const express = require("express");
const router = express.Router();
const authenticated = require("../middlewares/authReq");

router.get("/me", authenticated, (req, res) => {
  res.json(req.user);
});

module.exports = router;
