import express from "express";
import { createNote, getNotes, updateNote, deleteNote } from "../controllers/noteController.js";
import { authenticateJWT } from "../middleware/middleware.js";

const router = express.Router();

router.post("/", authenticateJWT, createNote);
router.get("/", authenticateJWT, getNotes);
router.put("/:id", authenticateJWT, updateNote);
router.delete("/:id", authenticateJWT, deleteNote);

export default router;
