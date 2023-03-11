import {
    faBookmark,
    faFilm,
    faFilter,
    faGear,
    faHome,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import config from "~/config";
import MenuItem from "./MenuItem";
import style from "./Sidebar.module.scss";

const cx = classNames.bind(style);

const MENU = [
    {
        title: "Home",
        icon: <FontAwesomeIcon icon={faHome} />,
        to: config.routes.home,
        activePaths: [config.routes.home],
    },
    {
        title: "Watching",
        icon: <FontAwesomeIcon icon={faFilm} />,
        to: config.routes.viewingTracking,
        activePaths: [
            config.routes.viewingTracking,
            config.routes.viewing,
            config.routes.watchDefault,
            config.routes.watchTv,
        ],
    },
    {
        title: "Following",
        icon: <FontAwesomeIcon icon={faBookmark} />,
        to: config.routes.following,
        activePaths: [config.routes.following],
    },
    {
        title: "Filter",
        icon: <FontAwesomeIcon icon={faFilter} />,
        to: config.routes.filter,
        activePaths: [config.routes.filter],
    },
    // {
    //     title: "Ranking",
    //     icon: <FontAwesomeIcon icon={faRankingStar} />,
    //     to: config.routes.ranking,
    //     activePaths: [config.routes.ranking],
    // },
    // {
    //     title: "Setting",
    //     icon: <FontAwesomeIcon icon={faGear} />,
    //     to: config.routes.setting,
    //     activePaths: [config.routes.setting],
    // },
];

function Sidebar() {
    return (
        <aside className={cx("wrapper")}>
            <div className={cx("container")}>
                <div className={cx("menu")}>
                    {MENU.map((item, index) => (
                        <MenuItem key={index} data={item} />
                    ))}
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;
