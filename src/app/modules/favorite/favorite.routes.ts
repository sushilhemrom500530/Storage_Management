import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { FavoriteControllers } from "./favorite.controller";

const router = Router();

router.get(
  "/all-favorites",
  checkAuth(...Object.values(Role)),
  FavoriteControllers.getAllFavorite
);

router.post(
  "/create",
  checkAuth(...Object.values(Role)),
  FavoriteControllers.createFavorite
);

router.get(
  "/:id",
  checkAuth(...Object.values(Role)),
  FavoriteControllers.getFavoriteById
);

router.delete(
  "/delete/:id",
  checkAuth(...Object.values(Role)),
  FavoriteControllers.deleteFavorite
);

export const FavoriteRoutes = router;
