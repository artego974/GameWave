import express, { Application, Request, Response } from 'express';
import { AppDataSource } from './config/data-source';
import cors from 'cors';
import path from 'path';

// Rotas
import UserRoutes from "./routes/UserRoutes";
import CampRoutes from "./routes/CampRoutes";
import PlataformaRoutes from "./routes/PlataformaRoutes";
import GameRoutes from "./routes/GameRoutes";
import LiveRoutes from "./routes/LiveRoutes";
import ParticipantesRoutes from "./routes/ParticipantesRoutes";

//import helmet from 'helmet';

const app: Application = express();

/**

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https://www.gstatic.com", "https://translate.googleapis.com"],
      styleSrc: ["'self'", "https://www.gstatic.com", "https://fonts.googleapis.com", "'unsafe-inline'"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https://www.gstatic.com"],
      connectSrc: ["'self'", "https://translate.googleapis.com"],
    },
  })
);

  */

 

// CORS precisa vir antes de tudo
app.use(
  cors({
    origin: [
      "http://127.0.0.1:5500", // Seu frontend
      "http://localhost:5500",
      "http://localhost:3000",// Alternativa
      "http://127.0.0.1:3000"
    ],
    credentials: true
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get("/", (req: Request, res: Response) => {
  res.status(200).sendFile(path.join(__dirname, '../public/index.html'));
});

// Inicializa o banco e as rotas
AppDataSource.initialize()
  .then(() => {
    app.use(CampRoutes);
    app.use(UserRoutes);
    app.use(LiveRoutes);
    app.use(GameRoutes);
    app.use(PlataformaRoutes);
    app.use(ParticipantesRoutes);

    app.listen(3000, () => console.log('Server rodando na porta 3000'));
  })
  .catch((error) => console.log(error));
