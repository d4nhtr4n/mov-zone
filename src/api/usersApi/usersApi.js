import axiosClient from "./axiosClient";

const usersApi = {
    login: (email, password) => {
        const url = `/api/auth/login`;
        return axiosClient().post(url, {
            email,
            password,
        });
    },
    register: (username, email, password) => {
        const url = `/api/auth/register`;
        return axiosClient().post(url, {
            username,
            email,
            password,
        });
    },
    forgotPassword: (email) => {
        const url = `/api/auth/forgotpassword`;
        return axiosClient().post(url, {
            email,
        });
    },
    resetPassword: (password, token) => {
        const url = `/api/auth/resetpassword/${token}`;
        return axiosClient().put(url, {
            password,
        });
    },

    getMyProfile: (token) => {
        const url = `/api/myProfile/getProfile`;
        return axiosClient(token).get(url);
    },
    getMovieList: (token) => {
        const url = `/api/myList/getList/movie`;
        return axiosClient(token).get(url);
    },
};

export default usersApi;
