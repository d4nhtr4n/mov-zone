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

function PosterCardList({ data, onFail = () => {}, onSuccess = () => {} }) {
    const [sliderData, setSliderData] = useState(null);
    const navPrev = useRef();
    const navNext = useRef();

    useEffect(() => {
        (async function handleGetData() {
            const response = await data.api();
            let result = response.results;
            setSliderData(result);
        })();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    useEffect(() => {
        if (sliderData) {
            if (sliderData.length <= 0) onFail();
            else onSuccess();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sliderData]);

    return (
        sliderData &&
        sliderData.length > 0 && (
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
                        hiddenClass: cx("nav-hidden"),
                    }}
                    onBeforeInit={(swiper) => {
                        swiper.params.navigation.prevEl = navPrev.current;
                        swiper.params.navigation.nextEl = navNext.current;
                    }}
                    breakpoints={{
                        0: {
                            slidesPerView: 1.5,
                            spaceBetween: 12,
                            slidesPerGroup: 1,
                        },
                        576: {
                            slidesPerView: 4,
                            spaceBetween: 18,
                            slidesPerGroup: 4,
                        },
                        768: {
                            slidesPerView: 5,
                            spaceBetween: 24,
                            slidesPerGroup: 5,
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
