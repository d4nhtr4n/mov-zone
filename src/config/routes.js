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
    login: "/login",
    register: "/register",
    forgotPassword: "/forgotpassword",
    resetPassword: "/resetpassword/:token",
};

export default routes;
