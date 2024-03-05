import express, { Request, Response } from "express";
import { getProperties } from "./controllers/index";

const PORT = 3001;

const app = express();
app.use(express.json());

app.get("/properties", (req: Request, res: Response) => {
    const data = getProperties();
    return res.status(200).json(data);
});

/* this will always fail. used to test error handling by the callee */
app.get('/badproperties', (req, res) => {
  setTimeout(() => {
    res.status(400).send('Bad Request');
  }, 500); // 500ms delay
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

export default app;
