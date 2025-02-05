import { Account } from "../model/index.js";
import mongoose from "mongoose";
import { User } from "../model/index.js";
import { depositMoneySchema, transferSchema } from "../types/balance.js";

export const depositMoney = async (req, res, next) => {
   const success = depositMoneySchema.safeParse(req.body);

   if (!success.success) {
      const errorMessage =
         success.error.errors.map((err) => err.message).join(", ") ||
         "Invalid Credentials";
      return res.status(400).json({
         success: false,
         message: `Validation Errors: ${errorMessage}`,
      });
   }

   const userId = req.userId;

   if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
         success: false,
         message: "Invalid ID format",
      });
   }
   const { balance } = req.body;

   if (!balance || balance < 0) {
      return res.status(400).json({
         success: false,
         message: "Balance cannot be empty or negative.",
      });
   }

   try {
      const user = await User.findById(userId);

      if (!user) {
         return res.status(404).json({
            success: false,
            message: "User not found",
         });
      }

      const balanceAdded = await Account.create({
         userId,
         balance,
      });

      if (!balanceAdded) {
         return res.status(400).json({
            success: false,
            message: "Something went wrong while deposit the money.",
         });
      }

      return res.status(200).json({
         success: true,
         message: "Money deposit successfully.",
      });
   } catch (error) {
      return res.status(400).json({
         success: false,
         message: "money deposit failed",
      });
   }
};

export const balance = async (req, res, next) => {
   let userId = req.userId;

   if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
         success: false,
         message: "Invalid ID format",
      });
   }
   try {
      const account = await Account.findOne({
         userId,
      });

      if (!account) {
         return res.status(400).json({
            success: false,
            message: "User not found.",
         });
      }

      return res.status(200).json({
         success: true,
         balance: account.balance,
      });
   } catch (error) {
      return res.status(400).json({
         success: false,
         message: "Something went wrong",
      });
   }
};

export const transferMoney = async (req, res, next) => {
   let session = await mongoose.startSession();

   session.startTransaction();
   const success = transferSchema.safeParse(req.body);

   if (!success.success) {
      const errorMessage = success.error.errors
         .map((err) => err.message)
         .join(", ");
      await session.abortTransaction();
      return res.status(400).json({
         success: false,
         message: `Validation error: ${errorMessage}`,
      });
   }

   const { amount, to } = success.data;

   try {
      // Validate ObjectId format for both user IDs
      if (!mongoose.Types.ObjectId.isValid(to)) {
         await session.abortTransaction();
         return res.status(400).json({
            success: false,
            message: "Invalid recipient ID format",
         });
      }

      const account = await Account.findOne({ userId: req.userId }).session(
         session
      );

      if (!account || account.balance < amount) {
         await session.abortTransaction();
         return res.status(400).json({
            success: false, // Added missing success field
            message: "Insufficient balance",
         });
      }

      const toAccount = await Account.findOne({ userId: to }).session(session);

      if (!toAccount) {
         await session.abortTransaction();
         return res.status(400).json({
            success: false,
            message: "Recipient account not found",
         });
      }

      // Use findOneAndUpdate instead of updateOne to ensure document exists
      const fromAccountUpdate = await Account.findOneAndUpdate(
         { userId: req.userId },
         { $inc: { balance: -amount } },
         { session, new: true }
      );

      const toAccountUpdate = await Account.findOneAndUpdate(
         { userId: to },
         { $inc: { balance: amount } },
         { session, new: true }
      );

      if (!fromAccountUpdate || !toAccountUpdate) {
         throw new Error("Failed to update account balances");
      }

      await session.commitTransaction();

      return res.json({
         success: true,
         message: "Money transfer successfully",
      });
   } catch (error) {
      await session.abortTransaction();
      console.error("Transaction failed:", error);

      return res.status(400).json({
         success: false, // Fixed typo in success
         message: "Money transfer failed",
      });
   } finally {
      session.endSession();
   }
};
