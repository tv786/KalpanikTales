function getSessionId() {
  if (typeof window === "undefined") return "server";
  let sessionId = localStorage.getItem("view_session_id");
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem("view_session_id", sessionId);
  }
  return sessionId;
}
function hasViewedBook(bookId) {
  if (typeof window === "undefined") return false;
  const viewedBooks = JSON.parse(localStorage.getItem("viewed_books") || "{}");
  return viewedBooks[bookId] === true;
}
function markBookAsViewed(bookId) {
  if (typeof window === "undefined") return;
  const viewedBooks = JSON.parse(localStorage.getItem("viewed_books") || "{}");
  viewedBooks[bookId] = true;
  localStorage.setItem("viewed_books", JSON.stringify(viewedBooks));
}
export {
  getSessionId as g,
  hasViewedBook as h,
  markBookAsViewed as m
};
