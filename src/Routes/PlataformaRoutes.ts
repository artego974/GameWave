import { Router } from "express";
import { plataformaController } from "../controller/PlataformaController";
const router: Router = Router();
const plataforma = new plataformaController;

router.get("/plataforma", plataforma.list);
router.post("/plataforma", plataforma.create);
router.delete("/plataforma/:id", plataforma.delete);
router.get("/plataforma/:id", plataforma.show);
router.put("/plataforma/:id", plataforma.update);

export default router;