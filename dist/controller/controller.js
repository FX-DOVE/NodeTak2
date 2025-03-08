"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNoteById = exports.createNewNote = exports.getNoteById = exports.getAllNotes = void 0;
const Noteschema_1 = __importDefault(require("../noteschema/Noteschema"));
// getall notes  functions 
const getAllNotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notes = yield Noteschema_1.default.find();
        if (!notes.length) {
            console.log("you have successfully fetched all Notes");
            res.status(200).send({
                messages: "note is empty ",
                Notes: "Add New Note Please"
            });
            return;
        }
        console.log("you have successfully fetched all Notes");
        res.status(200).send({
            messages: " you have successfully fetched all Notes",
            Notes: notes
        });
    }
    catch (error) {
        console.error('Error fetching notes:', error);
        res.status(500).send({ message: 'Internal server error', error });
        return;
    }
});
exports.getAllNotes = getAllNotes;
// get notes by id functions 
const getNoteById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        // find note with id 
        const note = yield Noteschema_1.default.findOne({ id });
        if (!note) {
            console.error('Note not found');
            res.status(500).send({ message: ' Note not found' });
            return;
        }
        console.log(note);
        res.status(200).send({
            messages: " you have successfully fetched one Note By id",
            Notes: note
        });
    }
    catch (error) {
        console.error('Internal server error:', error);
        res.status(500).send({ message: 'Internal server error', error });
        return;
    }
});
exports.getNoteById = getNoteById;
// create new notes functions 
const createNewNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content } = req.body;
    try {
        // check is the note title is already in the database 
        const existedNote = yield Noteschema_1.default.findOne({ title });
        if (existedNote) {
            console.log('Note title already exists');
            res.status(409).send("not title alreasy exists");
            return;
        }
        // Find the last created note to get the last `id`
        const lastNote = yield Noteschema_1.default.findOne().sort({ id: -1 }); // Sort by `id` in descending order
        const newId = lastNote ? lastNote.id + 1 : 1; // Increment `id`, default to 1 if no notes exist
        // Create the new note
        const newNote = new Noteschema_1.default({
            id: newId,
            title,
            content,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        // saving the note to data base 
        yield newNote.save();
        res.status(201).send({
            success: true,
            message: `you have succssfully created Note => ${title}`,
            note: newNote
        });
        console.log(`Note create successfully ${newNote}`);
    }
    catch (error) {
        console.log(error);
        res.send(error);
    }
});
exports.createNewNote = createNewNote;
// delete one note by id functions
const deleteNoteById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const note = yield Noteschema_1.default.findOneAndDelete({ id });
        if (!note) {
            console.log(" Bote not found try again");
            res.status(500).send({ message: ' Note not found' });
            return;
        }
        const remainingNote = yield Noteschema_1.default.find();
        if (!remainingNote.length) {
            res.status(200).send({ message: ' Note deleted successfuly',
                note: 'Note is empty'
            });
            return;
        }
        res.status(200).send({ message: `Note with Id: ${id} has been deleted`,
            note: remainingNote
        });
        return;
    }
    catch (error) {
        res.send(" server error");
    }
});
exports.deleteNoteById = deleteNoteById;
