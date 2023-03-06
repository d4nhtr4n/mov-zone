import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { tmdbApi } from "~/api";
import { useLocalGenres } from "~/hooks";

import Image from "../Image";
import style from "./PosterCard.module.scss";

const cx = classNames.bind(style);

function PosterCard({ data, selected = false, onClick, ...passProps }) {
    let genres = useLocalGenres(data.media_type, data.genre_ids);
    if (data.genres) genres = data.genres.map((genre) => genre.name);

    let Comp = Link;
    const props = {
        to: `/view/${data.media_type}/${data.id}`,
        ...passProps,
    };

    if (onClick) {
        Comp = "div";
        props.onClick = onClick;
    }

    return (
        <Comp {...props}>
            <div
                className={cx("wrapper", {
                    "card-selected": selected,
                })}
            >
                <div className={cx("poster")}>
                    <div className={cx("image-wrapper")}>
                        <Image
                            className={cx("image")}
                            src={tmdbApi.getW500Image(data.poster_path)}
                        />
                    </div>
                    {data.vote_average >= 0 && (
                        <span className={cx("rating")}>
                            {Number(data.vote_average) > 0
                                ? Math.round(data.vote_average * 10) / 10
                                : "N/A"}
                        </span>
                    )}
                </div>
                <h3 className={cx("name")}>{data.title || data.name}</h3>
                <p className={cx("genre")}>{genres.join(", ")}</p>
            </div>
        </Comp>
    );
}

export default PosterCard;
