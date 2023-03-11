import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCaretDown,
    faPlus,
    faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";

import DropdownMenu from "~/components/DropdownMenu";
import Button from "~/components/Button";
import Image from "~/components/Image";
import SearchBox from "./SearchBox";
import images from "~/assets/images";
import config from "~/config";
import style from "./Header.module.scss";
import usersApi from "~/api/usersApi";

const cx = classNames.bind(style);

function Header() {
    const [user, setUser] = useState();
    const authToken = localStorage.getItem("auth_token");

    let userMenuItems = [
        {
            leftIcon: <FontAwesomeIcon icon={faPlus} />,
            name: "New account",
            to: "/register",
        },
        {
            leftIcon: <FontAwesomeIcon icon={faRightFromBracket} />,
            name: "Log out",
            onClick: () => {
                setUser(null);
                localStorage.removeItem("auth_token");
            },
        },
    ];

    if (user && user.name) {
        userMenuItems = [
            { name: user.name, to: "/", breakPoint: true },
            ...userMenuItems,
        ];
    }

    useEffect(() => {
        if (!authToken) return;
        (async function handleLogin() {
            try {
                const response = await usersApi.getMyProfile(authToken);
                if (response.success) setUser(response.data);
            } catch (error) {
                setUser(null);
            }
        })();
    }, [authToken]);

    const handleDropDownMenuChange = (MenuItem) => {
        // console.log(MenuItem);
    };

    return (
        <header className={cx("wrapper")}>
            <div className={cx("inner")}>
                <Link to={config.routes.home} className={cx("logo")}>
                    <img src={images.logoWithText} alt="MovZone" />
                </Link>

                <SearchBox />

                <div className={cx("user-action")}>
                    {user ? (
                        <div className={cx("user-section")}>
                            <DropdownMenu
                                items={userMenuItems}
                                onChange={handleDropDownMenuChange}
                            >
                                <div className={cx("user-info")}>
                                    <Image
                                        src={
                                            user.avatar || images.defaultAvatar
                                        }
                                        className={cx("user-avatar")}
                                        alt=""
                                    />
                                    <span>
                                        <FontAwesomeIcon icon={faCaretDown} />
                                    </span>
                                </div>
                            </DropdownMenu>
                        </div>
                    ) : (
                        <>
                            <Button to="/login" outline>
                                Sign in
                            </Button>
                            <Button to="/register" primary>
                                Sign up
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
