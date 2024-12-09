import fs from 'fs';
import path from 'path';
import { Request, Response } from "express";

export const addRegistry = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { name, quantity, date } = req.body;
    if (!name || !quantity || !date) {
        res.status(400).send('Missing required fields');
    }

   
    const newEntry = `"${name}",${quantity},${date}\n`;
    const filePath = path.join(__dirname, '../../public/dataset/MedicamentsDataset.csv');

    fs.appendFile(filePath, newEntry, (err) => {
        if (err) {
            return res.status(500).send('Failed to write to file');
        }
        res.status(200).send('Entry added successfully');
    });
};

