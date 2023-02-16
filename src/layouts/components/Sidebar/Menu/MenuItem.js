import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import classNames from "classnames/bind";
import style from "./Menu.module.scss";
import { useMatch } from "react-router-dom";

const cx = classNames.bind(style);

function MenuItem({ data }) {
    const match = useMatch(data.to);
    return (
        <NavLink
            className={(nav) => cx("item-wrapper", { active: match })}
            to={data.to}
        >
            <div className={cx("item-icon")}>{data.icon}</div>
            <span className={cx("item-title")}>{data.title}</span>
        </NavLink>
    );
}

MenuItem.propTypes = {
    data: PropTypes.object.isRequired,
};

export default MenuItem;
