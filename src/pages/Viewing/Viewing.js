import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import classNames from "classnames/bind";
import { Container } from "react-bootstrap";

import ViewingHeading from "~/components/ViewingHeading";
import ViewingInfo from "~/components/ViewingInfo";
import { tmdbApi } from "~/api";
import style from "./Viewing.module.scss";
import ViewingTracker from "~/components/ViewingTracker";

const cx = classNames.bind(style);

function Viewing() {
    const params = useParams();
    const [data, setData] = useState(null);
    const [haveData, setHaveData] = useState(true);

    useEffect(() => {
        // Check empty params
        // If params empty -> data null -> render ViewingTracking
        if (Object.keys(params).length === 0) {
            setHaveData(false);
            return;
        }

        (async function handleGetData() {
            const response = await tmdbApi.getDetail(params.type, params.id, {
                params: {},
            });
            if (response.length <= 0) setHaveData(false);
            else setHaveData(true);
            setData({ ...response, media_type: params.type });
        })();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params]);

    // Push data to localStorage: recently_skimmed
    useEffect(() => {
        if (data) {
            let recentlySkimmed =
                JSON.parse(localStorage.getItem(`recently_skimmed`)) || [];
            const loopedIndex = recentlySkimmed.findIndex(
                (recent) =>
                    recent.id === data.id &&
                    recent.media_type === data.media_type
            );

            if (loopedIndex === 0) {
                // This data is save in the front, no action needed
                return;
            } else {
                if (loopedIndex > 0) {
                    // Data stored in middle of array -> bring to front
                    recentlySkimmed.unshift(
                        recentlySkimmed.splice(loopedIndex, 1)[0]
                    );
                } else if (loopedIndex < 0) {
                    // Un save data -> add to front
                    recentlySkimmed.unshift(data);
                    // limit at 20 items
                    if (recentlySkimmed.length > 20)
                        recentlySkimmed = recentlySkimmed.splice(0, 20);
                }
                localStorage.setItem(
                    "recently_skimmed",
                    JSON.stringify(recentlySkimmed)
                );
            }
        }
    }, [data]);

    return haveData ? (
        data && (
            <>
                <ViewingHeading data={data} />
                <Container className={cx("content-wrapper")}>
                    <div className={cx("content")}>
                        <ViewingInfo data={data} />
                    </div>
                </Container>
            </>
        )
    ) : (
        <ViewingTracker />
    );
}

export default Viewing;
