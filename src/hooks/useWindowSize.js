import { useState, useEffect } from "react";

function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    });

    useEffect(() => {
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }
        window.addEventListener("resize", handleResize);

        // gets updated with initial window size
        handleResize();

        // on cleanup
        return () => window.removeEventListener("resize", handleResize);
    }, []); // useEffect only run on mount
    return windowSize;
}

export default useWindowSize;
