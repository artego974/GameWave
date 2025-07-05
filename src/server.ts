import express, { Application ,Request, Response } from 'express';
import { AppDataSource } from './config/data-source';
import UserRoutes from './routes/UserRoutes';
import CampRoutes from "./routes/CampRoutes";
import LiveRoutes from "./routes/LiveRoutes"
import GameRoutes from "./routes/GameRoutes";
import cors from "cors";
import path from 'path';


const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      "http://127.0.0.1:5500",
    ],
  })
);

app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
  return;
});


AppDataSource.initialize()
    .then(() => {
        app.use(CampRoutes);
        app.use(UserRoutes);
        app.use(LiveRoutes);
        app.use(GameRoutes)
        app.listen(3000, () => console.log('Server rodando na porta 3000'));
    })
    .catch((error) => console.log(error));