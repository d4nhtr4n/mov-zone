import {
    faBookmark,
    faFilm,
    faFilter,
    faGear,
    faHome,
    faRankingStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import config from "~/config";
import Menu from "./Menu";
import style from "./Sidebar.module.scss";

const cx = classNames.bind(style);

const menu = [
    {
        title: "Home",
        icon: <FontAwesomeIcon icon={faHome} />,
        to: config.routes.home,
    },
    {
        title: "Watching",
        icon: <FontAwesomeIcon icon={faFilm} />,
        to: config.routes.watching,
    },
    {
        title: "Filter",
        icon: <FontAwesomeIcon icon={faFilter} />,
        to: config.routes.filter,
    },
    {
        title: "Ranking",
        icon: <FontAwesomeIcon icon={faRankingStar} />,
        to: config.routes.ranking,
    },
    {
        title: "Following",
        icon: <FontAwesomeIcon icon={faBookmark} />,
        to: config.routes.following,
    },
    {
        title: "Setting",
        icon: <FontAwesomeIcon icon={faGear} />,
        to: config.routes.setting,
    },
];

function Sidebar() {
    return (
        <aside className={cx("wrapper")}>
            <div className={cx("container")}>
                <Menu menuItems={menu} />
            </div>
        </aside>
    );
}

export default Sidebar;
