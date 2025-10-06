import httpStatus from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { Note } from "./note.model";
import { TNote } from "./note.interface";

const getAllNotes = async (query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(Note.find(), query);
  const usersData = queryBuilder
    .filter()
    .search(["title", "content"])
    .sort()
    .fields()
    .paginate();

  const [data, meta] = await Promise.all([
    usersData.build(),
    queryBuilder.getMeta(),
  ]);

  return {
    data,
    meta,
  };
};

const createNote = async (payload: Partial<TNote>) => {
  const create = await Note.create(payload);

  return create;
};

const getNoteById = async (id: string) => {
  const note = await Note.findById(id);
  if (!note) {
    throw new AppError(httpStatus.BAD_REQUEST, "Note not found");
  }

  return note;
};

const updatedNote = async (updatedId: string, payload: Partial<TNote>) => {
  const note = await Note.findById(updatedId);
  if (!note) {
    throw new AppError(httpStatus.BAD_REQUEST, "Note not found");
  }

  const updatedNote = await Note.findByIdAndUpdate(updatedId, payload, {
    new: true,
    runValidators: true,
  });

  return updatedNote;
};

const deleteNote = async (id: string) => {
  const note = await Note.findById(id);
  if (!note) {
    throw new AppError(httpStatus.NOT_FOUND, "Note not found");
  }

  const deletedNote = await Note.findByIdAndDelete(id);

  return deletedNote;
};

export const NoteService = {
  getAllNotes,
  createNote,
  getNoteById,
  updatedNote,
  deleteNote,
};
