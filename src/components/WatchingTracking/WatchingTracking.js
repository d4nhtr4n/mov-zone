import { Container } from "react-bootstrap";
import classNames from "classnames/bind";

import PosterCardSwiper from "../PosterCardSwiper";
import style from "./WatchingTracking.module.scss";

const cx = classNames.bind(style);

function WatchingTracking() {
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

export default WatchingTracking;
