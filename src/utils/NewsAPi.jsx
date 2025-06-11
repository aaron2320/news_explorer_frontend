const BASE_URL = import.meta.env.PROD
  ? "https://nomoreparties.co/news/v2/everything"
  : "https://newsapi.org/v2/everything";

const API_KEY = import.meta.env.VITE_NEWS_API_KEY; // In env file

export const getNewsArticles = async (searchQuery) => {
  const currentDate = new Date();
  const toDate = currentDate.toISOString().split("T")[0];
  const fromDate = new Date(currentDate.setDate(currentDate.getDate() - 7))
    .toISOString()
    .split("T")[0];

  const url = `${BASE_URL}?q=${encodeURIComponent(
    searchQuery
  )}&apiKey=${API_KEY}&from=${fromDate}&to=${toDate}&pageSize=100`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Failed to fetch news articles.");
    }
    const data = await res.json();

    // Add a delay of 1 second before returning the articles
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(data.articles);
      }, 1000); // 1000 milliseconds = 1 second
    });
  } catch (error) {
    throw error;
  }
};
