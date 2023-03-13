import classNames from "classnames/bind";
import { Suspense, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import videoApi from "~/api/videoApi";
import style from "./Watching.module.scss";
import tmdbApi from "~/api/tmdbApi";
import Button from "~/components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import PosterCardSwiper from "~/components/PosterCardSwiper";
import PosterCardList from "~/components/PosterCardList";
import Seasons from "~/components/Seasons";
import { category } from "~/api/constant";
import FollowButton from "~/components/FollowButton";

const cx = classNames.bind(style);

function Watching() {
    const params = useParams();
    const [videoUrl, setVideoUrl] = useState("");
    const [episodeInfo, setEpisodeInfo] = useState("");
    const [collection, setCollection] = useState();
    const [detail, setDetails] = useState("");

    const [list, setList] = useState();

    // Display url with params
    useEffect(() => {
        setVideoUrl(
            videoApi.getVideo(
                params.type,
                params.id,
                params.season,
                params.episode
            )
        );

        (async function handleGetDetails() {
            const response = await tmdbApi.getDetail(params.type, params.id, {
                params: {},
            });
            let result = response;
            setDetails({ media_type: params.type, ...result });
        })();

        (async function handleGetEpisodeInfo() {
            const response = await tmdbApi.getTVEposide(
                params.id,
                params.season,
                params.episode
            );
            let result = response;
            setEpisodeInfo(result);
        })();

        setList([
            {
                media_type: params.type,
                title: "Similars",
                description:
                    "Explore movies that are similar in theme, genre, or style to your favorites.",
                api: () => tmdbApi.getSimilar(params.type, params.id),
            },
            {
                media_type: params.type,
                title: "Recommendations",
                description:
                    "Let us recommend movies tailored to your interests and taste.",
                api: () => tmdbApi.getRecommendations(params.type, params.id),
            },
        ]);
    }, [params]);

    useEffect(() => {
        if (!detail) return;

        if (detail.belongs_to_collection) {
            (async function handlegetMovieCollections() {
                const response = await tmdbApi.getMovieCollection(
                    detail.belongs_to_collection.id
                );
                let result = response.parts;

                setCollection(result);
            })();
        } else setCollection(null);

        // Save to localStorage
        let recentlyWatching =
            JSON.parse(localStorage.getItem(`recently_watching`)) || [];
        const loopedIndex = recentlyWatching.findIndex(
            (recent) =>
                recent.id === detail.id &&
                recent.media_type === detail.media_type
        );

        if (loopedIndex === 0) {
            // This data is save in the front, no action needed
            return;
        } else {
            if (loopedIndex > 0) {
                // Data stored in middle of array -> bring to front
                recentlyWatching.unshift(
                    recentlyWatching.splice(loopedIndex, 1)[0]
                );
            } else if (loopedIndex < 0) {
                // Un save data -> add to front
                recentlyWatching.unshift(detail);
                // limit at 20 items
                if (recentlyWatching.length > 20)
                    recentlyWatching = recentlyWatching.splice(0, 20);
            }
            localStorage.setItem(
                "recently_watching",
                JSON.stringify(recentlyWatching)
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [detail]);

    return (
        <Container>
            <div className={cx("wrapper")}>
                <div className={cx("video")}>
                    {videoUrl && (
                        <iframe
                            style={{
                                position: "relative",
                                width: "100%",
                                height: "100%",
                            }}
                            src={videoUrl}
                            allowFullScreen
                            title={videoUrl}
                        />
                    )}
                </div>

                <div className={cx("info")}>
                    {detail && (
                        <>
                            <div className={cx("heading")}>
                                <h1 className={cx("name")}>
                                    {detail.name || detail.title}
                                </h1>
                                {detail.tagline && (
                                    <q className={cx("tagline")}>
                                        {detail.tagline}
                                    </q>
                                )}

                                <div className={cx("detail-button")}>
                                    <Button
                                        to={`/view/${params.type}/${params.id}`}
                                        text
                                        small
                                        leftIcon={
                                            <FontAwesomeIcon
                                                icon={faCircleInfo}
                                            />
                                        }
                                    >
                                        Details
                                    </Button>
                                </div>
                                <div className={cx("follow-btn-wrapper")}>
                                    <FollowButton large data={detail} />
                                </div>
                                <p className={cx("genres")}>
                                    {`Genres: ${detail.genres
                                        .map((genre) => genre.name)
                                        .join(", ")}`}
                                </p>
                                {detail.runtime && (
                                    <p className={cx("runtime")}>
                                        {`Run time: ${detail.runtime} minutes`}
                                    </p>
                                )}
                            </div>
                        </>
                    )}

                    {episodeInfo && (
                        <>
                            <p
                                className={cx("episode-name")}
                            >{`Episode ${episodeInfo.episode_number}: ${episodeInfo.name}`}</p>
                            {episodeInfo.runtime && (
                                <p className={cx("runtime")}>
                                    {`Run time: ${episodeInfo.runtime} minutes`}
                                </p>
                            )}
                        </>
                    )}
                </div>
            </div>

            {params.type === category.tv && detail && (
                <div className={cx("seasons-wrapper")}>
                    <Seasons
                        simplify={true}
                        epSelectable={true}
                        data={detail}
                        defaultSeason={params.season}
                        defaultEpisode={params.episode}
                    />
                </div>
            )}

            <div className={cx("list")}>
                {collection && (
                    <PosterCardSwiper
                        extendable={false}
                        data={{
                            title: detail.belongs_to_collection.name,
                            slides: collection,
                        }}
                    />
                )}
                {list &&
                    list.map((item, index) => (
                        <Suspense key={index} fallback={<></>}>
                            <PosterCardList key={index} data={item} />
                        </Suspense>
                    ))}
            </div>
        </Container>
    );
}

export default Watching;
