import express, { Application } from 'express';
import { AppDataSource } from './config/data-source';
import UserRoutes from "./routes/UserRoutes"
import CampRoutes from "./routes/CampRoutes";
import PlataformaRoutes from "./routes/PlataformaRoutes";
import GameRoutes from "./routes/GameRoutes";
import LiveRoutes from "./routes/LiveRoutes";
import { Response, Request } from "express";
import cors from "cors";
import path from "path";

const app: Application = express();
app.use(express.json());

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: ['http://localhost:5500', "http://127.0.0.1:5500", "http://localhost:3000", "http://127.0.0.1:3000"]
}))

app.use(express.static('public'));

app.get("/", (req: Request, res: Response) => {
    res.status(200).sendFile(path.join("../public/index.html"));
    return;
})

AppDataSource.initialize().then(() => {
        app.use("/api",LiveRoutes);
        app.use("/api",GameRoutes);
        app.use("/api",PlataformaRoutes);
        app.use('/api',CampRoutes);
        app.use('/api', UserRoutes);
        app.listen(3000, () => console.log('Server rodando na porta 3000'));
    })
    .catch((error) => console.log(error));