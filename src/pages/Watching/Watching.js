import classNames from "classnames/bind";
import { Suspense, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import videoApi from "~/api/videoApi";
import style from "./Watching.module.scss";
import { tmdbApi } from "~/api";
import Button from "~/components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowLeft,
    faBookmark,
    faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";
import PosterCardSwiper from "~/components/PosterCardSwiper";
import PosterCardList from "~/components/PosterCardList";

const cx = classNames.bind(style);

function Watching() {
    const nav = useNavigate();
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
            setDetails(result);
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
                api: () => tmdbApi.getSimilar(params.type, params.id),
            },
            {
                media_type: params.type,
                title: "Recommendations",
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [detail]);

    console.log(detail);
    console.log(episodeInfo);

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
                    <Button
                        small
                        text
                        onClick={() => {
                            nav(-1);
                        }}
                        leftIcon={<FontAwesomeIcon icon={faArrowLeft} />}
                    >
                        Back
                    </Button>
                    {detail && (
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
                                        <FontAwesomeIcon icon={faCircleInfo} />
                                    }
                                >
                                    Details
                                </Button>
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
                    <div className={cx("follow-button")}>
                        <Button
                            primary
                            leftIcon={<FontAwesomeIcon icon={faBookmark} />}
                        >
                            Follow
                        </Button>
                    </div>
                </div>
            </div>
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
                            <PosterCardList
                                key={index}
                                data={item}
                                onFail={item.onFail}
                                onSuccess={item.onSuccess}
                            />
                        </Suspense>
                    ))}
            </div>
        </Container>
    );
}

export default Watching;
