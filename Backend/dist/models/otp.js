import mongoose, { Schema, Document } from "mongoose";
const otpSchema = new Schema({
    email: { type: String, required: true },
    otp: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, required: true }
});
export const Otp = mongoose.model("Otp", otpSchema);
//# sourceMappingURL=otp.js.map