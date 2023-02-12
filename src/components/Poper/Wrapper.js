import PropTypes from "prop-types";
import classNames from "classnames/bind";

import style from "./Poper.module.scss";

const cx = classNames.bind(style);

function Wrapper({ className, children }) {
    const classes = cx("wrapper", className);
    return (
        <div className={classes}>
            <div>{children}</div>
        </div>
    );
}

Wrapper.propTypes = {
    classNames: PropTypes.string,
    children: PropTypes.node.isRequired,
};

export default Wrapper;
