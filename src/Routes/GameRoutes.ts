import { Router } from "express";
import { GameController } from "../controller/GameController";
const router: Router = Router();
const game = new GameController;

router.get("/game", game.list);
router.post("/game", game.create);
router.delete("/game/:id", game.delete);
router.get("/game/:id", game.show);
router.put("/game/:id", game.update);

export default router;