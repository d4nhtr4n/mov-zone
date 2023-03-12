import localeInfo from "rc-pagination/lib/locale/en_US";
import {
    faAngleLeft,
    faAngleRight,
    faEllipsis,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Pagination from "rc-pagination";
import "./CustomPagination.scss";
function CustomPagination({ totalRecord, onChange, current }) {
    return (
        <Pagination
            prevIcon={<FontAwesomeIcon icon={faAngleLeft} />}
            nextIcon={<FontAwesomeIcon icon={faAngleRight} />}
            jumpNextIcon={<FontAwesomeIcon icon={faEllipsis} />}
            jumpPrevIcon={<FontAwesomeIcon icon={faEllipsis} />}
            showQuickJumper={{
                goButton: <button type="button">Go</button>,
            }}
            hideOnSinglePage
            defaultCurrent={1}
            current={current}
            locale={localeInfo}
            pageSize={20}
            total={totalRecord}
            onChange={onChange}
        />
    );
}

export default CustomPagination;
