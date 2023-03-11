import {
    faCircleInfo,
    faPlay,
    faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { tmdbApi } from "~/api";
import { category } from "~/api/constant";

import Button from "~/components/Button";
import Image from "~/components/Image";

import style from "./FollowingCard.module.scss";

const cx = classNames.bind(style);

function FollowingCard({ data, onRemove }) {
    const [details, setDetails] = useState();
    const [casts, setCast] = useState();

    function handleWatchUrl() {
        let watchUrl = `/watch/${data.media_type}/${data.id}`;
        if (details && data.media_type === category.tv) {
            watchUrl = watchUrl.concat(
                "",
                `/${details.last_episode_to_air.season_number}/${details.last_episode_to_air.episode_number}/`
            );
        }
        return watchUrl;
    }

    useEffect(() => {
        (async function handleGetDetails() {
            const details = await tmdbApi.getDetail(data.media_type, data.id, {
                params: {},
            });
            setDetails(details);

            const credits = await tmdbApi.getCredits(data.media_type, data.id);
            let casts = credits.cast;
            if (casts && casts.length > 4)
                casts = [...casts.splice(0, 4), { name: "..." }];
            setCast(casts);
        })();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);
    return (
        details && (
            <div
                className={cx("wrapper")}
                style={{
                    backgroundImage: `url(${tmdbApi.getOriginalImage(
                        details.backdrop_path
                    )})`,
                    backgroundSize: "cover",
                    width: "100%",
                }}
            >
                <div className={cx("inner")}>
                    <div>
                        <Image
                            className={cx("poster")}
                            src={tmdbApi.getW200Image(details.poster_path)}
                        />
                    </div>
                    <div className={cx("info")}>
                        <div className={cx("heading")}>
                            <h3 className={cx("name")}>
                                {details.name || details.title}
                            </h3>
                            <div className={cx("controls")}>
                                <Button
                                    to={handleWatchUrl()}
                                    small
                                    primary
                                    leftIcon={<FontAwesomeIcon icon={faPlay} />}
                                >
                                    Watch
                                </Button>
                                <Button
                                    to={`/view/${data.media_type}/${data.id}`}
                                    small
                                    outline
                                    leftIcon={
                                        <FontAwesomeIcon icon={faCircleInfo} />
                                    }
                                >
                                    Details
                                </Button>
                                <Button
                                    small
                                    text
                                    onClick={onRemove}
                                    leftIcon={
                                        <FontAwesomeIcon icon={faTrashCan} />
                                    }
                                >
                                    Remove
                                </Button>
                            </div>
                        </div>
                        <div className={cx("details")}>
                            <ul className={cx("info-list")}>
                                {data.media_type === category.movie &&
                                    details.release_date && (
                                        <li>
                                            <span className={cx("title")}>
                                                Release date:
                                            </span>
                                            <span className={cx("content")}>
                                                {details.release_date}
                                            </span>
                                        </li>
                                    )}
                                {data.media_type === category.tv &&
                                    details.last_episode_to_air && (
                                        <li>
                                            <span className={cx("title")}>
                                                Lastest episode:
                                            </span>
                                            <span className={cx("content")}>
                                                {`${details.last_episode_to_air.air_date}, Season ${details.last_episode_to_air.season_number}, Episode ${details.last_episode_to_air.episode_number}`}
                                            </span>
                                        </li>
                                    )}
                                <li>
                                    <span className={cx("title")}>Genres:</span>
                                    <span className={cx("content")}>
                                        {details.genres.length > 0
                                            ? details.genres
                                                  .map((genre) => genre.name)
                                                  .join(", ")
                                            : "Unknown"}
                                    </span>
                                </li>
                                {casts && (
                                    <li>
                                        <span className={cx("title")}>
                                            Casts:
                                        </span>
                                        <span className={cx("content")}>
                                            {casts.length > 0
                                                ? casts
                                                      .map((cast) => cast.name)
                                                      .join(", ")
                                                : "Unknown"}
                                        </span>
                                    </li>
                                )}
                                <li>
                                    <span className={cx("title")}>
                                        Languages:
                                    </span>
                                    <span className={cx("content")}>
                                        {details.spoken_languages.length > 0
                                            ? details.spoken_languages
                                                  .map((lang) => lang.name)
                                                  .join(", ")
                                            : "Unknown"}
                                    </span>
                                </li>
                            </ul>
                            <div className={cx("plot")}>
                                <span className={cx("title")}>Plot:</span>
                                <p className={cx("content")}>
                                    {details.overview}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
}

export default FollowingCard;
