import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import usersApi from "~/api/usersApi";

import style from "./FollowButton.module.scss";

const cx = classNames.bind(style);

function FollowButton({ data, large = false, text = false }) {
    const [followed, setFollowed] = useState();

    const token = localStorage.getItem("auth_token");

    useEffect(() => {
        (async function handleCheck() {
            try {
                const response = await usersApi.checkFollowItem(
                    token,
                    data.media_type,
                    data.id
                );
                setFollowed(response.data);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [token, data]);

    return (
        <div
            className={cx("wrapper", {
                followed: followed,
                large: large,
            })}
            onClick={() => {
                if (!followed) {
                    (async function handleAdd() {
                        try {
                            const response = await usersApi.addFollowItem(
                                token,
                                data.media_type,
                                data.id
                            );
                            if (response.success) {
                                setFollowed(true);
                            }
                        } catch (error) {
                            console.log(error);
                        }
                    })();
                } else {
                    (async function handleRemove() {
                        try {
                            const response = await usersApi.removeFollowItem(
                                token,
                                data.media_type,
                                data.id
                            );
                            if (response.success) {
                                setFollowed(false);
                            }
                        } catch (error) {
                            console.log(error);
                        }
                    })();
                }
            }}
        >
            <div className={cx("button")}></div>
            {text && (
                <span className={cx("text")}>
                    {followed ? "Following" : "Follow"}
                </span>
            )}
        </div>
    );
}

export default FollowButton;
