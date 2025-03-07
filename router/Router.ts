import Express from "express";


import { getAllNotes, getNoteById, createNewNote, deleteNoteById } from "../controller/controller";

const Routh = Express.Router()

Routh.get("/notes", getAllNotes);
Routh.get("/notes/:id",getNoteById);

Routh.post("/notes", createNewNote );
Routh.delete("/notes/:id", deleteNoteById);


export default Routh