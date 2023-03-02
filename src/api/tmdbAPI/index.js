import axiosClient from "./axiosClient";
import { category, movieType, tvType } from "./constant";

const tmdbApi = {
    getTrendingList: (category, params) => {
        const url = `trending/${category}/week`;
        return axiosClient.get(url, params);
    },
    getPopular: (category, params) => {
        const url = `/${category}/popular`;
        return axiosClient.get(url, params);
    },
    getTopRated: (category, params) => {
        const url = `/${category}/top_rated`;
        return axiosClient.get(url, params);
    },
    getNowPlayingMovies: (params) => {
        const url = `/movie/now_playing`;
        return axiosClient.get(url, params);
    },
    getOnTheAirTVs: (params) => {
        const url = `/tv/on_the_air`;
        return axiosClient.get(url, params);
    },
    getMoviesList: (type, params) => {
        const url = `movie/${movieType[type]}`;
        return axiosClient.get(url, params);
    },
    getTvList: (type, params) => {
        const url = `tv/${tvType[type]}`;
        return axiosClient.get(url, params);
    },
    getVideos: (cate, id) => {
        const url = `${category[cate]}/${id}/videos`;
        return axiosClient.get(url, { params: {} });
    },
    search: (cate, params) => {
        const url = `search/${category[cate]}`;
        return axiosClient.get(url, params);
    },
    discover: (cate, params) => {
        const url = `discover/${category[cate]}`;
        return axiosClient.get(url, params);
    },
    getDetail: (cate, id, params) => {
        const url = `${category[cate]}/${id}`;
        return axiosClient.get(url, params);
    },
    getCredits: (cate, id) => {
        const url = `${category[cate]}/${id}/credits`;
        return axiosClient.get(url, { params: {} });
    },
    getMovieCollection: (id) => {
        const url = `collection/${id}`;
        return axiosClient.get(url, { params: {} });
    },
    getSimilar: (cate, id) => {
        const url = `${category[cate]}/${id}/similar`;
        return axiosClient.get(url, { params: {} });
    },
    getRecommendations: (cate, id) => {
        const url = `${category[cate]}/${id}/recommendations`;
        return axiosClient.get(url, { params: {} });
    },
    getTVSeasons: (id, season_number) => {
        const url = `tv/${id}/season/${season_number}`;
        return axiosClient.get(url, { params: {} });
    },

    getGenres: (cate = category.movie) => {
        const url = `/genre/${cate}/list`;
        return axiosClient.get(url, { params: {} });
    },
    getOriginalImage: (imgPath) =>
        `https://image.tmdb.org/t/p/original/${imgPath}`,
    getW500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
    getW200Image: (imgPath) => `https://image.tmdb.org/t/p/w200/${imgPath}`,
};

export default tmdbApi;
