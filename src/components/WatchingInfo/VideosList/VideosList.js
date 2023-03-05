import { faPlayCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";

import ReactPlayer from "react-player";
import { Swiper, SwiperSlide } from "swiper/react";
import { tmdbApi } from "~/api";
import images from "~/assets/images";
import Button from "~/components/Button";
import FallBack from "~/components/FallBack";
import Image from "~/components/Image";

import style from "./VideosList.module.scss";

const cx = classNames.bind(style);

function VideosList({ data }) {
    const [haveVideos, setHaveVideos] = useState(true);
    const [videos, setVideos] = useState([]);
    const [currentPlay, setCurrentPlay] = useState("");
    const player = useRef();

    useEffect(() => {
        (async function handleGetVideos() {
            const response = await tmdbApi.getVideos(data.media_type, data.id);
            let result = response.results;

            setVideos(result);
            if (result.length <= 0) {
                setHaveVideos(false);
            } else {
                setCurrentPlay(result[0]);
                setHaveVideos(true);
            }
        })();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    return haveVideos > 0 ? (
        <div className={cx("wrapper")}>
            <Swiper
                className={cx("seasons-slider")}
                direction="horizontal"
                breakpoints={{
                    0: {
                        slidesPerView: 1.5,
                        spaceBetween: 8,
                    },
                    576: {
                        slidesPerView: 4.5,
                        spaceBetween: 12,
                    },
                    768: {
                        slidesPerView: 5.5,
                        spaceBetween: 16,
                    },
                }}
                modules={[]}
            >
                {videos.map(
                    (video, index) =>
                        video.site === "YouTube" && (
                            <SwiperSlide
                                className={cx("slide")}
                                key={index}
                                style={{ height: "auto !important" }}
                            >
                                <div
                                    className={cx("video-thumb", {
                                        "thumb-selected": video === currentPlay,
                                    })}
                                    onClick={() => {
                                        setCurrentPlay(video);
                                        player.current.scrollIntoView();
                                    }}
                                >
                                    <div className={cx("thumb-img-wrapper")}>
                                        <Image
                                            className={cx("video-image")}
                                            small
                                            src={`https://img.youtube.com/vi/${video.key}/0.jpg`}
                                            alt="thumbnail"
                                        />
                                        <div className={cx("play-overlay")}>
                                            <FontAwesomeIcon
                                                icon={faPlayCircle}
                                            />
                                        </div>
                                    </div>
                                    <h4>{video.name}</h4>
                                </div>
                            </SwiperSlide>
                        )
                )}
            </Swiper>
            {currentPlay && (
                <div ref={player} className={cx("react-player-container")}>
                    <div className={cx("react-player-wrapper")}>
                        <ReactPlayer
                            controls={true}
                            className={cx("react-player")}
                            width="100%"
                            height="100%"
                            url={`https://www.youtube.com/watch?v=${currentPlay.key}`}
                        />
                    </div>
                </div>
            )}
        </div>
    ) : (
        <FallBack
            data={{
                image: images.noData,
                title: "No Videos Found",
                detail: `Sorry! We don't have trailers or cuts for ${
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

export default VideosList;
