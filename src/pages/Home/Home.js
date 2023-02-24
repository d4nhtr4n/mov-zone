import classNames from "classnames/bind";
import { tmdbApi } from "~/api";
import { category } from "~/api/tmdbAPI/constant";

import BackdropSlider from "~/components/BackdropSlider/BackdropSlider";
import PosterCardList from "~/components/PosterCardList";
import style from "./Home.module.scss";

const cx = classNames.bind(style);

const list = [
    {
        title: "Trending Movies",
        api: () =>
            tmdbApi.getTrendingList(category.movie, {
                params: {},
            }),
    },
    {
        title: "Trending TVs",
        api: () =>
            tmdbApi.getTrendingList(category.tv, {
                params: {},
            }),
    },
    {
        title: "Popular Movies",
        api: () =>
            tmdbApi.getPopular(category.movie, {
                params: {},
            }),
    },
    {
        title: "Popular TVs",
        api: () =>
            tmdbApi.getPopular(category.tv, {
                params: {},
            }),
    },
    {
        title: "Top Rated Movies",
        api: () =>
            tmdbApi.getTopRated(category.movie, {
                params: {},
            }),
    },
    {
        title: "Top Rated TVs",
        api: () =>
            tmdbApi.getTopRated(category.tv, {
                params: {},
            }),
    },
    {
        title: "Highest-grossing Movies ",
        api: () =>
            tmdbApi.discover(category.movie, {
                params: { sort_by: "revenue.desc" },
            }),
    },
    {
        title: "Movies on The Theater Now",
        api: () =>
            tmdbApi.getNowPlayingMovies({
                params: {},
            }),
    },
    {
        title: "TVs on The Air",
        api: () =>
            tmdbApi.getOnTheAirTVs({
                params: {},
            }),
    },
];

function Home() {
    return (
        <div className={cx("wrapper")}>
            <BackdropSlider />
            <div className={cx("list-group-wrapper")}>
                <div className={cx("list-group")}>
                    {list.map((item, index) => (
                        <PosterCardList key={index} data={item} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;
