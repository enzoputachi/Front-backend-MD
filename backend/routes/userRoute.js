import express from "express";
import User from "../models/userModel.js";
import expressAsyncHandler from "express-async-handler";
import { generateToken } from "../utils.js";

const userRouter = express.Router();

userRouter.get("/createadmin", expressAsyncHandler(async (req, res) => {
  try {
    const user = new User({
      name: "admin",
      email: "admin@gmail.com",
      password: "micahdrew",
      isAdmin: true,
    });

    const createdUser = await user.save();
    res.send(createdUser);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}));

userRouter.post("/signin", expressAsyncHandler(async (req, res) => {
  /*send a request to the database to retrieve a 
  user with the specified signin details*/
  const signInUser = await User.findOne({
    email: req.body.email,
    password: req.body.password
  });

  if(!signInUser) {
    res.status(401).send({
      message: 'Invalid email or password',
    })
  } else {
    res.send({
      _id: signInUser._id,
      name: signInUser.name,
      email: signInUser.email,
      isAdmin: signInUser.isAdmin,
      token: generateToken(signInUser),
    })
  }
}));


userRouter.post("/register", expressAsyncHandler(async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  const createdUser = await user.save();

  if(!createdUser) {
    res.status(401).send({
      message: 'Invalid user data',
    })
  } else {
    res.send({
      _id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      isAdmin: createdUser.isAdmin,
      token: generateToken(createdUser),
    })
  }
}));



export default userRouter;
