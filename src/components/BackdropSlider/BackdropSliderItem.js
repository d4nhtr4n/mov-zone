import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { tmdbApi } from "~/api";
import Button from "../Button";

import Image from "../Image";
import style from "./BackdropSlider.module.scss";

const cx = classNames.bind(style);

const regionNamesInEnglish = new Intl.DisplayNames(["en"], {
    type: "language",
});

function BackdropSliderItem({ data }) {
    const [genres, setGenres] = useState([]);

    const date = data.release_date || data.first_air_date;

    useEffect(() => {
        (async function handleGetGenres() {
            const response = await tmdbApi.getGenres(data.media_type);
            let result = response.genres
                .filter((genre) => data.genre_ids.includes(genre.id))
                .map((genre) => genre.name);
            setGenres(result);
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                        <Button
                            primary
                            large
                            leftIcon={<FontAwesomeIcon icon={faPlay} />}
                        >
                            Watch now
                        </Button>
                    </div>
                </div>
            </div>
        )
    );
}

export default BackdropSliderItem;
