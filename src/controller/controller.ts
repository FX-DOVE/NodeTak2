import { Request, Response } from "express";
import Note from "../noteschema/Noteschema";

// Get notes by category
export const getNotesByCategory = async (req: Request, res: Response): Promise<void> => {
    const { categoryId } = req.params;
    try {
      const notes = await Note.find({ category: categoryId });
      if (!notes.length) {
        res.status(404).json({ message: "No notes found for this category" });
        return;
      }
      res.status(200).json(notes);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Internal server error", error });
    }
  };

// Get all notes
export const getAllNotes = async (req: Request, res: Response): Promise<void> => {
  try {
    const notes = await Note.find().populate("category");
    if (!notes.length) {
      res.status(200).json({ message: "No notes available. Add new notes." });
      return;
    }
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

// Get note by ID
export const getNoteById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const note = await Note.findOne({ id }).populate("category");
    if (!note) {
      res.status(404).json({ message: "Note not found" });
      return;
    }
    res.status(200).json(note);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

// Create new note
export const createNewNote = async (req: Request, res: Response): Promise<void> => {
  const { title, content, category } = req.body;
  try {
    const existingNote = await Note.findOne({ title });
    if (existingNote) {
      res.status(409).json({ message: "Note title already exists" });
      return;
    }

    const lastNote = await Note.findOne().sort({ id: -1 });
    const newId = lastNote ? lastNote.id + 1 : 1;

    const newNote = new Note({
      id: newId,
      title,
      content,
      category,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await newNote.save();
    res.status(201).json({ message: `Note '${title}' created successfully`, note: newNote });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

// Delete note by ID
export const deleteNoteById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const note = await Note.findOneAndDelete({ id });
    if (!note) {
      res.status(404).json({ message: "Note not found" });
      return;
    }
    res.status(200).json({ message: `Note with ID ${id} deleted successfully` });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

// Update note by ID
export const UpdateANote = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { title, content, category } = req.body;
  try {
    const note = await Note.findOne({ id });
    if (!note) {
      res.status(404).json({ message: "No note found" });
      return;
    }

    if (title) note.title = title;
    if (content) note.content = content;
    if (category) note.category = category;
    note.updatedAt = new Date();

    await note.save();
    res.status(200).json({ message: "Note updated successfully", note });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};
