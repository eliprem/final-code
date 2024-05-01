//Router for handling login system
import express from "express";
import bcrypt from 'bcrypt';
import UserModel from "../models/user";

const AccountRouter = express.Router()

AccountRouter.get('/', async (req, res) => {
    try {
        const username = req.session?.user;
        if (!username) {
            // User is not logged in
            res.status(200).json({ loggedIn: false });
            return;
        }

        const user = await UserModel.findOne({ username });
        if (!user) {
            // User not found in database
            res.status(404).send('User not found');
            return;
        }

        // User is logged in
        res.status(200).json({
            loggedIn: true,
            username: user.username
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user: ', error: error.message });
    }
 });


//POST route for signup with a body of username and password
AccountRouter.post('/signup', async (req, res) => {
    const { username, password } = req.body as {
        username: string;
        password: string;
    };

    if (!username) {
        res.status(400).send('Please provide a username')
    };
    if (!password) {
        res.status(400).send('Please provide a password')
    };

    try {
        // Check if username already exists
        const existingUser = await UserModel.exists({ username });
        if (existingUser) {
            throw new Error('Username already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Creating new user
        const newUser = new UserModel({ username, password: hashedPassword });
        await newUser.save();

        req.session!.user = username;
        res.status(200).send('User created!');
    } catch (error) {
        res.status(500).json({ message: 'Error signing up user: ', error: error.message });
    }

});


//POST route for login with a body of username and password
AccountRouter.post('/login', async (req, res) => {
    const { username, password } = req.body as {
        username: string;
        password: string;
    }

  try {
        //finding the user name
        const user = await UserModel.findOne({ username });
        if (!user) {
            //res.status(401).send('Invalid username')
            throw new Error('Username not in system');
        }

        //seeing if password is right
        const checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword) {
            //res.status(401).send('Invalid password')
            throw new Error('Incorrect password entered');
        }

        req.session!.user = username;
        res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in user: ',error: error.message});
  }

});


//POST route for logout
AccountRouter.post('/logout', async (req, res) => {
    req.session!.user = undefined;
    res.status(200).json({ message: 'Logout successful'})
});

export default AccountRouter;