import { Router } from "express";
import { UserController } from "../controller/UserController"
// import {  } from "../middlewares/s";
import { upload } from "../middlewares/upload";

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
router.post("/user/login", userController.loginUser)
router.post("/user/logout",  userController.logoutUser)
router.put("/user/upload/avatar/:id", upload.single("file"), userController.uploadAvatar)
router.put("/user/upload/banner/:id", upload.single("file"), userController.uploadBanner)
router.get("/user/profile",  userController.profile);



export default router;