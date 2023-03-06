import { faBookmark, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";

import { tmdbApi } from "~/api";
import { category } from "~/api/tmdbApi/constant";
import Button from "../Button";
import Image from "../Image";

import style from "./ViewingHeading.module.scss";

const cx = classNames.bind(style);

function ViewingHeading({ data }) {
    const [disableWatching, setDisableWatching] = useState(false);
    function handleWatchUrl() {
        let watchUrl = `/watch/${data.media_type}/${data.id}`;
        if (data && data.media_type === category.tv) {
            watchUrl = watchUrl.concat(
                "",
                `/${data.last_episode_to_air.season_number}/${data.last_episode_to_air.episode_number}/`
            );
        }
        return watchUrl;
    }

    useEffect(() => {
        if (
            data.media_type === category.movie &&
            Date.now() - Date.parse(data.release_date) < 0
        ) {
            setDisableWatching(true);
        } else setDisableWatching(false);
    }, [data]);

    return (
        <div className={cx("wrapper")}>
            <div className={cx("background")}>
                <Image
                    className={cx("backdrop")}
                    src={tmdbApi.getOriginalImage(data.backdrop_path)}
                />
            </div>
            <div className={cx("inner")}>
                <div className={cx("container")}>
                    <Image
                        className={cx("poster")}
                        src={tmdbApi.getW500Image(data.poster_path)}
                    />
                    <div className={cx("content")}>
                        <div className={cx("info")}>
                            <span className={cx("name")}>
                                {data.title || data.name}
                            </span>
                            {data.tagline && (
                                <q className={cx("tag-line")}>{data.tagline}</q>
                            )}
                            <ul className={cx("genre-list")}>
                                {data.genres.map((genre, index) => (
                                    <li key={index}>{genre.name}</li>
                                ))}
                            </ul>
                            {data.production_countries.length > 0 && (
                                <p className={cx("countries")}>
                                    {data.production_countries
                                        .map((country) => country.name)
                                        .join(", ")}
                                </p>
                            )}
                            <div>
                                <div className={cx("rating")}>
                                    <div
                                        className={cx("rating-fill")}
                                        style={{
                                            width: `${data.vote_average * 10}%`,
                                        }}
                                    >
                                        <span>★★★★★</span>
                                    </div>
                                    <div className={cx("rating-empty")}>
                                        <span>☆☆☆☆☆</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cx("action")}>
                            <Button
                                to={handleWatchUrl()}
                                className={cx("button")}
                                primary
                                disabled={disableWatching}
                                leftIcon={<FontAwesomeIcon icon={faPlay} />}
                            >
                                Watch
                            </Button>
                            <Button
                                className={cx("button")}
                                outline
                                leftIcon={<FontAwesomeIcon icon={faBookmark} />}
                            >
                                Follow
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx("overlay")}></div>
        </div>
    );
}

export default ViewingHeading;
