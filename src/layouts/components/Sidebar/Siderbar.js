import classNames from "classnames/bind";
import style from "./Sidebar.module.scss";

const cx = classNames.bind(style);

function Sidebar() {
    return (
        <aside className={cx("wrapper")}>
            <div className={cx("container")}>
                <div>A</div>
                <div>A</div>
                <div>A</div>
            </div>
        </aside>
    );
}

export default Sidebar;
