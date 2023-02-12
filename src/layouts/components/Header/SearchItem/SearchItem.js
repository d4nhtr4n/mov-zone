import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faLanguage } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import classNames from "classnames/bind";

import { tmdbApi } from "~/api";
import Image from "~/components/Image";
import style from "./SearchItem.module.scss";

const cx = classNames.bind(style);

const regionNamesInEnglish = new Intl.DisplayNames(["en"], {
    type: "language",
});

function SearchItem({ data, onClick }) {
    return (
        <Link to={`/${data.id}`} className={cx("wrapper")} onClick={onClick}>
            <Image
                className={cx("poster")}
                src={`${tmdbApi.getOriginalImage(data.backdrop_path)}`}
                alt=""
            />
            <div className={cx("info")}>
                <div className={cx("title")}>
                    {data.title}
                    {data.release_date && (
                        <span>{` (${data.release_date.split("-")[0]})`}</span>
                    )}
                </div>
                <div className={cx("detail")}>
                    <div>
                        <FontAwesomeIcon icon={faLanguage} />
                        <span>
                            {regionNamesInEnglish.of(data.original_language)}
                        </span>
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faEye} />
                        <span>{data.popularity}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}

SearchItem.propTypes = {
    data: PropTypes.object.isRequired,
    onClick: PropTypes.func,
};

export default SearchItem;
