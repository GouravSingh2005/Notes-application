import mongoose, { Document } from "mongoose";
export interface IOtp extends Document {
    email: string;
    otp: string;
    createdAt: Date;
    expiresAt: Date;
}
export declare const Otp: mongoose.Model<IOtp, {}, {}, {}, mongoose.Document<unknown, {}, IOtp, {}, {}> & IOtp & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=otp.d.ts.map