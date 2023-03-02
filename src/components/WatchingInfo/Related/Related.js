import React, { Suspense, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { tmdbApi } from "~/api";
import Image from "~/components/Image";
import PosterCard from "~/components/PosterCard";

import classNames from "classnames/bind";
import style from "./Related.module.scss";

const LazyPosterCardList = React.lazy(() =>
    import("~/components/PosterCardList")
);

const cx = classNames.bind(style);

function Related({ data }) {
    const [list, setList] = useState();
    const [collection, setCollection] = useState();

    useEffect(() => {
        setList([
            {
                media_type: data.media_type,
                title: "Similars",
                api: () => tmdbApi.getSimilar(data.media_type, data.id),
            },
            {
                media_type: data.media_type,

                title: "Recommendations",
                api: () => tmdbApi.getRecommendations(data.media_type, data.id),
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
        } else setCollection(null);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    return (
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
                        <LazyPosterCardList key={index} data={item} />
                    </Suspense>
                ))}
        </div>
    );
}

export default Related;
