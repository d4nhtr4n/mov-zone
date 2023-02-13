import PropTypes from "prop-types";
import classNames from "classnames/bind";
import style from "./Menu.module.scss";
import MenuItem from "./MenuItem";

const cx = classNames.bind(style);

function Menu({ menuItems }) {
    return (
        <div className={cx("menu-wrapper")}>
            {menuItems.map((item, index) => (
                <MenuItem key={index} data={item} />
            ))}
        </div>
    );
}

Menu.propTypes = {
    menuItems: PropTypes.array.isRequired,
};

export default Menu;
