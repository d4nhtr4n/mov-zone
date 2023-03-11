import classNames from "classnames/bind";
import { useEffect, useState } from "react";

import { Container } from "react-bootstrap";

import { category } from "~/api/constant";
import usersApi from "~/api/usersApi";
import images from "~/assets/images";
import BTabs from "~/components/BTabs";
import Button from "~/components/Button";
import FallBack from "~/components/FallBack";
import style from "./Following.module.scss";
import FollowingList from "./FollowingList";

const cx = classNames.bind(style);

function Following() {
    const [logedIn, setLogedIn] = useState();
    const authToken = localStorage.getItem("auth_token");
    const token = localStorage.getItem("auth_token");

    let TABS = [
        {
            title: "TV SERIES",
            content: (
                <FollowingList
                    data={{
                        media_type: category.tv,
                        api: () => usersApi.getFollowList(token, category.tv),
                    }}
                />
            ),
        },
        {
            title: "MOVIES",
            content: (
                <FollowingList
                    data={{
                        media_type: category.movie,
                        api: () =>
                            usersApi.getFollowList(token, category.movie),
                    }}
                />
            ),
        },
    ];

    useEffect(() => {
        if (!authToken) return;
        (async function handleGetIn() {
            try {
                const response = await usersApi.getMyProfile(authToken);
                console.log(response);
                if (response.success) setLogedIn(true);
                else setLogedIn(false);
            } catch (error) {
                setLogedIn(false);
            }
        })();
    }, [authToken]);

    return (
        <Container>
            {logedIn ? (
                <div className={cx("wrapper")}>
                    <div className={cx("heading")}>
                        <h1 className={cx("title")}>My Following List</h1>
                    </div>
                    <div className={cx("content")}>
                        <BTabs tabs={TABS} />
                    </div>
                </div>
            ) : (
                <div className={cx("wrapper")}>
                    <FallBack
                        data={{
                            image: images.ghosts,
                            title: "Account Only Feature",
                            detail: "Welcome to MovZone! We're excited to offer a range of great features to help you make the most of your experience with us. However, please note that some of our features are only available to registered users. To access this features, you'll need to create an account and log in.",
                            buttons: [
                                <Button to={"/register"} primary>
                                    Create New Account
                                </Button>,
                                <Button to={"/login"} outline>
                                    Login Now
                                </Button>,
                            ],
                        }}
                    />
                </div>
            )}
        </Container>
    );
}

export default Following;
