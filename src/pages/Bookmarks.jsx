import { useEffect, useState } from "react";
import NewsCard from "../components/NewsCard";

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const savedBookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    setBookmarks(savedBookmarks);
  }, [bookmarks]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">My Bookmarks</h1>
        <p className="text-gray-500 mt-2">Your saved news article </p>
      </div>

      {bookmarks.length === 0 ? (
        <div className="text-center py-18">
          <h2 className="text-2xl font-bold text-gray-700">
            No Bookmarks Found
          </h2>
          <p className="text-gray-500 mt-2">
            Save your favourite news articles to see them here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-8">
          {bookmarks.map((news, index) => (
            <NewsCard key={index} news={news} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookmarks;
