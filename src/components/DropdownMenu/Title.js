import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import classNames from "classnames/bind";

import Button from "../Button/Button";
import style from "./DropdownMenu.module.scss";

const cx = classNames.bind(style);

function Title({ title, onBack }) {
    return (
        <div className={cx("title-wrapper")}>
            <Button text large className={cx("title-btn")} onClick={onBack}>
                <FontAwesomeIcon icon={faAngleLeft} />
            </Button>
            <h4 className={cx("title-name")}>{title}</h4>
        </div>
    );
}

Title.propTypes = {
    title: PropTypes.string.isRequired,
    onBack: PropTypes.func.isRequired,
};

export default Title;
