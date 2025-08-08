import { Router } from "express";
import { CampeonatoController } from "../controller/CampController";
import { AuthMiddleware } from "../middlewares/AuthMiddlewares";
import { upload } from "../middlewares/upload";

const router: Router = Router();
const con = new CampeonatoController;

router.get("/campeonato", con.list);
router.post("/campeonato", con.create);
router.delete("/campeonato/:id",AuthMiddleware, con.delete);
router.get("/campeonato/:id",AuthMiddleware, con.show);
router.post("campeonato/nome",AuthMiddleware, con.shew );
router.patch("/campeonato/:id",AuthMiddleware, con.update);
router.put("/campeonato/upload/banner/:id", upload.single("file"), con.uploadBanner)

export default router;