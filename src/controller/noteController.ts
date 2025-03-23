import { Request, Response } from "express";
import Note from "../models/Noteschema";
import { AuthRequest } from "../middleware/authMiddleware";

// Get notes for authenticated user
export const getAllNotes = async (req: AuthRequest, res: Response) => {
  try {
    const notes = await Note.find({ user: req.user }).populate("category");
    res.status(200).send(notes);
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error });
  }
};

// Create new note for authenticated user with sequential ID
export const createNewNote = async (req: AuthRequest, res: Response) => {
  const { title, content, category } = req.body;
  try {
    if (!title) {
      res.status(400).send({ message: "Title is required" });
      return;
    }
    if (!content) {
      res.status(400).send({ message: "Content is required" });
      return;
    }

    // Count existing notes to determine the next sequential ID
    const totalNotes = await Note.countDocuments();
    const nextId = totalNotes + 1; // Assign next sequential ID

    const newNote = new Note({
      id: nextId, // Add sequential ID
      title,
      content,
      category,
      user: req.user,
    });

    await newNote.save();
    res.status(201).send({ message: "Note created successfully", note: newNote });
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error });
  }
};

// Get note by ID
export const getNoteById = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  try {
    const note = await Note.findOne({ id, user: req.user }).populate("category");
    if (!note) {
      res.status(404).send({ message: "Note not found" });
    } else {
      res.status(200).send(note);
    }
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error });
  }
};

// Delete note by ID
export const deleteNoteById = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  try {
    const note = await Note.findOneAndDelete({ id, user: req.user });
    if (!note) {
      res.status(404).send({ message: "Note not found" });
    } else {
      res.status(200).send({ message: `Note with ID ${id} deleted successfully` });
    }
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error });
  }
};

// Update note by ID
export const UpdateANote = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { title, content, category } = req.body;
  try {
    const note = await Note.findOne({ id, user: req.user });
    if (!note) {
      res.status(404).send({ message: "No note found" });
    } else {
      if (title) note.title = title;
      if (content) note.content = content;
      if (category) note.category = category;
      note.updatedAt = new Date();
      await note.save();
      res.status(200).send({ message: "Note updated successfully", note });
    }
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error });
  }
};
