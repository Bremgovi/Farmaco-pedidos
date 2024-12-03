import { Request, Response } from "express";
import axios from 'axios';

export const fetchJson = async (req: Request, res: Response) => {
    const { year, month } = req.params;
    console.log(req.params);
    try {
        const response = await axios.get(`http://localhost:5000/json/${year}/${month}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({error: (error as any).message});
    }
};

