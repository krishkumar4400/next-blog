import { model, models, Schema } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        index: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        trim: true,
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    refreshToken: {
        type: String,
        default: ''
    },

}, {
    timestamps: true
});

const userModel = models.User || model("User", userSchema);
export default userModel;