import React from "react";
import "./Main.css";
import Preloader from "../Preloader/Preloader";
import About from "../About/About";
import NewsCardList from "../NewsCardList/NewsCardList";
import NothingFound from "../Nothing found/Nothingfound";

function Main({
  articles,
  isLoading,
  error,
  noResults,
  visibleCount,
  setVisibleCount,
  isLoggedIn,
  onLoginClick,
}) {
  // Add a class that indicates if search results are being displayed
  const mainClass = articles.length > 0 ? "main with-results" : "main";

  return (
    <>
      {/* If loading, show only preloader */}
      {isLoading && (
        <div className="preloader-container">
          <Preloader text="Searching for news..." />
        </div>
      )}

      {/* Only show main content when not loading */}
      {!isLoading && (articles.length > 0 || error || noResults) && (
        <main className={mainClass}>
          <div className="main__container">
            <section className="main__section">
              {articles.length > 0 && (
                <h2 className="main__title">Search results</h2>
              )}

              {/* Render NothingFound outside main__content for better positioning */}
              {noResults && <NothingFound />}

              <div className="main__content">
                {error ? (
                  <p className="error">{error}</p>
                ) : articles.length > 0 ? (
                  <NewsCardList
                    articles={articles}
                    visibleCount={visibleCount}
                    setVisibleCount={setVisibleCount}
                    isLoggedIn={isLoggedIn}
                    onLoginClick={onLoginClick}
                  />
                ) : null}
              </div>
            </section>
          </div>
        </main>
      )}

      <About />
    </>
  );
}

export default Main;
