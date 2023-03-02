import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { Swiper, SwiperSlide } from "swiper/react";
import { tmdbApi } from "~/api";
import Image from "~/components/Image";

import style from "./VideosList.module.scss";

const cx = classNames.bind(style);

function VideosList({ data }) {
    const [videos, setVideos] = useState();
    const [currentPlay, setCurrentPlay] = useState("");
    const player = useRef();

    useEffect(() => {
        (async function handleGetVideos() {
            const response = await tmdbApi.getVideos(data.media_type, data.id);
            let result = response.results;

            setVideos(result);
            setCurrentPlay(result[0]);
        })();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);
    return (
        <div className={cx("wrapper")}>
            {videos && (
                <>
                    <Swiper
                        className={cx("seasons-slider")}
                        direction="horizontal"
                        breakpoints={{
                            0: {
                                slidesPerView: 1.5,
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
                        {videos.map(
                            (video, index) =>
                                video.site === "YouTube" && (
                                    <SwiperSlide key={index}>
                                        <div
                                            className={cx("video-thumb")}
                                            onClick={() => {
                                                setCurrentPlay(video);
                                                player.current.scrollIntoView();
                                            }}
                                        >
                                            <Image
                                                className={cx("video-image")}
                                                src={`https://img.youtube.com/vi/${video.key}/0.jpg`}
                                                alt="thumbnail"
                                            />
                                            <h4>{video.name}</h4>
                                        </div>
                                    </SwiperSlide>
                                )
                        )}
                    </Swiper>
                    {currentPlay && (
                        <div
                            ref={player}
                            className={cx("react-player-container")}
                        >
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
                </>
            )}
        </div>
    );
}

export default VideosList;
