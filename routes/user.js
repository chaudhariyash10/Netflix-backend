const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user.model");

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
    bcrypt
      .genSalt(saltRounds)
      .then((salt) => {
        return bcrypt.hash(password, salt);
      })
      .then((hash) => {
        hashedPassword = hash;
      });

    try {
      const isAlreadyUser = await User.findOne({ email: email });

      if (isAlreadyUser) {
        res.status(201).json({ message: "Email already in use" });
        return;
      }
      const newUser = {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        mobileNumber,
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
    const isAlreadyUser = User.findOne({ email: email });

    if (!isAlreadyUser) {
      res.status(203).json({ message: "User not found" });
    }

    const isValid = bcrypt.compare(password, isAlreadyUser.password);

    if (!isValid) {
      res.status(204).json({ message: "Incorrect password" });
    } else {
      res.status(200).json({ message: "Authenticated User" });
    }
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
