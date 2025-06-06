import { Router } from "express";
import { UserController } from "../controller/UserController";

const router = Router();
const userController = new UserController();

router.post("/User", userController.create);
router.get("/User", userController.list);
router.get("/User/:id", userController.show);
router.put("/User/:id", userController.update);
router.delete("/User/:id", userController.delete);

export default router;