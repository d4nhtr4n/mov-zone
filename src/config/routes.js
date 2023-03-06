const routes = {
    default: "/*",
    home: "/",
    viewingTracking: "/view",
    viewing: "/view/:type/:id",
    watchDefault: "/watch/:type/:id",
    watchTv: "/watch/:type/:id/:season/:episode",
    filter: "/filter",
    ranking: "/ranking",
    following: "/following",
    setting: "/setting",

    // /authen
    // /welcome
};

export default routes;
