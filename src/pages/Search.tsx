import React, { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "../components/Card";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Spinner from "../components/Spinner";
import { HomePageVideos } from "../Type";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { clearVideos } from "../store";
import { useNavigate } from "react-router-dom";
import { getSearchPageVideos } from "../store/reducers/getSearchPageVideos";

const Search = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { videos } = useAppSelector((state) => state.youtubeApp);
  const { searchTerm } = useAppSelector((state) => state.youtubeApp);

  useEffect(() => {
    dispatch(clearVideos());
    if (searchTerm === "") navigate("/");
    else {
      dispatch(getSearchPageVideos(false));
    }
  }, [dispatch, navigate, searchTerm]);

  return (
    <div className="max-h-screen overflow-hidden">
      <div style={{ height: "7.5vh" }}>
        <Navbar />
      </div>
      <div className="flex" style={{ height: "92.5vh" }}>
        <Sidebar />
        {videos?.length ? (
          <InfiniteScroll
            dataLength={videos?.length}
            next={() => dispatch(getSearchPageVideos(true))}
            hasMore={videos.length < 500}
            loader={<Spinner />}
            height={600}
          >
            <div className="grid gap-y-14 gap-x-8 grid-cols-4 p-8">
              {videos.map((item: HomePageVideos) => (
                <Card data={item} key={item.videoId} />
              ))}
            </div>
          </InfiniteScroll>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};

export default Search;
