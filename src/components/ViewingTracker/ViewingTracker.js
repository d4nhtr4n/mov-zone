import { Container } from "react-bootstrap";
import classNames from "classnames/bind";

import style from "./ViewingTracker.module.scss";
import PosterCardSwiper from "../PosterCardSwiper";

const cx = classNames.bind(style);

function ViewingTracker() {
    const recentlySkimmed = JSON.parse(
        localStorage.getItem(`recently_skimmed`)
    );
    return (
        <Container>
            <div className={cx("content-wrapper")}>
                {recentlySkimmed && (
                    <PosterCardSwiper
                        extendable={false}
                        data={{
                            title: "Recently Skimmed",
                            slides: recentlySkimmed,
                        }}
                    />
                )}
            </div>
        </Container>
    );
}

export default ViewingTracker;
