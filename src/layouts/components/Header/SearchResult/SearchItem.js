import { Link } from "react-router-dom";

import PropTypes from "prop-types";
import classNames from "classnames/bind";

import { tmdbApi } from "~/api";
import Image from "~/components/Image";
import style from "./SearchResult.module.scss";
import { useLocalGenres } from "~/hooks";

const cx = classNames.bind(style);

function SearchItem({ data, onClick }) {
    const genres = useLocalGenres(data.media_type, data.genre_ids);
    return (
        <Link
            to={`/watching/${data.media_type}/${data.id}`}
            className={cx("wrapper")}
            onClick={onClick}
        >
            <Image
                className={cx("poster")}
                src={`${tmdbApi.getOriginalImage(data.backdrop_path)}`}
                alt=""
            />
            <div className={cx("info")}>
                <div className={cx("title")}>
                    {data.title || data.name}
                    {data.release_date && (
                        <span>{` (${data.release_date.split("-")[0]})`}</span>
                    )}
                </div>
                <div className={cx("genres")}>{genres.join(", ")}</div>
            </div>
        </Link>
    );
}

SearchItem.propTypes = {
    data: PropTypes.object.isRequired,
    onClick: PropTypes.func,
};

export default SearchItem;
