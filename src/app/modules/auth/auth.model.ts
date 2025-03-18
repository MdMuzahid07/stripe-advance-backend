import mongoose from "mongoose";
import { TUser } from "./auth.interface";

const UserSchema = new mongoose.Schema<TUser>(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: false,
            default: ""
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },

        role: {
            type: String,
            enum: ["admin", "user"],
            default: "user"
        },
        stripeCustomerId: {
            type: String,
            default: ""
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },

    },
    {
        timestamps: true,
    }
);

// create user model
const UserModel = mongoose.model<TUser>("User", UserSchema);

export default UserModel;