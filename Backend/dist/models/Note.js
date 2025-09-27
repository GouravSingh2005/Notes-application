import mongoose, { Schema } from "mongoose";
const noteSchema = new Schema({
    userEmail: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
export const Note = mongoose.model("Note", noteSchema);
//# sourceMappingURL=Note.js.map