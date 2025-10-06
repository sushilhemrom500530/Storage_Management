import { Router } from "express";
import { FolderControllers } from "./folder.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import {
  createFolderZodSchema,
  updateFolderZodSchema,
} from "./folder.validation";

const router = Router();

router.get("/all-folders", FolderControllers.getAllFolder);

router.post(
  "/create",
  validateRequest(createFolderZodSchema),
  FolderControllers.createFolder
);

router.get("/:id", FolderControllers.getFolderById);

router.patch(
  "/:id",
  validateRequest(updateFolderZodSchema),
  FolderControllers.updateFolder
);

router.delete("/delete/:id", FolderControllers.deleteFolder);

export const FolderRoutes = router;
