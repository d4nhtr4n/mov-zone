import React, { Suspense, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { tmdbApi } from "~/api";
import Image from "~/components/Image";
import PosterCard from "~/components/PosterCard";

import classNames from "classnames/bind";
import style from "./Related.module.scss";
import FallBack from "~/components/FallBack";
import images from "~/assets/images";
import Button from "~/components/Button";

const LazyPosterCardList = React.lazy(() =>
    import("~/components/PosterCardList")
);

const cx = classNames.bind(style);

function Related({ data }) {
    // Check 3 list (collection, related, recommend)
    const [haveSimilar, setHaveSimilar] = useState(true);
    const [haveRecommend, setHaveRecommend] = useState(true);

    const [list, setList] = useState();
    const [collection, setCollection] = useState(null);

    useEffect(() => {
        setList([
            {
                media_type: data.media_type,
                title: "Similars",
                description:
                    "Explore movies that are similar in theme, genre, or style to your favorites.",
                api: () => tmdbApi.getSimilar(data.media_type, data.id),
                onFail: () => {
                    setHaveSimilar(false);
                },
                onSuccess: () => {
                    setHaveSimilar(true);
                },
            },
            {
                media_type: data.media_type,
                title: "Recommendations",
                description:
                    "Let us recommend movies tailored to your interests and taste.",
                api: () => tmdbApi.getRecommendations(data.media_type, data.id),
                onFail: () => {
                    setHaveRecommend(false);
                },
                onSuccess: () => {
                    setHaveRecommend(true);
                },
            },
        ]);

        if (data.belongs_to_collection) {
            (async function handlegetMovieCollections() {
                const response = await tmdbApi.getMovieCollection(
                    data.belongs_to_collection.id
                );
                let result = response;

                setCollection(result);
            })();
        } else {
            setCollection(null);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    return collection || haveSimilar || haveRecommend ? (
        <div className={cx("wrapper")}>
            {collection && (
                <div
                    className={cx("collection-wrapper")}
                    style={{
                        backgroundImage: `url(${tmdbApi.getOriginalImage(
                            collection.backdrop_path
                        )})`,
                        backgroundSize: "cover",
                        width: "100%",
                    }}
                >
                    <div className={cx("collection-inner")}>
                        <div className={cx("collection-info")}>
                            <Image
                                className={cx("collection-poster")}
                                src={tmdbApi.getW200Image(
                                    collection.poster_path
                                )}
                            />
                            <div className={cx("collection-detail")}>
                                <h1>{collection.name}</h1>
                                <p>{collection.overview}</p>
                            </div>
                        </div>
                        <Swiper
                            className={cx("collection-slider")}
                            direction="horizontal"
                            slidesPerView={5}
                            spaceBetween={24}
                            breakpoints={{
                                0: {
                                    slidesPerView: 1.5,
                                    spaceBetween: 12,
                                },
                                576: {
                                    slidesPerView: 3.5,
                                    spaceBetween: 18,
                                },
                                768: {
                                    slidesPerView: 4.5,
                                    spaceBetween: 24,
                                },
                            }}
                            modules={[]}
                        >
                            {collection.parts.map((slider, index) => (
                                <SwiperSlide key={index}>
                                    <PosterCard
                                        data={{
                                            ...slider,
                                            media_type: data.media_type,
                                        }}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            )}

            {list &&
                list.map((item, index) => (
                    <Suspense key={index} fallback={<></>}>
                        <LazyPosterCardList
                            key={index}
                            data={item}
                            onFail={item.onFail}
                            onSuccess={item.onSuccess}
                        />
                    </Suspense>
                ))}
        </div>
    ) : (
        <FallBack
            data={{
                image: images.noData,
                title: "No Related Found",
                detail: `Sorry! We don't have similars or recommendations data for ${
                    data.name || data.title
                }. You can continue viewing other information or go back to the home page. We apologize for any inconvenience.
                `,
                buttons: [
                    <Button to="/" className={cx("button")} primary>
                        Go Home
                    </Button>,
                    <Button to="/" className={cx("button")} outline>
                        Discover Others
                    </Button>,
                ],
            }}
        />
    );
}

export default Related;
