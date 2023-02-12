import classNames from "classnames/bind";
import PropTypes from "prop-types";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import style from "./DefaultLayout.module.scss";

const cx = classNames.bind(style);

function DefaultLayout({ children }) {
    return (
        <div className={cx("wrapper")}>
            <Header />
            <div className={cx("container")}>
                <Sidebar />
                <div className={cx("content")}>{children}</div>
            </div>
            <Footer />
        </div>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;
