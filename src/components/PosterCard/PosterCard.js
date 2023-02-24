import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { tmdbApi } from "~/api";
import useLocalGenres from "~/hooks/useLocalGenres";

import Image from "../Image";
import style from "./PosterCard.module.scss";

const cx = classNames.bind(style);

function PosterCard({ data }) {
    const genres = useLocalGenres(data.media_type, data.genre_ids);
    return (
        <Link to={`/movie/${data.id}`}>
            <div className={cx("wrapper")}>
                <div className={cx("rating")}>
                    {/* <span className={cx("point")}>8.5</span> */}
                </div>
                <div className={cx("image-wrapper")}>
                    <Image
                        className={cx("image")}
                        src={tmdbApi.getW500Image(data.poster_path)}
                    />
                </div>
                <h3 className={cx("name")}>{data.title || data.name}</h3>
                <p className={cx("genre")}>{genres.join(", ")}</p>
            </div>
        </Link>
    );
}

export default PosterCard;
