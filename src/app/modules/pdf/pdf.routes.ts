import { Router } from "express";
import { fileUploader } from "../../utils/fileUploader";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { PdfControllers } from "./pdf.controller";

const router = Router();

router.get(
  "/all-pdfs",
  checkAuth(...Object.values(Role)),
  PdfControllers.getAllIPdf
);

router.post(
  "/create",
  checkAuth(...Object.values(Role)),
  fileUploader.upload.single("file"),
  PdfControllers.createPdf
);

router.get(
  "/:id",
  checkAuth(...Object.values(Role)),
  PdfControllers.getPdfById
);

router.patch(
  "/:id",
  checkAuth(...Object.values(Role)),
  fileUploader.upload.single("file"),
  PdfControllers.updatePdf
);

router.delete(
  "/delete/:id",
  checkAuth(...Object.values(Role)),
  PdfControllers.deletePdf
);

export const PdfRoutes = router;
