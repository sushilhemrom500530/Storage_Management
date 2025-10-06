import { Router } from "express";
import { FolderControllers } from "./folder.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import {
  createFolderZodSchema,
  updateFolderZodSchema,
} from "./folder.validation";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";

const router = Router();

router.get(
  "/all-folders",
  checkAuth(...Object.values(Role)),
  FolderControllers.getAllFolder
);

router.post(
  "/create",
  checkAuth(...Object.values(Role)),
  validateRequest(createFolderZodSchema),
  FolderControllers.createFolder
);

router.get(
  "/:id",
  checkAuth(...Object.values(Role)),
  FolderControllers.getFolderById
);

router.patch(
  "/:id",
  checkAuth(...Object.values(Role)),
  validateRequest(updateFolderZodSchema),
  FolderControllers.updateFolder
);

router.delete(
  "/delete/:id",
  checkAuth(...Object.values(Role)),
  FolderControllers.deleteFolder
);

export const FolderRoutes = router;
