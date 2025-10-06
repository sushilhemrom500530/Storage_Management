/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import { formatSize } from "../../utils/formateSize";
import { Folder } from "../folder/folder.model";
import { Note } from "../note/note.model";
import { Image } from "../image/image.model";
import { Pdf } from "../pdf/pdf.model";

const USER_STORAGE_LIMIT_BYTES = 15 * 1024 * 1024 * 1024; // 15 GB

const getStats = async (): Promise<any> => {
  const db = mongoose.connection.db;

  if (!db) {
    throw new Error("MongoDB connection not established");
  }

  const collections = ["folders", "notes", "images", "pdfs"];

  const statsPerCollection = await Promise.all(
    collections.map(async (name) => {
      const collStats = await db.command({ collStats: name });

      const totalBytes =
        (collStats.size || 0) + (collStats.totalIndexSize || 0);

      return {
        name: name.charAt(0).toUpperCase() + name.slice(1, -1),
        totalItems: collStats.count,
        storageBytes: totalBytes, // store total bytes including index
      };
    })
  );

  const totalUsedBytes = statsPerCollection.reduce(
    (acc, item) => acc + item.storageBytes,
    0
  );

  const formattedStats = statsPerCollection.map((item) => ({
    name: item.name,
    totalItems: item.totalItems,
    storage: formatSize(item.storageBytes),
  }));

  const totalStorage = formatSize(USER_STORAGE_LIMIT_BYTES);
  const usedStorage = formatSize(totalUsedBytes);
  const availableStorage = formatSize(
    USER_STORAGE_LIMIT_BYTES - totalUsedBytes
  );

  return {
    perCollection: formattedStats,
    totalStorage,
    usedStorage,
    availableStorage,
  };
};

const getFiltered = async (filters: Record<string, any> = {}): Promise<any> => {
  const query: any = {};

  if (filters.date) {
    const date = new Date(filters.date);
    const nextDay = new Date(date);
    nextDay.setDate(date.getDate() + 1);

    query.createdAt = {
      $gte: date,
      $lt: nextDay,
    };
  }

  if (filters.name) {
    query.name = { $regex: filters.name, $options: "i" };
  }

  if (filters.folderId) {
    query.parentFolder = filters.folderId;
  }

  const [folders, notes, images, pdfs] = await Promise.all([
    Folder.find(query),
    Note.find(query),
    Image.find(query),
    Pdf.find(query),
  ]);

  return {
    totalItems: folders.length + notes.length + images.length + pdfs.length,
    data: {
      folders,
      notes,
      images,
      pdfs,
    },
  };
};

export const StatsService = {
  getStats,
  getFiltered,
};
