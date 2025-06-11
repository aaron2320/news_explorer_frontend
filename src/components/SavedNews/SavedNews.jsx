import React, { useState, useEffect } from "react";
import "./SavedNews.css";
import NewsCard from "../NewsCard/NewsCard";

function SavedNews({ isLoggedIn, onLoginClick, user = { name: "Elliot" } }) {
  const [savedArticles, setSavedArticles] = useState(() => {
    // Initialize with data from localStorage
    const articles = JSON.parse(localStorage.getItem("savedArticles") || "[]");
    return articles.map((article) => {
      if (!article.keyword) {
        return {
          ...article,
          keyword: article.source?.name || "News",
        };
      }
      return article;
    });
  });
  const [keywords, setKeywords] = useState([]);

  const loadSavedArticles = () => {
    const articles = JSON.parse(localStorage.getItem("savedArticles") || "[]");

    // Ensure each article has a keyword
    const articlesWithKeywords = articles.map((article) => {
      if (!article.keyword) {
        return {
          ...article,
          keyword: article.source?.name || "News",
        };
      }
      return article;
    });

    setSavedArticles(articlesWithKeywords);

    // Extract keywords
    const keywordList = articlesWithKeywords.map(
      (article) => article.keyword || article.source?.name || "News"
    );

    // Get unique keywords
    const uniqueKeywords = [...new Set(keywordList)];
    setKeywords(uniqueKeywords);
  };

  useEffect(() => {
    // Load keywords on initial render
    const articles = savedArticles;
    const keywordList = articles.map(
      (article) => article.keyword || article.source?.name || "News"
    );
    const uniqueKeywords = [...new Set(keywordList)];
    setKeywords(uniqueKeywords);
  }, []);

  // Listen for changes to localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      loadSavedArticles();
    };

    window.addEventListener("storage", handleStorageChange);

    // We'll also listen for a custom event that our NewsCard component dispatches
    window.addEventListener("articleRemoved", handleStorageChange);
    window.addEventListener("articleSaved", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("articleRemoved", handleStorageChange);
      window.removeEventListener("articleSaved", handleStorageChange);
    };
  }, []);

  const handleRemoveArticle = (articleToRemove) => {
    const updatedArticles = savedArticles.filter(
      (article) => article.title !== articleToRemove.title
    );
    setSavedArticles(updatedArticles);
    localStorage.setItem("savedArticles", JSON.stringify(updatedArticles));
  };

  // Helper function to format keywords
  const formatKeywords = () => {
    if (keywords.length === 0) return "";
    if (keywords.length === 1) return keywords[0];
    if (keywords.length === 2) return `${keywords[0]} and ${keywords[1]}`;
    if (keywords.length === 3)
      return `${keywords[0]}, ${keywords[1]}, and ${keywords[2]}`;
    return `${keywords[0]}, ${keywords[1]}, ${keywords[2]}, and ${
      keywords.length - 3
    } more`;
  };

  return (
    <>
      <div className="saved-news-header">
        <div className="saved-news-header__container">
          <p className="saved-news-header__subtitle">Saved articles</p>
          <h1 className="saved-news-header__title">
            {user.name}, you have {savedArticles.length} saved articles
          </h1>
          <p className="saved-news-header__keywords">
            By keywords:{" "}
            <span className="saved-news-header__keywords-list">
              {formatKeywords()}
            </span>
          </p>
        </div>
      </div>

      <div className="saved-news">
        <div className="saved-news__container">
          <div className="saved-news__content">
            {savedArticles.length > 0 ? (
              <ul className="saved-news__articles">
                {savedArticles.map((article, index) => (
                  <li key={`${article.title}-${index}`}>
                    <NewsCard
                      article={article}
                      isLoggedIn={isLoggedIn}
                      isSaved={true}
                      onLoginClick={onLoginClick}
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <div className="saved-news__empty">
                <p className="saved-news__empty-message">
                  You don't have any saved articles yet.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default SavedNews;
