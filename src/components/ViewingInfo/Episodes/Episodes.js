import { faCirclePlay } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { tmdbApi } from "~/api";
import { category } from "~/api/tmdbApi/constant";
import images from "~/assets/images";
import Button from "~/components/Button";
import FallBack from "~/components/FallBack";
import Image from "~/components/Image";
import PosterCard from "~/components/PosterCard";
import style from "./Episodes.module.scss";

const cx = classNames.bind(style);

function Episodes({ data }) {
    const [haveSeasons, setHaveSeasons] = useState(null);
    const [currentSeason, setCurrentSeason] = useState(null);
    const [currentSeasonDetails, setCurrentSeasonDetails] = useState(null);

    // Check data and Auto show first season when change data
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (data.seasons.length > 0) {
            setHaveSeasons(true);
            setCurrentSeason(data.seasons[0]);
        } else setHaveSeasons(false);
    }, [data]);

    useEffect(() => {
        if (!currentSeason) return;

        (async function handleGetSeasonDetails() {
            const response = await tmdbApi.getTVSeasons(
                data.id,
                currentSeason.season_number
            );
            let result = response;
            console.log(result);
            setCurrentSeasonDetails(result);
        })();
    }, [data, currentSeason]);

    return haveSeasons ? (
        <div className={cx("wrapper")}>
            <div className={cx("seasons")}>
                <Swiper
                    className={cx("seasons-slider")}
                    direction="horizontal"
                    breakpoints={{
                        0: {
                            slidesPerView: 2.5,
                            spaceBetween: 12,
                        },
                        576: {
                            slidesPerView: 4.5,
                            spaceBetween: 18,
                        },
                        768: {
                            slidesPerView: 5.5,
                            spaceBetween: 24,
                        },
                    }}
                    modules={[]}
                >
                    {data.seasons.map((season, index) => (
                        <SwiperSlide key={index}>
                            <PosterCard
                                selected={currentSeason === season}
                                onClick={() => setCurrentSeason(season)}
                                data={{
                                    ...season,
                                    media_type: category.tv,
                                }}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {currentSeasonDetails && (
                <div className={cx("season-wrapper")}>
                    <div className={cx("season-info")}>
                        <div className={cx("season-heading")}>
                            <h3 className={cx("season-name")}>
                                {currentSeasonDetails.name}
                            </h3>
                            <h3 className={cx("season-episodes-count")}>
                                {`Episodes Count: ${currentSeasonDetails.episodes.length}`}
                            </h3>
                        </div>
                        {currentSeasonDetails.overview && (
                            <p className={cx("season-overview")}>
                                {currentSeasonDetails.overview}
                            </p>
                        )}
                    </div>
                    <Container>
                        <Row>
                            {currentSeasonDetails.episodes
                                .filter(
                                    (episode) =>
                                        Date.now() >
                                        Date.parse(episode.air_date)
                                )
                                .map((episode, index) => (
                                    <Col key={index} md={2}>
                                        <Link
                                            to={`/watch/${data.media_type}/${data.id}/${currentSeasonDetails.season_number}/${episode.episode_number}`}
                                            className={cx("episode-wrapper")}
                                        >
                                            <div
                                                className={cx("episode-thumb")}
                                            >
                                                <Image
                                                    className={cx(
                                                        "episode-image"
                                                    )}
                                                    small
                                                    src={tmdbApi.getW200Image(
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
                                            <span>{episode.name}</span>
                                        </Link>
                                    </Col>
                                ))}
                        </Row>
                    </Container>
                </div>
            )}
        </div>
    ) : (
        <FallBack
            data={{
                image: images.noData,
                title: "No Episodes Found",
                detail: `Sorry! We don't have episode data for ${
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

export default Episodes;
