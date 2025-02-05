import { User, Account } from "../model/index.js";
import { signUpSchema, signInSchema, updateUserSchema } from "../types/user.js";
import jwt from "jsonwebtoken";

export const signUp = async (req, res, next) => {
   const success = signUpSchema.safeParse(req.body);

   if (!success.success) {
      const errorMessage =
         success.error.errors.map((err) => err.message).join(", ") ||
         "Invalid Credentials";
      return res.status(400).json({
         success: false,
         message: `Validation Errors: ${errorMessage}`,
      });
   }

   const { username, firstname, lastname, password } = req.body;

   if (
      [username, firstname, lastname, password].some(
         (field) => field.trim() === ""
      )
   ) {
      return res.status(400).json({
         success: false,
         message: "All fields are required and cannot be empty.",
      });
   }

   try {
      const userExist = await User.findOne({ username: username });

      if (userExist) {
         return res.status(400).json({
            success: false,
            message: "User already exist with that username.",
         });
      }

      const user = await User.create({
         username,
         firstname,
         lastname,
         password,
      });

      await Account.create({
         userId: user._id,
         balance: 1 + Math.random() * 10000,
      });

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

      res.setHeader("Authorization", `Bearer: ${token}`);

      return res.status(201).json({
         success: true,
         message: "User signup successfully",
         token,
      });
   } catch (error) {
      return res.status(500).json({
         success: false,
         message: "Internal server error! Signup failed.",
      });
   }
};

export const signIn = async (req, res, next) => {
   const success = signInSchema.safeParse(req.body);

   if (!success.success) {
      const errorMessage =
         success.error.errors.map((err) => err.message).join(", ") ||
         "Invalid Credentials";
      return res.status(400).json({
         success: false,
         message: `Validation Errors: ${errorMessage}`,
      });
   }

   const { username, password } = req.body;

   if ([username, password].some((field) => field.trim() === "")) {
      return res.status(400).json({
         success: false,
         message: "All fields are required and cannot be empty.",
      });
   }

   try {
      const userId = req.userId;
      const user = await User.findById(userId);

      if (!user || username != user.username) {
         return res.status(400).json({
            success: false,
            message: "User doesn't exist or invalid username",
         });
      }

      const isMatch = user.isPasswordCorrect(password);

      if (!isMatch) {
         return res.status(401).json({
            success: false,
            message: "Invalid credentials or password didn't matched",
         });
      }

      res.status(200).json({
         success: true,
         message: "User login successfully",
         user,
      });
   } catch (error) {
      return res.status(500).json({
         success: false,
         message: "Internal server error! Signin failed.",
      });
   }
};

export const updateUser = async (req, res, next) => {
   const success = updateUserSchema.safeParse(req.body);

   if (!success.success) {
      const errorMessage =
         success.error.errors.map((err) => err.message).join(", ") ||
         "Invalid Credentials";
      return res.status(400).json({
         success: false,
         message: `Validation Errors: ${errorMessage}`,
      });
   }

   try {
      const result = await User.updateOne(
         { _id: req.userId }, // Filter: Find user by their unique ID
         { $set: req.body } // Update: Set fields provided in req.body
      );

      if (result.modifiedCount === 0) {
         return res
            .status(404)
            .json({ message: "User not found or no changes made." });
      }

      return res.status(200).json({
         success: true,
         message: "User updated successfully",
      });
   } catch (error) {
      return res.status(500).json({
         success: false,
         message: "Internal server error! user updating failed.",
      });
   }
};

export const filterUser = async (req, res, next) => {
   const filter = req.query.filter || "";
   try {
      let users;

      if (filter) {
         users = await User.find({
            $or: [
               { firstname: { $regex: filter, $options: "i" } }, // Case-insensitive match
               { lastname: { $regex: filter, $options: "i" } },
            ],
         });
      } else {
         users = await User.find({});
      }

      const formattedUsers = users.map((user) => ({
         _id: user._id,
         username: user.username,
         firstname: user.firstname,
         lastname: user.lastname,
      }));

      return res.status(200).json({
         success: true,
         users: formattedUsers, // Return the formatted array
      });
   } catch (error) {
      return res.status(500).json({
         success: false,
         message: "Internal server error!.",
      });
   }
};
