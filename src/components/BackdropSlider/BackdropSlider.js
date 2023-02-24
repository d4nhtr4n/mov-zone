import { useEffect, useRef, useState } from "react";
import { Col, Row, Container } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, Thumbs } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import classNames from "classnames/bind";

import { tmdbApi } from "~/api";
import { useDebounce } from "~/hooks";
import { category } from "~/api/tmdbAPI/constant";
import useWindowSize from "~/hooks/useWindowSize";
import BackdropSliderItem from "./BackdropSliderItem";
import "./CustomSwiper.scss";
import style from "./BackdropSlider.module.scss";

const cx = classNames.bind(style);

function BackdropSlider() {
    const [imagesNavSlider, setImagesNavSlider] = useState(null);
    const [navSliderHeight, setNavSliderHeight] = useState("");

    const windowSize = useWindowSize();
    const windowWidthDebounced = useDebounce(windowSize.width, 100);

    const mainSlider = useRef();
    const thumbSlider = useRef();

    const [sliderData, setSliderData] = useState(null);

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

    useEffect(() => {
        if (window.innerWidth >= 768) {
            const newHeight = mainSlider.current.offsetHeight;
            setNavSliderHeight(`${newHeight}px`);
        } else {
            setNavSliderHeight("auto");
        }
    }, [windowWidthDebounced]);

    return (
        <Container fluid="md" className={cx("wrapper")}>
            <Row>
                <Col md={10}>
                    <div id="backdrop-slider__slider">
                        <Swiper
                            ref={mainSlider}
                            thumbs={{
                                swiper:
                                    imagesNavSlider &&
                                    !imagesNavSlider.destroyed
                                        ? imagesNavSlider
                                        : null,
                                slideThumbActiveClass:
                                    "swiper-slide-thumb-active",
                            }}
                            className={cx("slider-wrapper")}
                            direction="horizontal"
                            slidesPerView={1}
                            spaceBetween={32}
                            loop={true}
                            pagination={{
                                dynamicBullets: true,
                                clickable: true,
                            }}
                            navigation={true}
                            autoplay={{
                                delay: 5000,
                                disableOnInteraction: false,
                            }}
                            modules={[Autoplay, Navigation, Thumbs, Pagination]}
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
                </Col>

                <Col md={2} className="d-none d-sm-block">
                    <div id="backdrop-slider__thumbs">
                        <Swiper
                            ref={thumbSlider}
                            style={{ height: navSliderHeight }}
                            className={cx("slider-thumbs")}
                            onSwiper={(swiper) => {
                                setImagesNavSlider(swiper);
                            }}
                            direction="vertical"
                            loop={true}
                            loopedSlides={10}
                            slidesPerView={5}
                            centeredSlides={true}
                            centeredSlidesBounds={true}
                            breakpoints={{
                                0: {
                                    direction: "horizontal",
                                },
                                768: {
                                    direction: "vertical",
                                    spaceBetween: 12,
                                },
                            }}
                            modules={[Navigation, Thumbs]}
                        >
                            {sliderData &&
                                sliderData.map((slide, index) => {
                                    return (
                                        <SwiperSlide key={index}>
                                            <div
                                                className={cx("thumbs-detail")}
                                            >
                                                <img
                                                    src={tmdbApi.getW500Image(
                                                        slide.poster_path
                                                    )}
                                                    alt=""
                                                />
                                                <span
                                                    className={cx(
                                                        "thumbs-name"
                                                    )}
                                                >
                                                    {slide.name || slide.title}
                                                </span>
                                            </div>
                                        </SwiperSlide>
                                    );
                                })}
                        </Swiper>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default BackdropSlider;
