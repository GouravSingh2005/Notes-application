import { Router } from "express";
import { sendOtp, verifyOtp } from "../controllers/authcontrollers.js";
const router = Router();
router.post("/signup", sendOtp);
router.post("/verify-otp", verifyOtp);
export default router;
//# sourceMappingURL=auth.js.map