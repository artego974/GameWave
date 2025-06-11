import { Router } from "express";
import { CampeonatoController } from "../controller/CampController";
const router: Router = Router();
const con = new CampeonatoController;

router.get("/campeonato", con.list);
router.post("/campeonato", con.create);
router.delete("/campeonato/:id", con.delete);
router.get("/campeonato/:id", con.show);
router.put("/campeonato/:id", con.update);

export default router;