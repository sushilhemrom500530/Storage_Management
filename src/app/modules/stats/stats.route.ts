import express from "express";
// import { checkAuth } from "../../middlewares/checkAuth";
// import { Role } from "../user/user.interface";
import { StatsController } from "./stats.controller";

const router = express.Router();

router.get(
  "/",
  // checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  StatsController.getStats
);

export const StatsRoutes = router;
