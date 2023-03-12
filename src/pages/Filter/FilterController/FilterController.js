import { faRectangleXmark } from "@fortawesome/free-regular-svg-icons";
import { faCheck, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import tmdbApi from "~/api/tmdbApi";
import { category } from "~/api/constant";
import Button from "~/components/Button";

import style from "./FilterController.module.scss";

const cx = classNames.bind(style);

const now = new Date().getUTCFullYear();
let years = Array(now - (now - 9))
    .fill("")
    .map((value, index) => ({
        title: now - index,
        key: "year",
        value: now - index,
    }))
    .reverse();

years = [
    {
        title: `All`,
        key: "year",
        value: ``,
    },
    {
        title: `${years[0].value - 1} & Before`,
        key: "release_date.lte",
        value: `${years[0].value - 1}-12-31`,
    },
    ...years,
].reverse();

function FilterController({ onSubmit }) {
    const sortBy = [
        {
            title: "Popularity",
            key: "popularity.desc",
        },
        {
            title: "Release Date",
            key: "release_date.desc",
        },
        {
            title: "Title",
            key: "original_title.asc",
        },
        {
            title: "Vote Average",
            key: "vote_average.desc",
        },
    ];

    const [tvGenres, setTvGenres] = useState();
    const [movieGenres, setMovieGenres] = useState();
    const [mediaType, setMediaType] = useState();
    const [genresSelected, setGenresSelected] = useState([]);
    const [sort, setSort] = useState(sortBy[0].key);
    const [year, setYear] = useState(years[0]);

    useEffect(() => {
        (async function handleGetGenres() {
            const movieGResponse = await tmdbApi.getGenres(category.movie);
            const movieGList = movieGResponse.genres;
            setMovieGenres(movieGList);

            const tvGResponse = await tmdbApi.getGenres(category.tv);
            const tvGList = tvGResponse.genres;
            setTvGenres(tvGList);
        })();
        setMediaType(category.movie);
    }, []);

    const handleChangeMediaType = (event) => {
        setGenresSelected([]);
        setMediaType(event.target.value);
    };

    const handleSelectGenres = (event) => {
        var updatedList = [...genresSelected];
        if (event.target.checked) {
            updatedList = [...genresSelected, event.target.value];
        } else {
            updatedList.splice(genresSelected.indexOf(event.target.value), 1);
        }
        setGenresSelected(updatedList);
    };

    const handleSelectSort = (event) => {
        setSort(event.target.value);
    };

    const handleSelectYear = (event) => {
        setYear(years[event.target.value]);
    };

    return (
        <div className={cx("wrapper")}>
            <h1 className={cx("heading")}>
                Choose from these options to find the ones that work best for
                you
            </h1>
            <div className={cx("media-type")}>
                <h3 className={cx("title")}>Media type: </h3>
                <div>
                    <label className={cx("media-type-button")}>
                        <input
                            type="radio"
                            name="media_type"
                            value={category.movie}
                            checked={mediaType === category.movie}
                            onChange={handleChangeMediaType}
                        />
                        Movies
                    </label>
                    <label className={cx("media-type-button")}>
                        <input
                            type="radio"
                            name="media_type"
                            value={category.tv}
                            checked={mediaType === category.tv}
                            onChange={handleChangeMediaType}
                        />
                        TV Series
                    </label>
                </div>
            </div>

            <div className={cx("genres")}>
                <div className={cx("heading")}>
                    <h3 className={cx("title")}>Genres:</h3>
                    <Button
                        className={cx("clear-button", {
                            visible: genresSelected.length > 0,
                        })}
                        text
                        leftIcon={<FontAwesomeIcon icon={faRectangleXmark} />}
                        onClick={() => {
                            setGenresSelected([]);
                        }}
                    >
                        Clear
                    </Button>
                </div>
                <div className={cx("group")}>
                    {mediaType === category.movie
                        ? movieGenres &&
                          movieGenres.map((genre, index) => (
                              <label className={cx("checkbox")} key={index}>
                                  <input
                                      type="checkbox"
                                      name="genres"
                                      value={genre.id}
                                      checked={genresSelected.includes(
                                          String(genre.id)
                                      )}
                                      onChange={handleSelectGenres}
                                  />
                                  <div className={cx("label")}>
                                      <div className={cx("checkmark")}>
                                          <span className={cx("check-icon")}>
                                              <FontAwesomeIcon icon={faCheck} />
                                          </span>
                                      </div>

                                      <span className={cx("name")}>
                                          {genre.name}
                                      </span>
                                  </div>
                              </label>
                          ))
                        : tvGenres &&
                          tvGenres.map((genre, index) => (
                              <label className={cx("checkbox")} key={index}>
                                  <input
                                      type="checkbox"
                                      name="genres"
                                      value={genre.id}
                                      checked={genresSelected.includes(
                                          String(genre.id)
                                      )}
                                      onChange={handleSelectGenres}
                                  />
                                  <div className={cx("label")}>
                                      <div className={cx("checkmark")}>
                                          <span className={cx("check-icon")}>
                                              <FontAwesomeIcon icon={faCheck} />
                                          </span>
                                      </div>

                                      <span className={cx("name")}>
                                          {genre.name}
                                      </span>
                                  </div>
                              </label>
                          ))}
                </div>
            </div>
            <div className={cx("genres")}>
                <div className={cx("heading")}>
                    <h3 className={cx("title")}>Year:</h3>
                </div>
                <div className={cx("group")}>
                    {years.map((item, index) => (
                        <label className={cx("ratio-button")} key={index}>
                            <input
                                type="checkbox"
                                name="genres"
                                value={index}
                                checked={year === item}
                                onChange={handleSelectYear}
                            />
                            <div className={cx("label")}>
                                <div className={cx("checkmark")}>
                                    <span className={cx("check-icon")}>
                                        <FontAwesomeIcon icon={faCheck} />
                                    </span>
                                </div>
                                <span className={cx("name")}>{item.title}</span>
                            </div>
                        </label>
                    ))}
                </div>
            </div>
            <div className={cx("genres")}>
                <div className={cx("heading")}>
                    <h3 className={cx("title")}>Sort by:</h3>
                </div>
                <div className={cx("group")}>
                    {sortBy.map((item, index) => (
                        <label className={cx("ratio-button")} key={index}>
                            <input
                                type="checkbox"
                                name="sortBy"
                                value={item.key}
                                checked={sort === item.key}
                                onChange={handleSelectSort}
                            />
                            <div className={cx("label")}>
                                <div className={cx("checkmark")}>
                                    <span className={cx("check-icon")}>
                                        <FontAwesomeIcon icon={faCheck} />
                                    </span>
                                </div>

                                <span className={cx("name")}>{item.title}</span>
                            </div>
                        </label>
                    ))}
                </div>
            </div>

            <div className={cx("submit-button")}>
                <Button
                    primary
                    leftIcon={<FontAwesomeIcon icon={faMagnifyingGlass} />}
                    onClick={() => {
                        const options = {
                            mediaType,
                            genres: genresSelected,
                            sortBy: sort,
                            year: {
                                [year.key]: year.value,
                            },
                        };
                        onSubmit(options);
                    }}
                >
                    Search
                </Button>
            </div>
        </div>
    );
}

export default FilterController;
