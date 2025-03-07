import  { Request, Response } from 'express';
import Note, {INote} from '../noteschema/Noteschema'

// getall notes  functions 
export const getAllNotes =  async (req: Request, res: Response) => {
 try {
    const notes = await Note.find()
    if(!notes.length){
        console.log("you have successfully fetched all Notes")
    res.status(200).send({
        messages:"note is empty ",
        Notes:"Add New Note Please"
        
    }) 
    return
    }
    console.log("you have successfully fetched all Notes")
    res.status(200).send({
        messages:" you have successfully fetched all Notes",
        Notes:notes
    })
 } catch (error) {
    console.error('Error fetching notes:', error);
     res.status(500).send({ message: 'Internal server error', error });
     return
 }
 
};


// get notes by id functions 
export const getNoteById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        // find note with id 
    const note = await Note.findOne({id})
    if(!note){
        console.error('Note not found');
        res.status(500).send({ message: ' Note not found'});
        return
    }
    console.log(note)
   
    res.status(200).send({
        messages:" you have successfully fetched one Note By id",
        Notes:note
    })
    } catch (error) {
        console.error('Internal server error:', error);
         res.status(500).send({ message: 'Internal server error', error });
         return
    }
  };


  // create new notes functions 

  export    const createNewNote  = async (req: Request, res: Response) => {
    const {title, content} = req.body
    
    try {
        // check is the note title is already in the database 
        const existedNote: INote | null = await Note.findOne({title})
        if(existedNote){
            console.log('Note title already exists');
         res.status(409).send("not title alreasy exists")
        return
        }

        // Find the last created note to get the last `id`
    const lastNote: INote | null = await Note.findOne().sort({ id: -1 }); // Sort by `id` in descending order
    const newId: number = lastNote ? lastNote.id + 1 : 1; // Increment `id`, default to 1 if no notes exist


    // Create the new note
    const newNote: INote = new Note({
        id: newId,
        title,
        content,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      // saving the note to data base 
       await newNote.save();
      res.status(201).send(
        {
            success:true,
            message: `you have succssfully created Note => ${title}` ,
            note:newNote
        }
      )
      console.log(`Note create successfully ${newNote}`)
    
    } catch (error) {
        console.log(error)
      res.send(error)
    }
  
    
  
  };

 
// delete one note by id functions
  export const deleteNoteById = async(req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const note = await Note.findOneAndDelete({id})
        if(!note){
            console.log(" Bote not found try again")
            res.status(500).send({ message: ' Note not found'});
            return
        }
        const remainingNote   = await Note.find()
        if(!remainingNote.length){
            res.status(200).send({ message: ' Note deleted successfuly',
                note: 'Note is empty'
                
            })
            return
        }
        res.status(200).send({ message: `Note with Id: ${id} has been deleted`,
            note: remainingNote
            
        });
 return
    } catch (error) {
        res.send(" server error")
    }
 
  };
  