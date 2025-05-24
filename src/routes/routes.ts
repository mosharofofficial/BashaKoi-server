import { flatRouter } from "../modules/Flat/flat.routes";
import { userRouter } from "../modules/user/user.routes";
import { RouterObject } from "../utils/useAllRouter";

export const AllRoutes: RouterObject[] = [
  {
    route: "/api/v1/users",
    router: userRouter,
  },
  {
    route: "/api/v1/flats",
    router:flatRouter
  }
];
