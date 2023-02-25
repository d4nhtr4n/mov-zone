import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { tmdbApi } from "~/api";
import WatchingGeneralInfo from "~/components/WatchingGeneralInfo";

function Movie() {
    const params = useParams();
    const [data, setData] = useState();

    useEffect(() => {
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
                <WatchingGeneralInfo
                    data={{ ...data, media_type: params.type }}
                />
            )}
            <div style={{ height: 1000 }}></div>
        </div>
    );
}

export default Movie;
