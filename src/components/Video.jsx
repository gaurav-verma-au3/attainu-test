import React from "react";

const Video = ({ video }) => {
  return (
    <p>
      <a href={video.url} key={video.video_id} target="blank">
        {video.name}
      </a>
    </p>
  );
};

export default Video;
