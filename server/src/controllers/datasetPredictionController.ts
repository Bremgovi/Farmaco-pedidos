import { Request, Response } from "express";
import axios from 'axios';


export const makePrediction = async (
    req: Request, 
    res: Response): Promise<void> => {
      console.log("Making prediction...");
      try {
          const flaskServerURL = "http://localhost:5000/predict"; // Flask endpoint
      
          // Send a POST request to Flask with no data (empty body)
          const response = await axios.post(flaskServerURL, {});
          console.log("Flask server response:", response.data);
          // Send Flask's response back to the client
          res.status(200).json({
            message: "Flask server responded successfully",
            data: response.data,
          });
        } catch (error) {
          console.error("Error calling Flask server:", (error as any).message);
          res.status(500).json({ error });
        }
  }