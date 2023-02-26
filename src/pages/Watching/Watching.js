import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { tmdbApi } from "~/api";
import WatchingHeading from "~/components/WatchingHeading";

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

            setData(response);
            console.log(response);
        })();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params]);

    return (
        <div>
            {data && (
                <WatchingHeading data={{ ...data, media_type: params.type }} />
            )}
            <div style={{ height: 1000 }}></div>
        </div>
    );
}

export default Movie;
