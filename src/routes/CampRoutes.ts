import { Router } from "express";
import { CampeonatoController } from "../controller/CampController";
import { AuthMiddleware } from "../middlewares/AuthMiddlewares";

const router: Router = Router();
const con = new CampeonatoController;

router.get("/campeonato", con.list);
router.post("/campeonato", con.create);
router.delete("/campeonato/:id",AuthMiddleware, con.delete);
router.get("/campeonato/:id",AuthMiddleware, con.show);
router.patch("/campeonato/:id",AuthMiddleware, con.update);

export default router;
