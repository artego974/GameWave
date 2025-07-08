import { Router } from "express";
import { participanteController } from "../controller/ParticipantesController";
const router: Router = Router();
const participantes = new participanteController();

router.post("/participantes", participantes.entryCamp);
router.delete("/parcipantes/:id", participantes.sairCamp);

export default router;