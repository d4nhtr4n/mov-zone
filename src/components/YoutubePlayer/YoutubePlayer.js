import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";

import style from "./YoutubePlayer.module.scss";
import YouTube from "react-youtube";

const cx = classNames.bind(style);

function YoutubePlayer({ embedId }) {
    console.log(embedId);
    const opts = {
        height: "390",
        width: "640",
        playerVars: {
            autoplay: 1,
        },
    };

    return <YouTube videoId={embedId} opts={opts} />;
}

// YoutubePlayer.propTypes = {
//     embedId: PropTypes.string.isRequired,
// };

export default YoutubePlayer;
