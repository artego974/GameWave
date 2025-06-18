import { Router } from "express";
import { liveController } from "../controller/LiveController";
const router: Router = Router();
const live = new liveController;

router.get("/live", live.list);
router.post("/live", live.create);
router.delete("/live/:id", live.delete);
router.get("/live/:id", live.show);
router.put("/live/:id", live.update);

export default router;