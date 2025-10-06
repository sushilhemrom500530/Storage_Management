import { Router } from "express";
import { ImageControllers } from "./image.controller";
import { fileUploader } from "../../utils/fileUploader";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";

const router = Router();

router.get(
  "/all-images",
  checkAuth(...Object.values(Role)),
  ImageControllers.getAllImages
);

router.post(
  "/create",
  checkAuth(...Object.values(Role)),
  fileUploader.upload.single("file"),
  ImageControllers.createImage
);

router.get(
  "/:id",
  checkAuth(...Object.values(Role)),
  ImageControllers.getImageById
);

router.patch(
  "/:id",
  checkAuth(...Object.values(Role)),
  fileUploader.upload.single("file"),
  ImageControllers.updateImage
);

router.delete("/delete/:id", ImageControllers.deleteImage);

export const ImageRoutes = router;
