import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import classNames from "classnames/bind";

import { tmdbApi } from "~/api";
import WatchingHeading from "~/components/WatchingHeading";
import style from "./Watching.module.scss";
import WatchingInfo from "~/components/WatchingInfo";
import { Container } from "react-bootstrap";

const cx = classNames.bind(style);

function Movie() {
    const params = useParams();
    const [data, setData] = useState();

    useEffect(() => {
        // if (Object.values(params).some((value) => value.includes(":"))) {
        //     return;
        // }

        (async function handleGetData() {
            const response = await tmdbApi.getDetail(params.type, params.id, {
                params: {},
            });

            setData({ ...response, media_type: params.type });
        })();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params]);

    return (
        <div>
            {data && (
                <>
                    <WatchingHeading data={data} />
                    <Container className={cx("content-wrapper")}>
                        <div className={cx("content")}>
                            <WatchingInfo data={data} />
                        </div>
                    </Container>
                </>
            )}
        </div>
    );
}

export default Movie;
