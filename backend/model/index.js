import mongoose, { Schema } from "mongoose";
import bcryptjs from "bcryptjs";

const userSchema = new Schema(
   {
      username: {
         type: String,
         required: true,
         unique: true,
      },
      firstname: {
         type: String,
         required: true,
      },
      lastname: {
         type: String,
         required: true,
      },
      password: {
         type: String,
         required: true,
      },
   },
   {
      timestamps: true,
   }
);

export const balanceSchema = new Schema({
   userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
   },
   balance: {
      type: Number,
      required: true,
      default: 0,
   },
});

userSchema.pre("save", async function (next) {
   if (!this.isModified("password")) {
      return next();
   }

   this.password = await bcryptjs.hash(this.password, 10);
   next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
   return await bcryptjs.compare(password, this.password);
};

export const User = mongoose.model("User", userSchema);
export const Account = mongoose.model("Balance", balanceSchema);
