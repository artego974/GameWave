import { Router } from "express";
import { UserController } from "../controller/UserController"

const router = Router();
const userController = new UserController();

router.post("/user", userController.create);
router.get("/user", userController.list);
router.get("/user/:id", userController.show);
router.post("/user/name", userController.shew);
router.put("/user/:id", userController.update);
router.delete("/user/:id", userController.delete);
router.patch("/user/updatePassword/:id", userController.updatePassword);
router.patch("/user/updateEmail/:id", userController.updateEmail);

export default router;
