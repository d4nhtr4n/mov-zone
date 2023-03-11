import classNames from "classnames/bind";
import React, { Suspense } from "react";
import { Container } from "react-bootstrap";
import { tmdbApi } from "~/api";
import { category } from "~/api/constant";

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
        description: "The most talked-about movies right now.",
        api: () =>
            tmdbApi.getTrendingList(category.movie, {
                params: {},
            }),
    },
    {
        media_type: category.tv,
        title: "Trending TVs",
        description: "The hottest TV shows of the moment.",
        api: () =>
            tmdbApi.getTrendingList(category.tv, {
                params: {},
            }),
    },
    {
        media_type: category.movie,
        title: "Popular Movies",
        description:
            "Get swept up in the hype surrounding the most popular movies.",
        api: () =>
            tmdbApi.getPopular(category.movie, {
                params: {},
            }),
    },
    {
        media_type: category.tv,
        title: "Popular TVs",
        description: "Join us on a journey through the most popular TV shows.",
        api: () =>
            tmdbApi.getPopular(category.tv, {
                params: {},
            }),
    },
    {
        media_type: category.movie,
        title: "Top Rated Movies",
        description: "Explore the highest-rated movies of all time.",
        api: () =>
            tmdbApi.getTopRated(category.movie, {
                params: {},
            }),
    },
    {
        media_type: category.tv,
        title: "Top Rated TVs",
        description:
            "Discover the most critically acclaimed and beloved TV shows",
        api: () =>
            tmdbApi.getTopRated(category.tv, {
                params: {},
            }),
    },
    {
        media_type: category.movie,
        title: "Highest-grossing Movies ",
        description:
            "Join us on a journey through the highest-grossing movies.",
        api: () =>
            tmdbApi.discover(category.movie, {
                params: { sort_by: "revenue.desc" },
            }),
    },
    {
        media_type: category.movie,
        title: "Movies on The Theater Now",
        description:
            "Stay up-to-date with the latest movies hitting the big screen right now.",
        api: () =>
            tmdbApi.getNowPlayingMovies({
                params: {},
            }),
    },
    {
        media_type: category.tv,
        title: "TVs on The Air",
        description:
            "Stay in the loop with the latest and greatest TV shows currently on the air.",
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
