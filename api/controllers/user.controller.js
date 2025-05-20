import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
import User from "../models/User.model.js";

export const userHomePage = (req, res) => {
  res.json({
    message: "Hello from API/user",
  });
};

export const updatePicture = async (req, res, next) => {
  try {
    
    if(!req.file) return next(errorHandler(400, "no file uploaded"));

    res.status(201).json({message:"Image uploaded!", success: true, filename: req.file.filename});

  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  
  
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "you can update only your profile"));

  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          profilePicture: req.body.profilePicture,
        },
      },
      { new: true }
    );

    const { hashedPassword, ...rest } = updatedUser._doc;
    
    return res.status(200).json(rest);
  } catch (error) {
    console.error(error);
    
    next(error);
  }
};
