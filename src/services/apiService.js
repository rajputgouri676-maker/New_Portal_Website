import Axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

// Top Headlines
export const getTopHeadlines = async () => {
  try {
    const res = await Axios.get(
      `${BASE_URL}/top-headlines?category=general&lang=en&max=9&apikey=${API_KEY}`,
    );
    return res.data.articles;
  } catch (error) {
    console.log(error, "Error in Fetching Top Headlines");
    return [];
  }
};

// Category News
export const getCategoryNews = async (category) => {
  try {
    const res = await Axios.get(
      `${BASE_URL}/top-headlines?category=${category}&lang=en&max=9&apikey=${API_KEY}`,
    );

    return res.data.articles;
  } catch (error) {
    console.log(error, "Error in Fetching Category News");
    return [];
  }
};

// Search News
export const searchNews = async (query) => {
  try {
    const res = await Axios.get(
      `${BASE_URL}/search?q=${query}&lang=en&max=9&apikey=${API_KEY}`,
    );
    return res.data.articles;
  } catch (error) {
    console.log(error);
    return [];
  }
};
