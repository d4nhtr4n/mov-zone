import { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { tmdbApi } from "~/api";
import PosterCard from "~/components/PosterCard";
import FilterController from "./FilterController";

import classNames from "classnames/bind";

import style from "./Filter.module.scss";
import CustomPagination from "~/components/CustomPagination";
import FallBack from "~/components/FallBack";
import images from "~/assets/images";
import Button from "~/components/Button";

const cx = classNames.bind(style);

function Filter() {
    const [show, setShow] = useState(true);
    const [data, setData] = useState();
    const [options, setOptions] = useState(null);
    const [page, setPage] = useState(1);
    const [totalRecord, setTotalRecord] = useState();

    const contentWrapperRef = useRef();

    function handleGetOption(option) {
        setOptions(option);
    }

    function handlePaginationChange(currentPage) {
        setPage(currentPage);
    }

    useEffect(() => {
        if (!options) return;
        (async function handleGetData() {
            const response = await tmdbApi.discover(options.mediaType, {
                params: {
                    sort_by: options.sortBy,
                    with_genres: options.genres.join(","),
                    with_watch_monetization_types: "flatrate",
                    ...options.year,
                    page,
                },
            });
            const result = response.results;
            if (result.length > 0) {
                setShow(true);
            } else setShow(false);
            setTotalRecord(response.total_results);
            setData(result);
            setPage(1);
            contentWrapperRef.current.scrollIntoView(true);
        })();
    }, [options, page]);

    return (
        <Container className={cx("wrapper")}>
            <FilterController onSubmit={handleGetOption} />
            <div ref={contentWrapperRef} className={cx("content")}>
                {show ? (
                    data && (
                        <Container>
                            <Row>
                                {data.map((item, index) => (
                                    <Col
                                        key={index}
                                        md={2}
                                        className={cx("card")}
                                    >
                                        <PosterCard
                                            data={{
                                                ...item,
                                                media_type: options.mediaType,
                                            }}
                                        />
                                    </Col>
                                ))}
                            </Row>
                            <Row>
                                <div className={cx("pagination-wrapper")}>
                                    <CustomPagination
                                        totalRecord={totalRecord}
                                        onChange={handlePaginationChange}
                                        current={page}
                                    />
                                </div>
                            </Row>
                        </Container>
                    )
                ) : (
                    <FallBack
                        data={{
                            image: images.notFound,
                            title: `Results Not Found`,
                            detail: "Sorry, we couldn't find any results matching your search query. Please try changing your search options and searching again. You may want to try using different keywords or narrowing your search by adding more specific details. Alternatively, you can check out our related topics section for similar information. Thank you for using our service, and we hope you find what you're looking for!",
                            buttons: [
                                <Button to={"/"} primary>
                                    Discover
                                </Button>,
                            ],
                        }}
                    />
                )}
            </div>
        </Container>
    );
}

export default Filter;
