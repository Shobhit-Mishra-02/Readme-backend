import { Request, Response } from "express";

// write your controllers here...

export const getTemplates = (req: Request, res: Response) => {
  res.status(200).json({
    message: "Hi",
  });
};
