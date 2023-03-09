import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
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

    const userMenuItems = [
        {
            leftIcon: <FontAwesomeIcon icon={faPlus} />,
            name: "New account",
            to: "./register",
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
                                <Image
                                    src="https://yt3.googleusercontent.com/ytc/AL5GRJWiZDd3rzTx6xkZ31_2D9_R7v-r82D2ssf51cgP=s900-c-k-c0x00ffffff-no-rj"
                                    className={cx("user-avatar")}
                                    alt=""
                                />
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
