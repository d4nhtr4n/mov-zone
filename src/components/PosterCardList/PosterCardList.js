import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import PosterCard from "../PosterCard/PosterCard";

import style from "./PosterCardList.module.scss";

const cx = classNames.bind(style);

function PosterCardList({ data }) {
    const [sliderData, setSliderData] = useState(null);
    const navPrev = useRef();
    const navNext = useRef();

    useEffect(() => {
        (async function handleGetTrending() {
            const response = await data.api();
            let result = response.results;
            if (result.length > 10) result = result.splice(0, 10);

            setSliderData(result);
        })();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        sliderData && (
            <div className={cx("wrapper")}>
                <div className={cx("heading")}>
                    <div className={cx("info")}>
                        <h3 className={cx("title")}>{data.title}</h3>
                        <div className={cx("more-wrapper")}>
                            <Link className={cx("more-btn")} to={""}>
                                <span>See all</span>
                                <FontAwesomeIcon icon={faAngleRight} />
                            </Link>
                        </div>
                    </div>
                    <div className={cx("navigation")}>
                        <div ref={navPrev} className={cx("nav-prev")}>
                            <FontAwesomeIcon icon={faAngleLeft} />
                        </div>
                        <div ref={navNext} className={cx("nav-next")}>
                            <FontAwesomeIcon icon={faAngleRight} />
                        </div>
                    </div>
                </div>
                <Swiper
                    direction="horizontal"
                    slidesPerView={5}
                    spaceBetween={24}
                    navigation={{
                        prevEl: navPrev.current,
                        nextEl: navNext.current,
                        disabledClass: cx("nav-disable"),
                    }}
                    onBeforeInit={(swiper) => {
                        swiper.params.navigation.prevEl = navPrev.current;
                        swiper.params.navigation.nextEl = navNext.current;
                    }}
                    breakpoints={{
                        0: {
                            slidesPerView: 1.5,
                            spaceBetween: 12,
                        },
                        576: {
                            slidesPerView: 4,
                            spaceBetween: 18,
                        },
                        768: {
                            slidesPerView: 5,
                            spaceBetween: 24,
                        },
                    }}
                    modules={[Navigation]}
                >
                    {sliderData &&
                        sliderData.map((slider, index) => (
                            <SwiperSlide key={index}>
                                <PosterCard
                                    data={{
                                        ...slider,
                                        media_type: data.media_type,
                                    }}
                                />
                            </SwiperSlide>
                        ))}
                </Swiper>
            </div>
        )
    );
}

export default PosterCardList;
