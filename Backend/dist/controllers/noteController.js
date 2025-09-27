import { Note } from "../models/Note.js";
export const createNote = async (req, res) => {
    const { title, content } = req.body;
    const userEmail = req.userEmail; // JWT middleware se aayega
    try {
        const note = await Note.create({ userEmail, title, content });
        res.status(201).json(note);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to create note" });
    }
};
// Get All Notes
export const getNotes = async (req, res) => {
    const userEmail = req.userEmail;
    try {
        const notes = await Note.find({ userEmail });
        res.status(200).json(notes);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch notes" });
    }
};
// Update Note
export const updateNote = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const userEmail = req.userEmail;
    try {
        const note = await Note.findOneAndUpdate({ _id: id, userEmail }, { title, content, updatedAt: new Date() }, { new: true });
        if (!note)
            return res.status(404).json({ error: "Note not found" });
        res.status(200).json(note);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to update note" });
    }
};
// Delete Note
export const deleteNote = async (req, res) => {
    const { id } = req.params;
    const userEmail = req.userEmail;
    try {
        const note = await Note.findOneAndDelete({ _id: id, userEmail });
        if (!note)
            return res.status(404).json({ error: "Note not found" });
        res.status(200).json({ message: "Note deleted successfully" });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to delete note" });
    }
};
//# sourceMappingURL=noteController.js.map