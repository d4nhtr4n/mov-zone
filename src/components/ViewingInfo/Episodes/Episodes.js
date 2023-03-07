import classNames from "classnames/bind";
import { useEffect, useState } from "react";

import images from "~/assets/images";
import Button from "~/components/Button";
import FallBack from "~/components/FallBack";
import Seasons from "~/components/Seasons";
import style from "./Episodes.module.scss";

const cx = classNames.bind(style);

function Episodes({ data }) {
    const [haveSeasons, setHaveSeasons] = useState(null);

    useEffect(() => {
        if (data.seasons.length > 0) {
            setHaveSeasons(true);
        } else setHaveSeasons(false);
    }, [data]);

    return haveSeasons ? (
        <Seasons
            data={data}
            defaultSeason={data.seasons[0].season_number}
            defaultEpisode={1}
        />
    ) : (
        <FallBack
            data={{
                image: images.noData,
                title: "No Episodes Found",
                detail: `Sorry! We don't have episode data for ${
                    data.name || data.title
                }. You can continue viewing other information or go back to the home page. We apologize for any inconvenience.
                `,
                buttons: [
                    <Button to="/" className={cx("button")} primary>
                        Go Home
                    </Button>,
                    <Button to="/" className={cx("button")} outline>
                        Discover Others
                    </Button>,
                ],
            }}
        />
    );
}

export default Episodes;
