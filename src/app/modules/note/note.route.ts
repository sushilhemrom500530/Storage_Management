import { Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { NoteControllers } from "./note.controller";
import { createNoteZodSchema, updateNoteZodSchema } from "./note.validation";

const router = Router();

router.get("/all-notes", NoteControllers.getAllNotes);

router.post(
  "/create",
  validateRequest(createNoteZodSchema),
  NoteControllers.createNote
);

router.get("/:id", NoteControllers.getNoteById);

router.patch(
  "/:id",
  validateRequest(updateNoteZodSchema),
  NoteControllers.updateNode
);

router.delete("/delete/:id", NoteControllers.deleteNote);

export const NoteRoutes = router;
