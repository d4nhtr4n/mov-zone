import Home from "~/pages/Home";
import Viewing from "~/pages/Viewing";
import Watching from "~/pages/Watching";
import Filter from "~/pages/Filter";
import Ranking from "~/pages/Ranking";
import Following from "~/pages/Following";
import Setting from "~/pages/Setting";

import config from "~/config";
import NoNavBarLayout from "~/layouts/NoNavBarLayout";

const publicRoutes = [
    { path: config.routes.default, component: Home },
    { path: config.routes.home, component: Home },
    { path: config.routes.viewingTracking, component: Viewing },
    { path: config.routes.viewing, component: Viewing },
    {
        path: config.routes.watchDefault,
        component: Watching,
        layout: NoNavBarLayout,
    },
    {
        path: config.routes.watchTv,
        component: Watching,
        layout: NoNavBarLayout,
    },
    { path: config.routes.filter, component: Filter },
    { path: config.routes.ranking, component: Ranking },
    { path: config.routes.following, component: Following },
    { path: config.routes.setting, component: Setting },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
