import { Otp } from "../models/otp.js";
import { sendOtpEmail } from "../utils/Sendmail.js";
import jwt from "jsonwebtoken";
// -------------------- SEND OTP --------------------
export const sendOtp = async (req, res) => {
    const { email } = req.body;
    if (!email)
        return res.status(400).json({ error: "Email is required" });
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    console.log("Generated OTP:", otpCode);
    try {
        // Save OTP to DB
        await Otp.create({
            email,
            otp: otpCode,
            createdAt: new Date(),
            expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes expiry
        });
        // Send email safely
        await sendOtpEmail(email, otpCode);
        console.log("OTP email sent to:", email);
        return res.status(200).json({ message: "OTP sent to email" });
    }
    catch (err) {
        console.error("Failed to send OTP:", err);
        return res.status(500).json({ error: "Failed to send OTP" });
    }
};
// -------------------- VERIFY OTP --------------------
export const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;
    if (!email || !otp)
        return res.status(400).json({ error: "Email and OTP required" });
    try {
        // Find latest OTP for this email
        const record = await Otp.findOne({ email, otp }).sort({ createdAt: -1 });
        if (!record)
            return res.status(400).json({ error: "Invalid OTP" });
        // Check expiry
        if (record.expiresAt.getTime() < Date.now()) {
            await Otp.deleteMany({ email, otp }); // delete expired OTP
            return res.status(400).json({ error: "OTP expired" });
        }
        // OTP valid → generate JWT
        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });
        // Delete used OTP
        await Otp.deleteMany({ email, otp });
        return res.status(200).json({ message: "OTP verified", token });
    }
    catch (err) {
        console.error("OTP verification error:", err);
        return res.status(500).json({ error: "OTP verification failed" });
    }
};
//# sourceMappingURL=authcontrollers.js.map