import { Container } from "react-bootstrap";
import classNames from "classnames/bind";

import style from "./ViewingTracker.module.scss";
import PosterCardSwiper from "../PosterCardSwiper";
import FallBack from "../FallBack";
import images from "~/assets/images";
import Button from "../Button";

const cx = classNames.bind(style);

function ViewingTracker() {
    const recentlySkimmed = JSON.parse(
        localStorage.getItem(`recently_skimmed`)
    );
    const recentlyWatching = JSON.parse(
        localStorage.getItem(`recently_watching`)
    );
    return (
        <Container>
            {recentlySkimmed || recentlyWatching ? (
                <div className={cx("content-wrapper")}>
                    {recentlySkimmed && (
                        <PosterCardSwiper
                            extendable={false}
                            data={{
                                title: "Recently Skimmed",
                                description:
                                    "Catch up on the latest movies or TVs you might have missed with our recently skimmed list.",
                                slides: recentlySkimmed,
                            }}
                        />
                    )}
                    {recentlyWatching && (
                        <PosterCardSwiper
                            extendable={false}
                            data={{
                                title: "Recently Watching",
                                description:
                                    "Take a deep dive into the movies we've been recently watching!",
                                slides: recentlyWatching,
                            }}
                        />
                    )}
                </div>
            ) : (
                <FallBack
                    data={{
                        image: images.noData,
                        title: "No Infomations Found",
                        detail: "Sorry! We don't have any viewing information from you. Perhaps you are a new user. Oh! Welcome to MovZone! You can go to the home page to discover some interesting things. We apologize for any inconvenience and hope you have a great time with us.",
                        buttons: [
                            <Button to="/" className={cx("button")} primary>
                                Discover Now
                            </Button>,
                        ],
                    }}
                />
            )}
        </Container>
    );
}

export default ViewingTracker;
