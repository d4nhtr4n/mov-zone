import { useEffect, useState } from "react";
import PosterCardSwiper from "../PosterCardSwiper/PosterCardSwiper";

function PosterCardList({ data, onFail = () => {}, onSuccess = () => {} }) {
    const [sliderData, setSliderData] = useState(null);

    useEffect(() => {
        (async function handleGetData() {
            const response = await data.api();
            let result = response.results;
            setSliderData(result);
        })();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    useEffect(() => {
        if (sliderData) {
            if (sliderData.length <= 0) onFail();
            else onSuccess();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sliderData]);

    return (
        sliderData &&
        sliderData.length > 0 && (
            <PosterCardSwiper
                data={{
                    title: data.title,
                    slides: sliderData,
                    media_type: data.media_type,
                }}
            />
        )
    );
}

export default PosterCardList;
