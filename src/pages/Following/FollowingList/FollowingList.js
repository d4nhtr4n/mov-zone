import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { category } from "~/api/constant";
import usersApi from "~/api/usersApi";
import images from "~/assets/images";
import Button from "~/components/Button";
import FallBack from "~/components/FallBack";
import FollowingCard from "../FollowingCard";

import style from "./FollowingList.module.scss";

const cx = classNames.bind(style);

function FollowingList({ data }) {
    const [list, setList] = useState();
    const [haveData, setHaveData] = useState(true);
    const token = localStorage.getItem("auth_token");
    useEffect(() => {
        (async function handleGet() {
            const movies = await data.api();
            if (movies.data && movies.data.length > 0) {
                setList(movies.data);
                setHaveData(true);
            } else {
                setHaveData(false);
            }
        })();
    }, [data]);

    function handleRemove(media_type, id) {
        (async function handleRemove() {
            try {
                const response = await usersApi.removeFollowItem(
                    token,
                    media_type,
                    id
                );
                if (response.success) {
                    if (response.data && response.data.length > 0) {
                        setHaveData(true);
                    } else {
                        setHaveData(false);
                    }
                    setList(response.data);
                }
            } catch (error) {
                console.log(error);
            }
        })();
    }
    return haveData ? (
        <div className={cx("content")}>
            <div className={cx("list")}>
                {list &&
                    list.map((item, index) => (
                        <FollowingCard
                            key={index}
                            data={{ media_type: data.media_type, id: item }}
                            onRemove={() => {
                                handleRemove(data.media_type, item);
                            }}
                        />
                    ))}
            </div>
        </div>
    ) : (
        <FallBack
            data={{
                image: images.noData,
                title: `No ${
                    data.media_type === category.movie
                        ? "Movies"
                        : data.media_type === category.tv
                        ? "TV Series"
                        : "Info"
                } Found`,
                detail: "Sorry! We don't have any information for the following list as you haven't provided it. You can discover new things on the home page or review things you may have missed on the watching page. Follow them, and then we will store the information here. We apologize for any inconvenience.",
                buttons: [
                    <Button to={"/"} primary>
                        Discover
                    </Button>,
                ],
            }}
        />
    );
}

export default FollowingList;
