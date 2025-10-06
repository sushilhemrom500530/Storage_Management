import express from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { StatsController } from "./stats.controller";

const router = express.Router();

router.get("/", checkAuth(...Object.values(Role)), StatsController.getStats);

router.get(
  "/filtered",
  checkAuth(...Object.values(Role)),
  StatsController.getFiltered
);
router.get(
  "/recent",
  checkAuth(...Object.values(Role)),
  StatsController.getRecentData
);

export const StatsRoutes = router;
