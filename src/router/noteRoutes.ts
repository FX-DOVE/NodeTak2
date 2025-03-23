import express from "express";
import { getAllNotes, createNewNote, getNoteById, deleteNoteById, UpdateANote } from "../controller/noteController";
import { authenticateUser } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/notes", authenticateUser, getAllNotes);
router.post("/notes", authenticateUser, createNewNote);
router.get("/notes/:id", authenticateUser, getNoteById);
router.delete("/notes/:id", authenticateUser, deleteNoteById);
router.put("/notes/:id", authenticateUser, UpdateANote);

export default router;
