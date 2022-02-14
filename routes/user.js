const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

router.post(
  "/register/:email/:password/:firstName/:lastName/:mobileNumber",
  async (req, res) => {
    const firstName = req.params.firstName;
    const lastName = req.params.lastName;
    const mobileNumber = req.params.mobileNumber;
    const email = req.params.email;
    const password = req.params.password;
    // console.log(email, password, lastName, firstName, mobileNumber);
    if (!(email && password)) {
      res.status(202).json({ message: "Data not formatted" });
    }
    const saltRounds = 10;
    let hashedPassword;

    hashedPassword = bcrypt.hashSync(password, saltRounds);
    try {
      const isAlreadyUser = await User.findOne({ email: email });

      if (isAlreadyUser) {
        res.status(201).json({ message: "Email already in use" });
        return;
      }
      const newUser = {
        email: email,
        password: hashedPassword,
        firstName: firstName,
        lastName: lastName,
        mobilenumber: mobileNumber,
      };
      // console.log(newUser);
      User.create(newUser, (err) => {
        if (err) console.log(err);
        else {
          console.log("User Addded");
          res.status(200).json({ message: "User Added" });
        }
      });
    } catch (err) {
      console.log(err);
    }
  }
);

router.get("/login/:email/:password", async (req, res) => {
  const email = req.params.email;
  const password = req.params.password;

  try {
    const isAlreadyUser = await User.find({ email: email });
    if (isAlreadyUser.length === 0) {
      res.status(203).json({ message: "User not found" });
      return;
    }
    const user = isAlreadyUser[0];
    let isValid = false;
    isValid = bcrypt.compareSync(password, user.password);

    const tokenUser = {
      email: user.email,
      password: user.password,
    };

    const token = jwt.sign(tokenUser, process.env.KEY, {
      expiresIn: 60,
    });

    if (!isValid) {
      // console.log("token not sent", token);
      return res.status(204).json({ message: "Incorrect password" });
    } else {
      // console.log("token sent", token);
      return res.status(200).json({ token: token.toString() });
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/verifyToken/:token", (req, res) => {
  const token = req.params.token;

  if (!token) {
    res.status(206).json({ message: "not verified" });
  }
  jwt.verify(token, process.env.KEY, (err, verifiedToken) => {
    if (err) {
      console.log(err);
      res.status(206).json({ message: "not verfied" });
    } else {
      // console.log("Token: ", token);
      // console.log("Verified");

      res.status(200).json({ message: "verified Token", token: verifiedToken });
    }
  });
});

module.exports = router;
