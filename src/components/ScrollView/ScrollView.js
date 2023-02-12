import PropTypes from "prop-types";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

function ScrollView({ children, maxHeight = "70vh" }) {
    return (
        <SimpleBar style={{ maxHeight: maxHeight }} autoHide>
            {children}
        </SimpleBar>
    );
}

ScrollView.propTypes = {
    children: PropTypes.arrayOf(PropTypes.node),
    maxHeight: PropTypes.string,
};

export default ScrollView;
