import { Router } from "express";
import { UserController } from "../controller/UserController"

const router = Router();
const userController = new UserController();

router.post("/user", userController.create);
router.get("/user", userController.list);
router.get("/user/:id", userController.show);
router.put("/user/:id", userController.update);
router.delete("/user/:id", userController.delete);

export default router;