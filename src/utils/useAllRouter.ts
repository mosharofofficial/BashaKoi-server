import { Router } from "express";
import { app } from "../app";

export interface RouterObject {
  route: string;
  router: Router;
}

export const useRouters = (routers: RouterObject[]): void => {
  routers.forEach((routerObject) => {
    app.use(routerObject.route, routerObject.router);
  });
};
