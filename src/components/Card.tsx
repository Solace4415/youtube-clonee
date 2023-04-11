import React from "react";
import { HomePageVideos } from "../Type";
import { Link } from "react-router-dom";

const Card = ({ data }: { data: HomePageVideos }) => {
  const isData = data ? true : false;

  return (
    <div className="w-64 h-64 flex gap-3 flex-col">
      <div className="relative">
        <span className="absolute bottom-3 right-3 text-sm bg-gray-900 px-2 py-0.5 z-10">
          {data.videoDuration}
        </span>
        <Link to={`/watch/${data.videoId}`}>
          <img
            src={data.videoThumbnail}
            alt="thumbnail"
            className="h-44 w-72"
          />
        </Link>
      </div>
      <div className="flex gap-2">
        <div className="min-w-fit">
          <a href="#">
            <img
              src={data.channelInfo.image}
              alt="channel"
              className="h-9 w-9 rounded-full"
            />
          </a>
        </div>
        <div>
          <h3>
            <a href="#" className="line-clmap-2">
              {data.videoTitle}
            </a>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Card;
