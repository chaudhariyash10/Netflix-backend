const router = require('express').Router();
const bcrypt = require("bcrypt");
const User = require('../models/user.model');


router.post( '/register/:email/:pass/:firstName/:lastName/:mobileNumber', async (req, res) => {
    const firstName = req.params.firstName;
    const lastName = req.params.lastName;
    const mobileNumber = req.params.mobileNumber;
    const email = req.params.email;
    const password = req.params.pass;

    if (!(email && password)) {
        res.status(202).json({ "message": "Data not formatted" });
    }

    const hashedPassword = bcrypt.hash(password, 10);
    try {
        const isAlreadyUser = await User.findOne({ email: email });

        if (isAlreadyUser) {
            res.status(201).json({ "message": "Email already in use" });
        }
        const newUser = {
            email, password, firstName, lastName, mobileNumber
        };

        User.create(newUser, (err) => {
            if(err)
            console.log(err);
            else
                console.log("User Addded")
        })

    } catch (err) {
        console.log(err);
    }

})

router.get('/login/:email/:pass',async (req, res) => {
    const email = req.params.email;
    const password = req.params.pass;
    try{
        const isAlreadyUser = User.findOne({ email: email });

        if (!isAlreadyUser)
        {
            res.status(203).json({ "message": "User not found"});
        }

        const isValid = bcrypt.compare(password, isAlreadyUser.password);

        if (!isValid) {
            res.status(204).json({ "message": "Incorrect password" });
        }
        else {
            res.status(200).json({ "message": "Authenticated User" });
        }

}
    catch (err){
        console.log(err);
        }
        
})
module.exports = router;