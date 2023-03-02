import classNames from "classnames/bind";
import React, { Suspense } from "react";
import { Container } from "react-bootstrap";
import { tmdbApi } from "~/api";
import { category } from "~/api/tmdbAPI/constant";

import BackdropSlider from "~/components/BackdropSlider/BackdropSlider";
import style from "./Home.module.scss";

const cx = classNames.bind(style);

const LazyPosterCardList = React.lazy(() =>
    import("~/components/PosterCardList")
);

const list = [
    {
        media_type: category.movie,
        title: "Trending Movies",
        api: () =>
            tmdbApi.getTrendingList(category.movie, {
                params: {},
            }),
    },
    {
        media_type: category.tv,

        title: "Trending TVs",
        api: () =>
            tmdbApi.getTrendingList(category.tv, {
                params: {},
            }),
    },
    {
        media_type: category.movie,

        title: "Popular Movies",
        api: () =>
            tmdbApi.getPopular(category.movie, {
                params: {},
            }),
    },
    {
        media_type: category.tv,

        title: "Popular TVs",
        api: () =>
            tmdbApi.getPopular(category.tv, {
                params: {},
            }),
    },
    {
        media_type: category.movie,

        title: "Top Rated Movies",
        api: () =>
            tmdbApi.getTopRated(category.movie, {
                params: {},
            }),
    },
    {
        media_type: category.tv,

        title: "Top Rated TVs",
        api: () =>
            tmdbApi.getTopRated(category.tv, {
                params: {},
            }),
    },
    {
        media_type: category.movie,

        title: "Highest-grossing Movies ",
        api: () =>
            tmdbApi.discover(category.movie, {
                params: { sort_by: "revenue.desc" },
            }),
    },
    {
        media_type: category.movie,

        title: "Movies on The Theater Now",
        api: () =>
            tmdbApi.getNowPlayingMovies({
                params: {},
            }),
    },
    {
        media_type: category.tv,

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
            <Container className={cx("list-group-wrapper")}>
                <div className={cx("list-group")}>
                    {list.map((item, index) => (
                        <Suspense key={index} fallback={<></>}>
                            <LazyPosterCardList key={index} data={item} />
                        </Suspense>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default Home;
