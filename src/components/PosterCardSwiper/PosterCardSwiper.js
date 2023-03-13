import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import classNames from "classnames/bind";

import style from "./PosterCardSwiper.module.scss";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import PosterCard from "../PosterCard/PosterCard";

const cx = classNames.bind(style);

function PosterCardSwiper({ data, extendable = true }) {
    const navPrev = useRef();
    const navNext = useRef();

    useEffect(() => {
        // Hide nav button when init if both navs are disable
        if (navPrev.current && navNext.current) {
            if (
                navPrev.current.classList.contains(cx("nav-disable")) &&
                navNext.current.classList.contains(cx("nav-disable"))
            ) {
                navPrev.current.classList.add(cx("nav-hidden"));
                navNext.current.classList.add(cx("nav-hidden"));
            }
        }
    }, []);

    return (
        <div className={cx("wrapper")}>
            <div className={cx("heading")}>
                <div className={cx("info")}>
                    <div className={cx("title-wrapper")}>
                        <h3 className={cx("title")}>{data.title}</h3>

                        {extendable && (
                            <div className={cx("more-wrapper")}>
                                <Link className={cx("more-btn")} to={""}>
                                    <span>See all</span>
                                    <FontAwesomeIcon icon={faAngleRight} />
                                </Link>
                            </div>
                        )}
                    </div>
                    {data.description && (
                        <h5 className={cx("description")}>
                            {data.description}
                        </h5>
                    )}
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
                        slidesPerGroup: 1,
                    },
                    576: {
                        slidesPerView: 2.5,
                        spaceBetween: 12,
                        slidesPerGroup: 2,
                    },
                    768: {
                        slidesPerView: 3.5,
                        spaceBetween: 18,
                        slidesPerGroup: 3,
                    },
                    992: {
                        slidesPerView: 5,
                        spaceBetween: 24,
                        slidesPerGroup: 5,
                    },
                }}
                modules={[Navigation]}
            >
                {data.slides &&
                    data.slides.map((slide, index) => (
                        <SwiperSlide key={index}>
                            <PosterCard
                                data={{
                                    ...slide,
                                    media_type:
                                        slide.media_type || data.media_type,
                                }}
                            />
                        </SwiperSlide>
                    ))}
            </Swiper>
        </div>
    );
}

export default PosterCardSwiper;
