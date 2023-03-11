import { useState } from "react";
import Tippy from "@tippyjs/react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";

import { Wrapper as PoperWrapper } from "~/components/Poper";
import ScrollView from "../ScrollView";
import MenuItem from "./MenuItem";
import Title from "./Title";
import style from "./DropdownMenu.module.scss";

const cx = classNames.bind(style);

function DropdownMenu({
    items,
    children,
    hideOnClick = false,
    onChange = () => {},
}) {
    const [dropDownHistory, setDropdownHistory] = useState([{ data: items }]);
    const currentMenu = dropDownHistory[dropDownHistory.length - 1];

    const handleGoBackMenu = () => {
        setDropdownHistory((prev) => prev.slice(0, prev.length - 1));
    };

    const renderResult = (attrs) => {
        return (
            <div tabIndex="-1" className={cx("menu-wrapper")} {...attrs}>
                <PoperWrapper className={cx("poper-wrapper")}>
                    {currentMenu.title && (
                        <Title
                            title={currentMenu.title}
                            onBack={handleGoBackMenu}
                        />
                    )}
                    <ScrollView>{renderItem()}</ScrollView>
                </PoperWrapper>
            </div>
        );
    };

    const renderItem = () => {
        return currentMenu.data.map((item, index) => {
            return (
                <MenuItem
                    key={index}
                    data={item}
                    onClick={() => {
                        console.log(item);
                        const haveChild = !!item.children;
                        if (haveChild) {
                            setDropdownHistory((prev) => [
                                ...prev,
                                item.children,
                            ]);
                        } else {
                            item.onClick();
                        }
                    }}
                ></MenuItem>
            );
        });
    };

    const handleResetMenu = () => {
        setDropdownHistory((prev) => prev.slice(0, 1));
    };

    return (
        <div>
            <Tippy
                interactive
                offset={[10, 8]}
                delay={[0, 500]}
                placement="bottom-end"
                hideOnClick={hideOnClick}
                animation={false}
                onHide={handleResetMenu}
                render={(attrs) => renderResult(attrs)}
            >
                <span>{children}</span>
            </Tippy>
        </div>
    );
}

DropdownMenu.propTypes = {
    items: PropTypes.array,
    children: PropTypes.node.isRequired,
    hideOnClick: PropTypes.func,
    onChange: PropTypes.func,
};

export default DropdownMenu;
