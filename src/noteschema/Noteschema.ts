import mongoose, { Schema, Document } from "mongoose";

// Define the Category interface
export interface ICategory extends Document {
  name: string;
}

// Define the Note interface
export interface INote extends Document {
  _id: string;
  id: number;
  title: string;
  content: string;
  category: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

// Define the Category schema
const CategorySchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
});

// Define the Note schema
const NoteSchema: Schema = new Schema(
  {
    id: { type: Number, unique: true },
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
  },
  { timestamps: true }
);

// Create models
export const Category = mongoose.model<ICategory>("Category", CategorySchema);
const Note = mongoose.model<INote>("Note", NoteSchema);

export default Note;
