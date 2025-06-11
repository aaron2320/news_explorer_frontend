/**
 * Formats an ISO date string into a more readable format
 * @param {string} isoDate - Date in ISO format
 * @returns {string} Formatted date string (e.g., "March 15, 2023")
 */
export function formatDate(isoDate) {
  if (!isoDate) return "Unknown date";

  const date = new Date(isoDate);

  // Check if date is valid
  if (isNaN(date.getTime())) return "Invalid date";

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Truncates text to a specified length and adds ellipsis
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length before truncation
 * @returns {string} Truncated text with ellipsis if necessary
 */
export function truncateText(text, maxLength) {
  if (!text) return "";
  if (text.length <= maxLength) return text;

  return text.substr(0, maxLength) + "...";
}
