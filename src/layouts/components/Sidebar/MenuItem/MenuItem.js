import PropTypes from "prop-types";
import { matchPath, NavLink, useLocation } from "react-router-dom";
import classNames from "classnames/bind";
import style from "./MenuItem.module.scss";

const cx = classNames.bind(style);

function MenuItem({ data, mobile = false }) {
    const { pathname } = useLocation();
    const match = data.activePaths.find((path) => matchPath(path, pathname));
    return (
        <NavLink
            className={(nav) =>
                cx(
                    "wrapper",
                    {
                        mobile: mobile,
                    },
                    { active: match }
                )
            }
            to={data.to}
        >
            <div className={cx("icon")}>{data.icon}</div>
            <span className={cx("title")}>{data.title}</span>
        </NavLink>
    );
}

MenuItem.propTypes = {
    data: PropTypes.object.isRequired,
};

export default MenuItem;
