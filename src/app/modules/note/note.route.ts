import { Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { NoteControllers } from "./note.controller";
import { createNoteZodSchema, updateNoteZodSchema } from "./note.validation";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";

const router = Router();

router.get(
  "/all-notes",
  checkAuth(...Object.values(Role)),
  NoteControllers.getAllNotes
);

router.post(
  "/create",
  checkAuth(...Object.values(Role)),
  validateRequest(createNoteZodSchema),
  NoteControllers.createNote
);

router.get(
  "/:id",
  checkAuth(...Object.values(Role)),
  NoteControllers.getNoteById
);

router.patch(
  "/:id",
  checkAuth(...Object.values(Role)),
  validateRequest(updateNoteZodSchema),
  NoteControllers.updateNode
);

router.delete(
  "/delete/:id",
  checkAuth(...Object.values(Role)),
  NoteControllers.deleteNote
);

export const NoteRoutes = router;
