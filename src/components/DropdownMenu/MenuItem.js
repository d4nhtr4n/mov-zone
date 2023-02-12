import PropTypes from "prop-types";
import classNames from "classnames/bind";

import Button from "../Button/Button";
import style from "./DropdownMenu.module.scss";

const cx = classNames.bind(style);

function MenuItem({ data, onClick = () => {} }) {
    return (
        <div className={cx("item-wrapper")}>
            <Button
                text
                leftIcon={data.leftIcon}
                rightIcon={data.rightIcon}
                to={data.to}
                className={cx("menu-item")}
                onClick={onClick}
            >
                {data.name}
            </Button>
            {data.breakPoint && <div className={cx("break-point")}></div>}
        </div>
    );
}

MenuItem.propTypes = {
    data: PropTypes.object.isRequired,
    onClick: PropTypes.func,
};

export default MenuItem;
