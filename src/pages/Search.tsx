import React, { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Spinner from "../components/Spinner";
import { HomePageVideos } from "../Type";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { clearVideos } from "../store";
import { useNavigate } from "react-router-dom";
import { getSearchPageVideos } from "../store/reducers/getSearchPageVideos";
import SearchCard from "../components/SearchCard";

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
          <div className="py-8 pl-8 flex flex-col gap-5 w-full">
            <InfiniteScroll
              dataLength={videos?.length}
              next={() => dispatch(getSearchPageVideos(true))}
              hasMore={videos.length < 500}
              loader={<Spinner />}
              height={600}
            >
              <div className="my-5">
                {videos.map((item: HomePageVideos) => (
                  <SearchCard data={item} key={item.videoId} />
                ))}
              </div>
            </InfiniteScroll>
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};

export default Search;
