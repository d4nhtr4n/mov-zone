import Home from "~/pages/Home";
import Viewing from "~/pages/Viewing";
import Watching from "~/pages/Watching";
import Filter from "~/pages/Filter";
import Ranking from "~/pages/Ranking";
import Following from "~/pages/Following";
import Setting from "~/pages/Setting";

import config from "~/config";
import NoNavBarLayout from "~/layouts/NoNavBarLayout";
import Login from "~/pages/Authentication/Login";
import AuthenticationLayout from "~/layouts/AuthenticationLayout";
import Register from "~/pages/Authentication/Register";
import ForgotPassword from "~/pages/Authentication/ForgotPassword";
import ResetPassword from "~/pages/Authentication/ResetPassword";

const publicRoutes = [
    { path: config.routes.default, component: Home },
    { path: config.routes.home, component: Home },

    {
        path: config.routes.login,
        component: Login,
        layout: AuthenticationLayout,
    },

    {
        path: config.routes.register,
        component: Register,
        layout: AuthenticationLayout,
    },
    {
        path: config.routes.forgotPassword,
        component: ForgotPassword,
        layout: AuthenticationLayout,
    },
    {
        path: config.routes.resetPassword,
        component: ResetPassword,
        layout: AuthenticationLayout,
    },

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
