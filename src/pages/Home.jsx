import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  getTopHeadlines,
  getCategoryNews,
  searchNews,
} from "../services/apiService";
import Loader from "../components/Loader";
import NewsCard from "../components/NewsCard";
import Category from "../components/Category";
import SearchBar from "../components/SearchBar";

function Home() {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("general");
  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    fetchNews();
  }, [category]);

  const fetchNews = async () => {
    try {
      setLoading(true);
      let data;
      if (category === "general") {
        data = await getTopHeadlines();
      } else {
        data = await getCategoryNews(category);
      }
      // console.log(data);
      setNewsData(data);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!search.trim()) {
      toast.error("Please Enter something to search");
      return;
    }
    try {
      setLoading(true);
      setIsSearching(true);

      const data = await searchNews(search);
      setNewsData(data);
    } catch (error) {
      console.log(error);
      toast.error("Search Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-6">
      <div className="bg-linear-to-r from-red-800 to-red-600 text-white rounded-xl p-10">
        <h1 className="text-5xl font-bold">Stay Updated With Latest News</h1>
        <p className="mt-5 text-lg">
          Read the latest news from around the world.
        </p>
        <button className="mt-6 bg-white text-red-600 text-lg px-6 py-3 rounded-lg font-semibold">
          Explore News
        </button>
      </div>

      <SearchBar
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
      />

      {!isSearching && (
        <Category category={category} setCategory={setCategory} />
      )}

      <div className="flex justify-between items-center my-8">
        <h2 className="text-3xl font-bold capitalize">
          {isSearching
            ? `Search Result for "${search}"`
            : category === "general"
              ? "Top Headlines"
              : `${category} News`}
        </h2>

        {/* Clear Search */}
        {isSearching && (
          <button
            onClick={() => {
              setSearch("");
              setIsSearching(false);
              setCategory("general");
              fetchNews();
            }}
            className="bg-gray-900 text-white rounded-lg px-5 py-2 text-lg font-medium hover:bg-gray-700"
          >
            Clear Search
          </button>
        )}
      </div>

      {loading ? (
        <Loader />
      ) : newsData.length === 0 ? (
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold">No News Found</h2>
          <p className="text-gray-500 mt-2">
            Try Searching with another keyword
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsData.map((n, index) => (
            <NewsCard key={index} news={n} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
