import React from "react";
import "./NewsCardList.css";
import NewsCard from "../NewsCard/NewsCard";

function NewsCardList({
  articles,
  visibleCount,
  setVisibleCount,
  isLoggedIn,
  onLoginClick,
}) {
  return (
    <div className="news-card-list-container">
      <ul className="news-card-list">
        {articles.slice(0, visibleCount).map((article, index) => (
          <li key={article.url || index}>
            <NewsCard
              article={article}
              isLoggedIn={isLoggedIn}
              onLoginClick={onLoginClick}
            />
          </li>
        ))}
      </ul>

      {visibleCount < articles.length && (
        <button
          className="news-card-list__show-more"
          onClick={() => setVisibleCount(visibleCount + 3)}
        >
          Show More
        </button>
      )}
    </div>
  );
}

export default NewsCardList;
