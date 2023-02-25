import { useEffect, useRef, useState } from "react";
import Tippy from "@tippyjs/react/headless";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import { Wrapper as PoperWrapper } from "~/components/Poper";
import { category } from "~/api/tmdbAPI/constant";
import { useDebounce } from "~/hooks";
import ScrollView from "~/components/ScrollView";
import tmdbApi from "~/api/tmdbAPI";
import style from "./SearchBox.module.scss";
import SearchResult from "../SearchResult";

const cx = classNames.bind(style);

function SearchBox() {
    const [searchValue, setSearchValue] = useState("");
    const [movieSearchResult, setMovieSearchResults] = useState([]);
    const [tvSearchResults, setTvSearchResult] = useState([]);

    const [showResult, setShowResult] = useState(false);

    const inputRef = useRef();
    const searchValueDebounced = useDebounce(searchValue, 500);

    useEffect(() => {
        if (!searchValueDebounced.trim()) {
            setMovieSearchResults([]);
            setTvSearchResult([]);
            return;
        }

        (async function handleSearchMovies() {
            const response = await tmdbApi.search(category.movie, {
                params: {
                    query: searchValueDebounced,
                    page: 1,
                    language: "en-US",
                },
            });
            let result = response.results;
            if (result.length > 5) result = result.splice(0, 5);

            setMovieSearchResults(result);
        })();

        (async function handleSearchTVs() {
            const response = await tmdbApi.search(category.tv, {
                params: {
                    query: searchValueDebounced,
                    page: 1,
                    language: "en-US",
                },
            });
            let result = response.results;
            if (result.length > 5) result = result.splice(0, 5);

            setTvSearchResult(result);
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
                    <ScrollView>
                        <div className={cx("notify")}>
                            <FontAwesomeIcon
                                className={cx("icon")}
                                icon={faMagnifyingGlass}
                            />
                            <span>
                                {tvSearchResults.length > 0 ||
                                movieSearchResult.length > 0
                                    ? `Results for "${searchValueDebounced}"`
                                    : `There are no reults for "${searchValueDebounced}"`}
                            </span>
                        </div>

                        {movieSearchResult.length > 0 && (
                            <SearchResult
                                data={{
                                    media_type: category.movie,
                                    title: `Movies`,
                                    result: movieSearchResult,
                                    handleHideResult,
                                }}
                            />
                        )}
                        {tvSearchResults.length > 0 && (
                            <SearchResult
                                data={{
                                    media_type: category.tv,
                                    title: `TVs`,
                                    result: tvSearchResults,
                                    handleHideResult,
                                }}
                            />
                        )}
                    </ScrollView>
                </PoperWrapper>
            </div>
        );
    };

    return (
        <div>
            <Tippy
                interactive
                visible={searchValue && showResult}
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
                        onFocus={() => {
                            setShowResult(true);
                        }}
                    />
                    {!!searchValue && (
                        <button
                            className={cx("search-clear")}
                            onClick={() => {
                                inputRef.current.focus();
                                setSearchValue("");
                                setMovieSearchResults([]);
                                setTvSearchResult([]);
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
