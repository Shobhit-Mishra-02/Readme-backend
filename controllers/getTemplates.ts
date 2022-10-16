import { Request, Response } from "express";
import fs from "fs";
import tempConnector from "../templates/tempConnector";

// write your controllers here...

export const getTemplates = (req: Request, res: Response) => {
  const templates = tempConnector.allTemplate.map((template) => {
    return {
      title: template.title,
      fileData: fs.readFileSync("./templates/" + template.file, "utf-8"),
      fileName: template.file,
    };
  });

  res.status(200).json(templates);
};
