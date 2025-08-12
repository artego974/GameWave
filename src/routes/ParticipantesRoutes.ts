import { Router } from "express";
import { participanteController } from "../controller/ParticipantesController";
import { AuthMiddleware } from "../middlewares/AuthMiddlewares";
const router: Router = Router();
const participantes = new participanteController();

router.post("/participantes", participantes.entryCamp);
router.delete("/parcipantes/:id",AuthMiddleware, participantes.sairCamp);

export default router;