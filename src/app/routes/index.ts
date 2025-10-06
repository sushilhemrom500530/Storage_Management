import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
// import { StatsRoutes } from "../modules/stats/stats.route";
import { UserRoutes } from "../modules/user/user.route";
import { FolderRoutes } from "../modules/folder/folder.routes";
import { NoteRoutes } from "../modules/note/note.route";
import { ImageRoutes } from "../modules/image/image.routes";
import { PdfRoutes } from "../modules/pdf/pdf.routes";

export const router = Router();

const moduleRoutes = [
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/folder",
    route: FolderRoutes,
  },
  {
    path: "/note",
    route: NoteRoutes,
  },
  {
    path: "/image",
    route: ImageRoutes,
  },
  {
    path: "/pdf",
    route: PdfRoutes,
  },
  //   {
  //     path: "/stats",
  //     route: StatsRoutes,
  //   },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
