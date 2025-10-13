import { Router } from "express";
import { userController } from "./user.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "./user.interface";

const router = Router();

router.post("/register", userController.createUser);
router.patch(
  "/:id",
  checkAuth(...Object.values(Role)),
  userController.updateUser
);
router.get("/", checkAuth("ADMIN"), userController.getAllUser);
router.get("/me", checkAuth(...Object.values(Role)), userController.getMe);

export const userRouter = router;
