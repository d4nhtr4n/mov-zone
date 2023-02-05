import { FooterOnly } from "~/components/Layouts";

import Home from "~/pages/Home";
import Watching from "~/pages/Watching";
import Filter from "~/pages/Filter";
import Ranking from "~/pages/Ranking";
import Following from "~/pages/Following";
import Setting from "~/pages/Setting";

const publicRoutes = [
    { path: "/", component: Home },
    { path: "/watching", component: Watching },
    { path: "/filter", component: Filter },
    { path: "/ranking", component: Ranking },
    { path: "/following", component: Following },
    { path: "/setting", component: Setting },
    { path: "/authen", component: Home, layout: null },
    { path: "/welcome", component: Home, layout: FooterOnly },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
