import classNames from "classnames/bind";
import PropTypes from "prop-types";

import Header from "../components/Header";
import Footer from "../components/Footer";
import style from "./NoNavBarLayout.module.scss";

const cx = classNames.bind(style);

function NoNavBarLayout({ children }) {
    return (
        <div className={cx("wrapper")}>
            <Header />
            <div className={cx("container")}>
                <div className={cx("content")}>{children}</div>
            </div>
            <Footer />
        </div>
    );
}

NoNavBarLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default NoNavBarLayout;
