import { category } from "../constant";
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
    getFollowList: (token, cate) => {
        let url;
        if (cate === category.movie) url = `/api/myList/getList/movie`;
        else if (cate === category.tv) url = `/api/myList/getList/series`;
        return axiosClient(token).get(url);
    },
    addFollowItem: (token, cate, id) => {
        let url;
        if (cate === category.movie) url = `/api/myList/addListItem/movie`;
        else if (cate === category.tv) url = `/api/myList/addListItem/series`;
        return axiosClient(token).put(url, {
            id,
        });
    },
    removeFollowItem: (token, cate, id) => {
        let url;
        if (cate === category.movie) url = `/api/myList/deleteListItem/movie`;
        else if (cate === category.tv)
            url = `/api/myList/deleteListItem/series`;
        return axiosClient(token).put(url, {
            id,
        });
    },
    checkFollowItem: (token, cate, id) => {
        let url;
        if (cate === category.movie)
            url = `/api/myList/checkListItem/movie/${id}`;
        else if (cate === category.tv)
            url = `/api/myList/checkListItem/series/${id}`;
        return axiosClient(token).get(url);
    },
};

export default usersApi;
