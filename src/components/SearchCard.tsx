import React from "react";
import { HomePageVideos } from "../Type";
import { Link } from "react-router-dom";

const SearchCard = ({ data }: { data: HomePageVideos }) => {
  const isData = data ? true : false;

  return <div className="w-64 h-64 flex gap-3 flex-col"></div>;
};

export default SearchCard;
