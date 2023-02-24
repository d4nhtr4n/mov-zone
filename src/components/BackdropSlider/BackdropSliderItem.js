import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

import { tmdbApi } from "~/api";
import classNames from "classnames/bind";
import Button from "../Button";
import Image from "../Image";

import style from "./BackdropSlider.module.scss";
import useLocalGenres from "~/hooks/useLocalGenres";

const cx = classNames.bind(style);

const regionNamesInEnglish = new Intl.DisplayNames(["en"], {
    type: "language",
});

function BackdropSliderItem({ data }) {
    const genres = useLocalGenres(data.media_type, data.genre_ids);

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
