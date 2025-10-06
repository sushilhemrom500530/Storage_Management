import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { validateRequest } from "../../middlewares/validateRequest";
import { UserControllers } from "./user.controller";
import { Role } from "./user.interface";
import { createUserZodSchema, updateUserZodSchema } from "./user.validation";

const router = Router();

router.post(
  "/register",
  validateRequest(createUserZodSchema),
  UserControllers.createUser
);
router.get(
  "/all-users",
  checkAuth(...Object.values(Role)),
  UserControllers.getAllUsers
);

router.get("/me", checkAuth(...Object.values(Role)), UserControllers.getMe);

router.get(
  "/:id",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN, Role.USER),
  UserControllers.getSingleUser
);

router.delete(
  "/delete/:id",
  checkAuth(...Object.values(Role)),
  UserControllers.deletedUserFromDB
);
router.patch(
  "/soft-delete/:id",
  checkAuth(...Object.values(Role)),
  UserControllers.softDeletedUser
);

router.patch(
  "/:id",
  validateRequest(updateUserZodSchema),
  checkAuth(...Object.values(Role)),
  UserControllers.updateUser
);

export const UserRoutes = router;
