import {
    faAngleLeft,
    faAngleRight,
    faCirclePlay,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Grid, Navigation } from "swiper";
import "swiper/css/grid";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import tmdbApi from "~/api/tmdbApi";
import images from "~/assets/images";
import Button from "../Button";
import FallBack from "../FallBack";
import Image from "../Image";

import style from "./Seasons.module.scss";

const cx = classNames.bind(style);

function Seasons({
    data,
    defaultSeason = 0,
    defaultEpisode = 1,
    simplify = false,
    epSelectable = false,
}) {
    const [currentSeasonNumber, setCurrentSeasonNumber] =
        useState(defaultSeason);

    const [currentSeasonDetails, setCurrentSeasonDetails] = useState(null);
    const [swiper, setSwiper] = useState();
    const currentEpisodeSlideRef = useRef();
    const navPrev = useRef();
    const navNext = useRef();

    const swiperRowsCount = simplify ? 2 : 3;

    useEffect(() => {
        (async function handleGetSeasonDetails() {
            const response = await tmdbApi.getTVSeasons(
                data.id,
                currentSeasonNumber
            );
            let result = response;

            setCurrentSeasonDetails(result);
        })();
    }, [data, currentSeasonNumber]);

    useEffect(() => {
        if (
            epSelectable &&
            swiper &&
            !swiper.destroyed &&
            currentEpisodeSlideRef
        ) {
            const index = swiper.slides.findIndex(
                (slide) => slide === currentEpisodeSlideRef.current
            );

            swiper.slideTo(Math.ceil(index / swiperRowsCount));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [swiper, currentEpisodeSlideRef]);

    return (
        <div className={cx("wrapper")}>
            <div className={cx("seasons")}>
                <h2>Seasons:</h2>
                <div className={cx("button-group")}>
                    {data.seasons.map((season, index) => (
                        <Button
                            className={cx("button", {
                                active:
                                    Number(season.season_number) ===
                                    Number(currentSeasonNumber),
                            })}
                            key={index}
                            onClick={() =>
                                setCurrentSeasonNumber(season.season_number)
                            }
                        >
                            {`Season ${season.season_number}`}
                        </Button>
                    ))}
                </div>
            </div>
            {!simplify && currentSeasonDetails && (
                <div className={cx("season-info")}>
                    <div className={cx("season-poster")}>
                        <Image
                            className={cx("season-poster-img")}
                            src={tmdbApi.getW500Image(
                                currentSeasonDetails.poster_path
                            )}
                        />
                    </div>
                    <div className={cx("season-detail")}>
                        <h1>{currentSeasonDetails.name}</h1>
                        <p>{currentSeasonDetails.overview}</p>
                        <p>{`Episode: ${
                            data.seasons.find(
                                (season) =>
                                    season.season_number === currentSeasonNumber
                            ).episode_count
                        }`}</p>
                    </div>
                </div>
            )}
            {currentSeasonDetails &&
            currentSeasonDetails.episodes.length > 0 ? (
                <div className={cx("season-wrapper")}>
                    <div className={cx("season-heading")}>
                        <div ref={navPrev} className={cx("nav-prev")}>
                            <FontAwesomeIcon icon={faAngleLeft} />
                        </div>
                        {simplify && (
                            <h3 className={cx("season-name")}>
                                {currentSeasonDetails.name}
                            </h3>
                        )}
                        <div ref={navNext} className={cx("nav-next")}>
                            <FontAwesomeIcon icon={faAngleRight} />
                        </div>
                    </div>

                    <Swiper
                        onSwiper={setSwiper}
                        direction="horizontal"
                        slidesPerView={simplify ? 6 : 5}
                        spaceBetween={24}
                        grid={{
                            rows: swiperRowsCount,
                            fill: "row",
                        }}
                        navigation={{
                            prevEl: navPrev.current,
                            nextEl: navNext.current,
                            disabledClass: cx("nav-disable"),
                        }}
                        onBeforeInit={(swiper) => {
                            swiper.params.navigation.prevEl = navPrev.current;
                            swiper.params.navigation.nextEl = navNext.current;
                        }}
                        breakpoints={{
                            0: {
                                slidesPerView: simplify ? 2 : 1.5,
                                spaceBetween: 12,
                                slidesPerGroup: simplify ? 2 : 1,
                            },
                            576: {
                                slidesPerView: simplify ? 5 : 4,
                                spaceBetween: 18,
                                slidesPerGroup: simplify ? 5 : 4,
                            },
                            768: {
                                slidesPerView: simplify ? 6 : 5,
                                spaceBetween: 24,
                                slidesPerGroup: simplify ? 6 : 5,
                            },
                        }}
                        modules={[Navigation, Grid]}
                    >
                        {currentSeasonDetails.episodes
                            .filter(
                                (episode) =>
                                    Date.now() > Date.parse(episode.air_date)
                            )
                            .map((episode, index) => {
                                const itemProps =
                                    epSelectable &&
                                    Number(episode.episode_number) ===
                                        Number(defaultEpisode)
                                        ? {
                                              ref: currentEpisodeSlideRef,
                                          }
                                        : {};
                                return (
                                    <SwiperSlide key={index} {...itemProps}>
                                        <Link
                                            to={`/watch/tv/${data.id}/${currentSeasonDetails.season_number}/${episode.episode_number}`}
                                            className={cx("episode-wrapper", {
                                                active:
                                                    epSelectable &
                                                    (Number(
                                                        episode.episode_number
                                                    ) ===
                                                        Number(defaultEpisode)),
                                            })}
                                        >
                                            <div
                                                className={cx("episode-thumb")}
                                            >
                                                <Image
                                                    className={cx(
                                                        "episode-image"
                                                    )}
                                                    small
                                                    src={tmdbApi.getW500Image(
                                                        episode.still_path
                                                    )}
                                                />
                                                <div
                                                    className={cx(
                                                        "episode-play"
                                                    )}
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faCirclePlay}
                                                    />
                                                </div>
                                            </div>
                                            <span>{`Ep ${episode.episode_number}: ${episode.name}`}</span>
                                        </Link>
                                    </SwiperSlide>
                                );
                            })}
                    </Swiper>
                </div>
            ) : (
                <FallBack
                    data={{
                        image: images.noData,
                        title: "No Episodes Found",
                        detail: `Sorry! We don't have any episodes for ${
                            data.name || data.title
                        } as this season is currently in production. You can continue watch other seasons of it. We apologize for any inconvenience.
                `,
                        buttons: [],
                    }}
                />
            )}
        </div>
    );
}

export default Seasons;
