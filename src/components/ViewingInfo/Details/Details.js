import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { tmdbApi } from "~/api";
import { category } from "~/api/tmdbApi/constant";

import style from "./Details.module.scss";

const cx = classNames.bind(style);

function Details({ data }) {
    const [credits, setCredits] = useState();

    useEffect(() => {
        (async function handleGetCredits() {
            const response = await tmdbApi.getCredits(data.media_type, data.id);
            let result = response;

            let casts = result.cast;
            if (casts.length > 10)
                casts = [...casts.splice(0, 10), { name: "..." }];

            let crews = result.crew;
            if (crews.length > 10)
                crews = [...crews.splice(0, 10), { name: "..." }];

            setCredits({ casts, crews });
        })();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    return (
        <div className={cx("wrapper")}>
            <ul className={cx("info-list")}>
                <li>
                    <span className={cx("title")}>Status:</span>
                    <span className={cx("content")}>
                        {data.status || "Unknown"}
                    </span>
                </li>

                <li>
                    <span className={cx("title")}>Genres:</span>
                    <span className={cx("content")}>
                        {data.genres.length > 0
                            ? data.genres.map((genre) => genre.name).join(", ")
                            : "Unknown"}
                    </span>
                </li>

                {data.media_type === category.movie ? (
                    <>
                        <li>
                            <span className={cx("title")}>Release date: </span>
                            <span className={cx("content")}>
                                {data.release_date || "Unknown"}
                            </span>
                        </li>
                        <li>
                            <span className={cx("title")}>Run time: </span>
                            <span className={cx("content")}>
                                {data.runtime
                                    ? `${data.runtime} minutes`
                                    : "Unknown"}
                            </span>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <span className={cx("title")}>
                                First episode date:
                            </span>
                            <span className={cx("content")}>
                                {data.first_air_date || "Unknown"}
                            </span>
                        </li>
                        <li>
                            <span className={cx("title")}>
                                Last episode date:
                            </span>
                            <span className={cx("content")}>
                                {data.last_air_date || "Unknown"}
                            </span>
                        </li>
                        <li>
                            <span className={cx("title")}>
                                Number of episodes:
                            </span>
                            <span className={cx("content")}>
                                {data.number_of_episodes || "Unknown"}
                            </span>
                        </li>
                    </>
                )}

                <li>
                    <span className={cx("title")}>Production Companies: </span>
                    <span className={cx("content")}>
                        {data.production_companies.length > 0
                            ? data.production_companies
                                  .map((company) => company.name)
                                  .join(", ")
                            : "Unknown"}
                    </span>
                </li>
                {data.homepage && (
                    <li>
                        <span className={cx("title")}>Home page: </span>
                        <a
                            href={data.homepage}
                            className={cx("content-link")}
                            target="_blank"
                            rel="noreferrer"
                        >
                            {data.homepage}
                        </a>
                    </li>
                )}
                <li>
                    <span className={cx("title")}>Countries: </span>
                    <span className={cx("content")}>
                        {data.production_countries.length > 0
                            ? data.production_countries
                                  .map((country) => country.name)
                                  .join(", ")
                            : "Unknown"}
                    </span>
                </li>
                <li>
                    <span className={cx("title")}>Spoken languages:</span>
                    <span className={cx("content")}>
                        {data.spoken_languages.length > 0
                            ? data.spoken_languages
                                  .map((lang) => lang.name)
                                  .join(", ")
                            : "Unknown"}
                    </span>
                </li>
                {credits && (
                    <>
                        {credits.casts && (
                            <li>
                                <span className={cx("title")}>Casts:</span>
                                <span className={cx("content")}>
                                    {credits.casts.length > 0
                                        ? credits.casts
                                              .map((cast) => cast.name)
                                              .join(", ")
                                        : "Unknown"}
                                </span>
                            </li>
                        )}
                        {credits.crews && (
                            <li>
                                <span className={cx("title")}>Crews:</span>
                                <span className={cx("content")}>
                                    {credits.crews.length > 0
                                        ? credits.crews
                                              .map((crew) => crew.name)
                                              .join(", ")
                                        : "Unknown"}
                                </span>
                            </li>
                        )}
                    </>
                )}
            </ul>

            <div className={cx("plot")}>
                <p className={cx("title")}>Plot: </p>
                <p className={cx("content")}>{data.overview}</p>
            </div>
        </div>
    );
}

export default Details;
