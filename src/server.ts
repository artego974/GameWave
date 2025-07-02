import express, { Application } from 'express';
import { AppDataSource } from './config/data-source';
import UserRoutes from './routes/UserRoutes';
import CampRoutes from "./routes/CampRoutes";
import LiveRoutes from "./routes/LiveRoutes"


const app: Application = express();
app.use(express.json());

AppDataSource.initialize()
    .then(() => {
        app.use(CampRoutes);
        app.use(UserRoutes);
        app.use(LiveRoutes);
        app.listen(3000, () => console.log('Server rodando na porta 3000'));
    })
    .catch((error) => console.log(error));