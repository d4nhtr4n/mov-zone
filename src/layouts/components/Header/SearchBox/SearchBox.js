import { useEffect, useRef, useState } from "react";
import Tippy from "@tippyjs/react/headless";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import { Wrapper as PoperWrapper } from "~/components/Poper";
import { Link } from "react-router-dom";
import { category } from "~/api/tmdbAPI/constant";
import { useDebounce } from "~/hooks";
import SearchItem from "../SearchItem";
import ScrollView from "~/components/ScrollView";
import tmdbApi from "~/api/tmdbAPI";
import style from "./SearchBox.module.scss";

const cx = classNames.bind(style);

function SearchBox() {
    const [searchValue, setSearchValue] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(true);

    const inputRef = useRef();
    const searchValueDebounced = useDebounce(searchValue, 500);

    useEffect(() => {
        if (!searchValueDebounced.trim()) {
            setSearchResult([]);
            return;
        }

        (async function handleSearch() {
            const response = await tmdbApi.search(category.movie, {
                params: {
                    query: searchValue,
                    page: 1,
                    language: "en-US",
                },
            });
            let result = response.results;
            if (result.length > 10) result = result.splice(0, 10);

            setSearchResult(result);
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchValueDebounced]);

    const handleHideResult = () => {
        setShowResult(false);
    };

    const handleInputChange = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(" ")) {
            setSearchValue(e.target.value);
        }
    };

    const renderResult = (attrs) => {
        return (
            <div className={cx("search-result")} tabIndex="-1" {...attrs}>
                <PoperWrapper>
                    {searchResult && (
                        <div className={cx("search-group")}>
                            <div className={cx("group-heading")}>
                                <h4 className={cx("group-title")}>
                                    Search results for "{searchValue}"
                                </h4>
                                <Link to={""} className={cx("group-more")}>
                                    Show more
                                </Link>
                            </div>
                            <ScrollView>
                                {searchResult.map((item) => (
                                    <SearchItem
                                        onClick={handleHideResult}
                                        key={item.id}
                                        data={item}
                                    />
                                ))}
                            </ScrollView>
                        </div>
                    )}
                </PoperWrapper>
            </div>
        );
    };

    return (
        <div>
            <Tippy
                interactive
                visible={searchResult.length > 0 && showResult}
                placement="bottom-end"
                render={(attrs) => renderResult(attrs)}
                onClickOutside={handleHideResult}
            >
                <div className={cx("search")}>
                    <span className={cx("search-icon")}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </span>

                    <input
                        ref={inputRef}
                        placeholder="Search movies and TV shows"
                        spellCheck="false"
                        value={searchValue}
                        onChange={handleInputChange}
                        onFocus={() => setShowResult(true)}
                    />
                    {!!searchValue && (
                        <button
                            className={cx("search-clear")}
                            onClick={() => {
                                setSearchValue("");
                                inputRef.current.focus();
                                setSearchResult([]);
                            }}
                        >
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}
                </div>
            </Tippy>
        </div>
    );
}

export default SearchBox;
