import express from "express";
import { 
  getAllNotes, 
  getNoteById, 
  createNewNote, 
  deleteNoteById, 
  UpdateANote, 
  getNotesByCategory 
} from "../controller/controller";

const Router = express.Router();

Router.get("/notes", getAllNotes);
Router.get("/notes/:id", getNoteById);
Router.post("/notes", createNewNote);
Router.delete("/notes/:id", deleteNoteById);
Router.put("/notes/:id", UpdateANote);
Router.get("/notes/categories/:categoryId", getNotesByCategory);

export default Router;
