import express, { Application } from 'express';
import { AppDataSource } from './db/data_source';
import UserRoutes from './Routes/UserRoutes';
import CampRoutes from "./Routes/CampRoutes";


const app: Application = express();
app.use(express.json());

AppDataSource.initialize()
    .then(() => {
        app.use('/api',CampRoutes);
        app.use('/api', UserRoutes);
        app.listen(3000, () => console.log('Server rodando na porta 3000'));
    })
    .catch((error) => console.log(error));