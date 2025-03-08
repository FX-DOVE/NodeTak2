"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = require("../controller/controller");
const Routh = express_1.default.Router();
Routh.get("/notes", controller_1.getAllNotes);
Routh.get("/notes/:id", controller_1.getNoteById);
Routh.post("/notes", controller_1.createNewNote);
Routh.delete("/notes/:id", controller_1.deleteNoteById);
exports.default = Routh;
