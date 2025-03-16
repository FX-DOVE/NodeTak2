import { Request, Response, NextFunction } from "express";

const validateNote = (req: Request, res: Response, next: NextFunction) => {
  const { title, content, category } = req.body;
  if (!title || !content || !category) {
    return res.status(400).json({ message: "Title, content, and category are required" });
  }
  next();
};

export default validateNote;
