/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import { formatSize } from "../../utils/formateSize";

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

export const StatsService = {
  getStats,
};
