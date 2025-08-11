import { Router } from "express";
import { liveController } from "../controller/LiveController";
import { AuthMiddleware } from "../middlewares/AuthMiddlewares";
import { upload } from "../middlewares/upload";
const router: Router = Router();
const live = new liveController;

router.get("/live", live.list);
router.post("/live", live.create);
router.delete("/live/:id",AuthMiddleware, live.delete);
router.get("/live/:id",AuthMiddleware, live.show);
router.put("/live/:id",AuthMiddleware, live.update);
router.put("/live/upload/banner/:id", upload.single("file"), live.uploadBanner)

export default router;