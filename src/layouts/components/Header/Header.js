import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faGlobe,
    faLanguage,
    faRepeat,
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

const cx = classNames.bind(style);

const userMenuItems = [
    {
        leftIcon: <FontAwesomeIcon icon={faLanguage} />,
        name: "Language",
        children: {
            title: "Language",
            data: [
                {
                    type: "language",
                    code: "en",
                    name: "English",
                },
                {
                    type: "language",
                    code: "vi",
                    name: "Tiếng Việt",
                },
            ],
        },
    },
    {
        leftIcon: <FontAwesomeIcon icon={faGlobe} />,
        name: "Location",
        breakPoint: true,
    },
    {
        leftIcon: <FontAwesomeIcon icon={faRepeat} />,
        name: "Switch user",
        children: {
            title: "Accounts",
            data: [
                {
                    type: "account",
                    code: "dt",
                    name: "Danh Tran",
                },
                {
                    type: "account",
                    code: "tqd",
                    name: "Tran Quoc Danh",
                },
            ],
        },
    },
    {
        leftIcon: <FontAwesomeIcon icon={faRightFromBracket} />,
        name: "Log out",
        to: "/auth",
    },
];

function Header() {
    const [currentUser, setCurrentUser] = useState(undefined);
    const handleDropDownMenuChange = (MenuItem) => {
        console.log(MenuItem);
    };

    useEffect(() => setCurrentUser(), []);

    return (
        <header className={cx("wrapper")}>
            <div className={cx("inner")}>
                <Link to={config.routes.home} className={cx("logo")}>
                    <img src={images.logoWithText} alt="MovZone" />
                </Link>

                <SearchBox />

                <div className={cx("user-action")}>
                    {currentUser ? (
                        <div className={cx("user-section")}>
                            {/* User notifications */}

                            {/* <Tippy
                                    interactive
                                    placement="bottom-end"
                                    
                                    render={(attrs) => (
                                        <div
                                            className={cx("")}
                                            tabIndex="-1"
                                            {...attrs}
                                        >
                                            <PoperWrapper>
                                                <p>Features in development</p>
                                            </PoperWrapper>
                                        </div>
                                    )}
                                >
                                    <div className={cx("user-notify")}>
                                        <FontAwesomeIcon icon={faBell} />
                                    </div>
                                </Tippy> */}

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
                            <Button outline>Log in</Button>
                            <Button primary>Sign up</Button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
