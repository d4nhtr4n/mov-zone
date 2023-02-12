import Home from "~/pages/Home";
import Movie from "~/pages/Movie";
import Filter from "~/pages/Filter";
import Ranking from "~/pages/Ranking";
import Following from "~/pages/Following";
import Setting from "~/pages/Setting";

import config from "~/config";

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.movie, component: Movie },
    { path: config.routes.filter, component: Filter },
    { path: config.routes.ranking, component: Ranking },
    { path: config.routes.following, component: Following },
    { path: config.routes.setting, component: Setting },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };