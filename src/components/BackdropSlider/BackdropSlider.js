import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, Thumbs } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import classNames from "classnames/bind";

import { tmdbApi } from "~/api";
import { category } from "~/api/tmdbAPI/constant";
import BackdropSliderItem from "./BackdropSliderItem";
import "./CustomSwiper.scss";
import style from "./BackdropSlider.module.scss";
import Image from "../Image";

const cx = classNames.bind(style);

function BackdropSlider() {
    const [imagesNavSlider, setImagesNavSlider] = useState(null);
    const [navSliderHeight, setNavSliderHeight] = useState("");

    const [sliderData, setSliderData] = useState(null);
    const thumbSwiper = useRef();

    useEffect(() => {
        (async function handleGetTrending() {
            const response = await tmdbApi.getTrendingList(category.all, {
                params: {},
            });
            let result = response.results;
            if (result.length > 10) result = result.splice(0, 10);

            setSliderData(result);
        })();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={cx("wrapper")}>
            <div className={cx("main-slider-wrapper")}>
                <div id="backdrop-slider__slider">
                    <Swiper
                        thumbs={{
                            swiper:
                                imagesNavSlider && !imagesNavSlider.destroyed
                                    ? imagesNavSlider
                                    : null,
                            slideThumbActiveClass: "swiper-slide-thumb-active",
                        }}
                        className={cx("main-slider")}
                        direction="horizontal"
                        slidesPerView={1}
                        spaceBetween={32}
                        loop={true}
                        pagination={{
                            dynamicBullets: true,
                            clickable: true,
                        }}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
                        }}
                        onResize={(swiper) => {
                            // Set vertical thumbs swiper height equal to main swiper height
                            let newHeight;
                            if (window.innerWidth >= 768) {
                                newHeight = swiper.height;
                                setNavSliderHeight(`${newHeight}px`);
                            } else {
                                setNavSliderHeight("auto");
                            }
                        }}
                        modules={[Autoplay, Thumbs, Pagination]}
                    >
                        {sliderData &&
                            sliderData.map((slide, index) => {
                                return (
                                    <SwiperSlide key={index}>
                                        <BackdropSliderItem data={slide} />
                                    </SwiperSlide>
                                );
                            })}
                    </Swiper>
                </div>
            </div>

            <div className={cx("thumbs-slider-wrapper")}>
                <div id="backdrop-slider__thumbs">
                    <Swiper
                        ref={thumbSwiper}
                        style={{ height: navSliderHeight }}
                        className={cx("thumbs-slider")}
                        onSwiper={(swiper) => {
                            setImagesNavSlider(swiper);
                        }}
                        direction="vertical"
                        loop={true}
                        loopedSlides={10}
                        spaceBetween={12}
                        slidesPerView={5}
                        centeredSlides={true}
                        centeredSlidesBounds={true}
                        breakpoints={{
                            0: {
                                direction: "horizontal",
                            },
                            768: {
                                direction: "vertical",
                            },
                        }}
                        modules={[Navigation, Thumbs]}
                    >
                        {sliderData &&
                            sliderData.map((slide, index) => {
                                return (
                                    <SwiperSlide key={index}>
                                        <div className={cx("thumb-detail")}>
                                            <Image
                                                src={tmdbApi.getW500Image(
                                                    slide.poster_path
                                                )}
                                                alt=""
                                            />
                                            <span className={cx("thumbs-name")}>
                                                {slide.name || slide.title}
                                            </span>
                                        </div>
                                    </SwiperSlide>
                                );
                            })}
                    </Swiper>
                </div>
            </div>
        </div>
    );
}

export default BackdropSlider;
