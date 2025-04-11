import { userRouter } from "../modules/user/user.routes";
import { RouterObject } from "../utils/useAllRouter";

export const AllRoutes: RouterObject[] = [
  {
    route: "/api/v1/users",
    router: userRouter,
  },
];
