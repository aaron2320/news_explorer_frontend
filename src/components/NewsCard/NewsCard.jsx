import React, { useState, useEffect } from "react";
import { formatDate } from "../../utils/helpers";
import "./NewsCard.css";

function NewsCard({ article, isLoggedIn, isSaved = false, onLoginClick }) {
  const { title, description, url, urlToImage, publishedAt, source, keyword } =
    article;
  const [isArticleSaved, setIsArticleSaved] = useState(isSaved);

  // Check if the article is already saved in localStorage
  useEffect(() => {
    if (!isSaved && isLoggedIn) {
      const savedArticles = JSON.parse(
        localStorage.getItem("savedArticles") || "[]"
      );
      const articleAlreadySaved = savedArticles.some(
        (savedArticle) => savedArticle.title === title
      );
      setIsArticleSaved(articleAlreadySaved);
    }
  }, [isSaved, title, isLoggedIn]);

  // Listen for changes to localStorage
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.type === "articleRemoved" && e.detail && e.detail.title === title) {
        setIsArticleSaved(false);
      } else if (
        e.type === "articleSaved" &&
        e.detail &&
        e.detail.title === title
      ) {
        setIsArticleSaved(true);
      } else {
        const savedArticles = JSON.parse(
          localStorage.getItem("savedArticles") || "[]"
        );
        const articleIsSaved = savedArticles.some(
          (savedArticle) => savedArticle.title === title
        );
        setIsArticleSaved(articleIsSaved);
      }
    };

    window.addEventListener("articleRemoved", handleStorageChange);
    window.addEventListener("articleSaved", handleStorageChange);

    return () => {
      window.removeEventListener("articleRemoved", handleStorageChange);
      window.removeEventListener("articleSaved", handleStorageChange);
    };
  }, [title]);

  // Handle button click for non-logged in users
  const handleNonLoggedInClick = () => {
    if (onLoginClick && typeof onLoginClick === "function") {
      onLoginClick();
    }
  };

  const handleSaveArticle = () => {
    // In a real app, this would call an API to save the article
    console.log("Saving article:", title);

    // Use the article's keyword (which is the search query) or fallback to source name
    const articleToSave = {
      ...article,
      keyword: article.keyword || source?.name || "News",
    };

    // For demo purposes, we can save to localStorage
    const savedArticles = JSON.parse(
      localStorage.getItem("savedArticles") || "[]"
    );

    // Check if article is already saved to avoid duplicates
    const isAlreadySaved = savedArticles.some(
      (savedArticle) => savedArticle.title === title
    );

    if (!isAlreadySaved) {
      savedArticles.push(articleToSave);
      localStorage.setItem("savedArticles", JSON.stringify(savedArticles));
      setIsArticleSaved(true);
      // Dispatch event to notify other components
      window.dispatchEvent(
        new CustomEvent("articleSaved", { detail: { title } })
      );
      console.log("Article saved to your list!"); // Provide feedback in console instead of alert
    } else {
      console.log("This article is already saved in your list.");
    }
  };

  const handleRemoveArticle = () => {
    console.log("Removing article:", title);

    // Remove from localStorage
    const savedArticles = JSON.parse(
      localStorage.getItem("savedArticles") || "[]"
    );
    const updatedArticles = savedArticles.filter(
      (savedArticle) => savedArticle.title !== title
    );
    localStorage.setItem("savedArticles", JSON.stringify(updatedArticles));

    setIsArticleSaved(false);
    // Provide feedback
    console.log("Article removed from your list!"); // Use console instead of alert

    // Dispatch a custom event to notify components that an article was removed
    window.dispatchEvent(
      new CustomEvent("articleRemoved", { detail: { title } })
    );
  };

  const renderActionButton = () => {
    if (isSaved) {
      return (
        <button
          className="news-card__button news-card__button--remove"
          onClick={isLoggedIn ? handleRemoveArticle : handleNonLoggedInClick}
          aria-label="Remove article"
          title={
            isLoggedIn
              ? "Remove from saved articles"
              : "Sign in to save articles"
          }
        />
      );
    } else {
      return (
        <button
          className={`news-card__save-button ${
            isArticleSaved ? "news-card__save-button--saved" : ""
          }`}
          onClick={
            isLoggedIn
              ? isArticleSaved
                ? handleRemoveArticle
                : handleSaveArticle
              : handleNonLoggedInClick
          }
          aria-label={
            isLoggedIn
              ? isArticleSaved
                ? "Remove from saved"
                : "Save article"
              : "Sign in to save articles"
          }
          title={
            isLoggedIn
              ? isArticleSaved
                ? "Remove from saved articles"
                : "Save article"
              : "Sign in to save articles"
          }
        />
      );
    }
  };

  // Format the date to be more readable
  const formattedDate = formatDate(publishedAt);

  // Determine the keyword to display (use source name if no keyword provided)
  const displayKeyword = keyword || source?.name || "News";

  return (
    <article className={`news-card ${!isLoggedIn ? "not-logged-in" : ""}`}>
      {urlToImage && (
        <div className="news-card__image-container">
          <img
            className="news-card__image"
            src={urlToImage}
            alt={title}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://via.placeholder.com/400x200?text=No+Image+Available";
            }}
          />

          {/* Card elements wrapper - only for saved articles */}
          {isSaved && (
            <div className="news-card__elements-wrapper">
              {/* Keyword card */}
              <span className="news-card__keyword">{displayKeyword}</span>

              {/* Action button container */}
              <div className="news-card__action-container">
                {renderActionButton()}
              </div>
            </div>
          )}

          {/* Non-saved articles only get the action button */}
          {!isSaved && renderActionButton()}
        </div>
      )}
      <div className="news-card__content">
        <p className="news-card__date">{formattedDate}</p>
        <h3 className="news-card__title">{title}</h3>
        <p className="news-card__description">{description}</p>
        <p className="news-card__source">{source?.name}</p>
      </div>
    </article>
  );
}

export default NewsCard;
