import { category } from "~/api/constant";
import BTabs from "../BTabs";
import Details from "./Details";
import Related from "./Related";
import Episodes from "./Episodes";
import VideosList from "./VideosList";

function ViewingInfo({ data }) {
    let TABS = [
        {
            title: "DETAILS",
            content: <Details data={data} />,
        },
        // {
        //     title: "RATINGS & REVIEWS",
        //     content: <h1>RATINGS & REVIEWS</h1>,
        // },
        {
            title: "TRAILERS & CUTS",
            content: <VideosList data={data} />,
        },
        {
            title: "RELATED",
            content: <Related data={data} />,
        },
    ];

    if (data.media_type === category.tv) {
        // Add "SEASONS" tab at index=1
        TABS = [
            // slice(start, end) - !not include end
            ...TABS.slice(0, 1),
            {
                title: "EPISODES",
                content: <Episodes data={data} />,
            },
            ...TABS.slice(1, TABS.length),
        ];
    }

    return <BTabs tabs={TABS} />;
}

export default ViewingInfo;
