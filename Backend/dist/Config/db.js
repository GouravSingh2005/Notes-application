import mongoose from "mongoose";
export const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI;
        if (!uri) {
            console.error("❌ MONGO_URI is undefined. Check your .env file.");
            process.exit(1);
        }
        await mongoose.connect(uri);
        console.log("✅ MongoDB Connected");
    }
    catch (err) {
        console.error("MongoDB Error:", err);
        process.exit(1);
    }
};
//# sourceMappingURL=db.js.map