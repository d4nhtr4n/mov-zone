import classNames from "classnames/bind";
import {
    faPlus,
    faRightFromBracket,
    faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import images from "~/assets/images";
import Button from "~/components/Button";
import Sidebar from "../../Sidebar";

import style from "./HeaderNavMenu.module.scss";
import Image from "~/components/Image";

const cx = classNames.bind(style);

function HeaderNavMenu({ user, active, handleHide, handleLogout }) {
    return (
        <div
            className={cx("mobile-nav-wrapper", {
                active: active,
            })}
            onClick={() => handleHide()}
        >
            <div
                className={cx("mobile-nav-inner")}
                onClick={(e) => e.stopPropagation()}
            >
                <div className={cx("nav-back")} onClick={() => handleHide()}>
                    <FontAwesomeIcon icon={faXmark} />
                </div>
                {user ? (
                    <div className={cx("nav-user")}>
                        <Image
                            src={user.avatar || images.defaultAvatar}
                            className={cx("user-avatar")}
                            alt=""
                        />
                        {user.name && <span>{user.name}</span>}
                    </div>
                ) : (
                    <div className="nav-user-action">
                        <Button to="/login" primary>
                            Sign in
                        </Button>
                        <Button to="/register" outline>
                            Sign up
                        </Button>
                    </div>
                )}
                <div className={cx("line")}></div>
                <Sidebar mobile={true} />
                {user && (
                    <div>
                        <div className={cx("line")}></div>
                        <Button
                            className={cx("nav-register")}
                            to="/register"
                            text
                            leftIcon={<FontAwesomeIcon icon={faPlus} />}
                        >
                            New account
                        </Button>
                        <Button
                            className={cx("nav-log-out")}
                            onClick={() => {
                                handleLogout();
                            }}
                            text
                            leftIcon={
                                <FontAwesomeIcon icon={faRightFromBracket} />
                            }
                        >
                            Log out
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default HeaderNavMenu;
