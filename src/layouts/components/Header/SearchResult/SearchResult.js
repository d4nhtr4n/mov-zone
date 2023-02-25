import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import SearchItem from "./SearchItem";

import style from "./SearchResult.module.scss";

const cx = classNames.bind(style);

function SearchResult({ data }) {
    return (
        <div className={cx("search-group")}>
            <div className={cx("group-heading")}>
                <h4 className={cx("group-title")}>{data.title}</h4>
                <Link to={""} className={cx("group-more")}>
                    Show more
                </Link>
            </div>
            <div>
                {data.result.map((item) => (
                    <SearchItem
                        onClick={data.handleHideResult}
                        key={item.id}
                        data={{ ...item, media_type: data.media_type }}
                    />
                ))}
            </div>
        </div>
    );
}

export default SearchResult;
