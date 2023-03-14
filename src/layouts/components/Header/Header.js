import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBars,
    faCaretDown,
    faMagnifyingGlass,
    faPlus,
    faRightFromBracket,
    faXmark,
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
import HeaderNavMenu from "./HeaderNavMenu";

const cx = classNames.bind(style);

function Header() {
    const [user, setUser] = useState();
    const authToken = localStorage.getItem("auth_token");
    const [showMobileSearch, setShowMobileSearch] = useState(false);
    const [showMobileNav, setShowMobileNav] = useState(false);

    const { pathname } = useLocation();

    useEffect(() => {
        if (showMobileNav === true) setShowMobileNav(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

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
                <button
                    className={cx("nav-btn")}
                    onClick={() => {
                        setShowMobileNav(true);
                    }}
                >
                    <FontAwesomeIcon icon={faBars} />
                </button>

                <Link to={config.routes.home} className={cx("logo")}>
                    <img src={images.logoWithText} alt="MovZone" />
                </Link>

                <div className={cx("search-box")}>
                    <SearchBox />
                </div>

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
                            <Button
                                className={cx("register-btn")}
                                to="/register"
                                outline
                            >
                                Sign up
                            </Button>
                            <Button
                                className={cx("login-btn")}
                                to="/login"
                                primary
                            >
                                Sign in
                            </Button>
                        </>
                    )}
                </div>
                <button
                    className={cx("search-btn")}
                    onClick={() => setShowMobileSearch(true)}
                >
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>

                <div
                    className={cx("mobile-search-wrapper", {
                        active: showMobileSearch,
                    })}
                >
                    <div
                        className={cx("search-back")}
                        onClick={() => {
                            setShowMobileSearch(false);
                        }}
                    >
                        <FontAwesomeIcon icon={faXmark} />
                    </div>
                    <SearchBox />
                </div>
            </div>

            <HeaderNavMenu
                user={user}
                active={showMobileNav}
                handleHide={() => setShowMobileNav(false)}
                handleLogout={() => {
                    setUser(null);
                    localStorage.removeItem("auth_token");
                }}
            />
        </header>
    );
}

export default Header;
