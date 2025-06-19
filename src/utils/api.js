// src/utils/api.js
export function getItems() {
  return new Promise((resolve) =>
    resolve([
      {
        _id: "65f7368dfb74bd6a92114c85",
        title: "Tech Breakthrough in 2025",
        url: "https://example.com/tech2025",
        imageUrl: "https://via.placeholder.com/150",
        date: "2025-06-01",
        keyword: "technology",
        description: "A major tech advancement in 2025.",
        source: { name: "Tech News" },
      },
      {
        _id: "65f7371e7bce9e7d331b11a0",
        title: "Space Exploration Update",
        url: "https://example.com/space2025",
        imageUrl: "https://via.placeholder.com/150",
        date: "2025-06-02",
        keyword: "space",
        description: "Latest updates on space missions.",
        source: { name: "Space Daily" },
      },
    ])
  );
}

export function saveArticle(article) {
  return new Promise((resolve) => {
    resolve({
      _id: `saved-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, // Unique ID
      url: article.url,
      title: article.title,
      imageUrl:
        article.urlToImage ||
        article.imageUrl ||
        "https://via.placeholder.com/150",
      date: article.publishedAt || new Date().toISOString().split("T")[0],
      keyword: article.keyword || "general",
      description: article.description,
      source: article.source,
    });
  });
}

export function deleteArticle(articleId) {
  return new Promise((resolve) => {
    resolve({ success: true, _id: articleId });
  });
}
