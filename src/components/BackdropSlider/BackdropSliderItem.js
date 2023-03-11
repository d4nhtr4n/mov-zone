import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faPlay } from "@fortawesome/free-solid-svg-icons";

import { tmdbApi } from "~/api";
import classNames from "classnames/bind";
import Button from "../Button";
import Image from "../Image";

import style from "./BackdropSlider.module.scss";
import { useLocalGenres } from "~/hooks";
import { category } from "~/api/constant";
import { useEffect, useState } from "react";

const cx = classNames.bind(style);

const regionNamesInEnglish = new Intl.DisplayNames(["en"], {
    type: "language",
});

function BackdropSliderItem({ data }) {
    const [details, setDetails] = useState();
    const genres = useLocalGenres(data.media_type, data.genre_ids);

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
            const response = await tmdbApi.getDetail(data.media_type, data.id, {
                params: {},
            });
            let result = response;
            setDetails(result);
        })();
    }, [data]);

    const date = data.release_date || data.first_air_date;

    return (
        data && (
            <div className={cx("item-wrapper")}>
                <Image
                    className={cx("image")}
                    src={tmdbApi.getOriginalImage(data.backdrop_path)}
                />
                <div className={cx("content-wrapper")}>
                    <div className={cx("content")}>
                        <h3 className={cx("name")}>
                            {data.title || data.name}
                        </h3>
                        <p className={cx("genre")}>
                            {genres && genres.join(", ")}
                        </p>
                        <ul className={cx("detail")}>
                            <li>{date.split("-")[0]}</li>
                            <li>
                                {regionNamesInEnglish.of(
                                    data.original_language
                                )}
                            </li>
                        </ul>
                        {details && (
                            <div>
                                <Button
                                    to={handleWatchUrl()}
                                    primary
                                    large
                                    leftIcon={<FontAwesomeIcon icon={faPlay} />}
                                >
                                    Watch now
                                </Button>
                                <Button
                                    to={`/view/${data.media_type}/${data.id}`}
                                    outline
                                    large
                                    leftIcon={
                                        <FontAwesomeIcon icon={faCircleInfo} />
                                    }
                                >
                                    Details
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    );
}

export default BackdropSliderItem;
