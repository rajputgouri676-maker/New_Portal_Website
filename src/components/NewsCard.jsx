import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { toast } from "react-toastify";

const NewsCard = ({ news }) => {
  const navigate = useNavigate();
  const [bookmarked, setBookMarked] = useState(false);

  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

    const exists = bookmarks.some((item) => item.id === news.id);
    setBookMarked(exists);
  }, [news.id]);

  const handleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

    if (bookmarked) {
      const updatedBookmarks = bookmarks.filter((item) => item.id !== news.id);
      localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
      setBookMarked(false);
      toast.info("Bookmark Removed");
    } else {
      bookmarks.push(news);
      localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
      setBookMarked(true);
      toast.success("News Bookmarked");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 ">
      <img src={news.image} alt="loading" className="w-full h-55" />
      <div className="p-5 relative">
        <p className="text-red-600 text-sm">{news.source.name}</p>

        {/* Bookmark Button */}
        <button
          onClick={handleBookmark}
          className="text-xl text-red-600 hover:scale-110 transition absolute right-3 top-5"
        >
          {bookmarked ? <FaBookmark /> : <FaRegBookmark />}
        </button>

        <h2 className="text-xl font-bold mt-2 line-clamp-2">{news.title}</h2>
        <p className="text-gray-600 mt-3 text-justify line-clamp-4">
          {news.description}
        </p>
        <p className="text-gray-400 mt-4">
          {new Date(news.publishedAt).toLocaleDateString()}
        </p>
        <button
          className="mt-4 bg-red-600 px-5 py-2 rounded-lg text-white hover:bg-red-700"
          onClick={() => navigate(`/news/${news.id}`, { state: { news } })}
        >
          Read More
        </button>
      </div>
    </div>
  );
};

export default NewsCard;
