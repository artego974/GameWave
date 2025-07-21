import { Router } from "express";
import { UserController } from "../controller/UserController"
import { AuthMiddleware } from "../middlewares/AuthMiddlewares";
import { upload } from "../middlewares/upload";

const router = Router();
const userController = new UserController();

router.post("/user", userController.create);
router.get("/user",AuthMiddleware, userController.list);
router.get("/user/:id",AuthMiddleware, userController.show);
router.post("/user/name",AuthMiddleware, userController.shew);
router.put("/user/:id",AuthMiddleware, userController.update);
router.delete("/user/:id",AuthMiddleware, userController.delete);
router.patch("/user/updatePassword/:id",AuthMiddleware, userController.updatePassword);
router.patch("/user/updateEmail/:id",AuthMiddleware, userController.updateEmail);
router.post("/user/login", userController.loginUser)
router.post("/user/logout", AuthMiddleware, userController.logoutUser)
router.post("/user/upload/avatar", upload.single("file"), userController.uploadAvatar)

export default router;