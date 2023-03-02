import { faCirclePlay } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { tmdbApi } from "~/api";
import { category } from "~/api/tmdbAPI/constant";
import Image from "~/components/Image";
import PosterCard from "~/components/PosterCard";
import style from "./Episodes.module.scss";

const cx = classNames.bind(style);

function Episodes({ data }) {
    const [currentSeasonNumber, setCurrentSeasonNumber] = useState(
        data.seasons[0]
    );
    const [currentSeason, setCurrentSeason] = useState();

    useEffect(() => {
        (async function handleGetTrending() {
            const response = await tmdbApi.getTVSeasons(
                data.id,
                currentSeasonNumber.season_number
            );
            let result = response;

            setCurrentSeason(result);
        })();
    }, [data.id, currentSeasonNumber]);

    return (
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
                                onClick={() => setCurrentSeasonNumber(season)}
                                data={{
                                    ...season,
                                    media_type: category.tv,
                                }}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {currentSeason && (
                <div className={cx("season-wrapper")}>
                    <div className={cx("season-info")}>
                        <div className={cx("season-heading")}>
                            <h3 className={cx("season-name")}>
                                {currentSeason.name}
                            </h3>
                            <h3 className={cx("season-episodes-count")}>
                                {`Episodes Count: ${currentSeason.episodes.length}`}
                            </h3>
                        </div>
                        {currentSeason.overview && (
                            <p className={cx("season-overview")}>
                                {currentSeason.overview}
                            </p>
                        )}
                    </div>
                    <Container>
                        <Row>
                            {currentSeason.episodes.map((episode, index) => (
                                <Col key={index} md={2}>
                                    <Link
                                        to=""
                                        className={cx("episode-wrapper")}
                                    >
                                        <div className={cx("episode-thumb")}>
                                            <Image
                                                className={cx("episode-image")}
                                                src={tmdbApi.getW200Image(
                                                    episode.still_path
                                                )}
                                            />
                                            <div className={cx("episode-play")}>
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
    );
}

export default Episodes;
