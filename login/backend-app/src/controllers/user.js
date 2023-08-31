const express = require("express");
const bcrypt = require("bcrypt");

const signupValidtor = require("../middlewares/signUpReq");
const jwtUtils = require("../utils/jwt");
const knex = require("../database");

const router = express.Router();

router.post("/signup", signupValidtor, async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password.toString(), 10);
    const response = await knex("user").insert({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    if (response.length > 0) {
      res.json({ message: "User registered successfully!" });
    } else {
      res.status(500).json({ error: "Failed to register user." });
    }
  } catch (error) {
    console.error("Error with user registration:", error);
    res
      .status(500)
      .json({ error: "An error occurred during user registration." });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await knex("user").where({ email: req.body.email }).first();

    if (user) {
      const passwordMatch = await bcrypt.compare(
        req.body.password.toString(),
        user.password
      );

      if (passwordMatch) {
        const accessToken = jwtUtils.generate(user);
        return res.status(200).json({ token: accessToken, user: user });
      } else {
        return res
          .status(400)
          .json({ Error: "Username or Password is incorrect" });
      }
    } else {
      return res
        .status(400)
        .json({ errMessage: "Username or Password is incorrect" });
    }
  } catch (error) {
    console.error("An error occurred:", error);
    return res.status(500).json({ errMessage: "Internal server error" });
  }
});

module.exports = router;
