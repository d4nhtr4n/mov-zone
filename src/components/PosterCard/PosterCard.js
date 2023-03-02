import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { tmdbApi } from "~/api";
import { useLocalGenres } from "~/hooks";

import Image from "../Image";
import style from "./PosterCard.module.scss";

const cx = classNames.bind(style);

function PosterCard({ data, onClick, ...passProps }) {
    const genres = useLocalGenres(data.media_type, data.genre_ids);

    let Comp = Link;
    const props = {
        to: `/watching/${data.media_type}/${data.id}`,
        ...passProps,
    };

    if (onClick) {
        Comp = "div";
        props.onClick = onClick;
    }

    return (
        <Comp {...props}>
            <div className={cx("wrapper")}>
                <div className={cx("rating")}></div>
                <div className={cx("image-wrapper")}>
                    <Image
                        className={cx("image")}
                        src={tmdbApi.getW500Image(data.poster_path)}
                    />
                </div>
                <h3 className={cx("name")}>{data.title || data.name}</h3>
                <p className={cx("genre")}>{genres.join(", ")}</p>
            </div>
        </Comp>
    );
}

export default PosterCard;
