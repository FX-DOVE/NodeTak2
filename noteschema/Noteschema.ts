import mongoose, { Schema, Document } from 'mongoose';

// Define the Note interface
export interface INote extends Document {
  _id: string; // MongoDB auto-generates this as an ObjectId
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

// Define the Note schema
const NoteSchema: Schema = new Schema(
  {
    id:{
   type:Number,
   unique:true
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // Automatically adds `createdAt` and `updatedAt`
);

// Create the Note model
const Note = mongoose.model<INote>('Note', NoteSchema);

export default Note;
