// Generate or retrieve a unique session ID for view tracking
export function getSessionId(): string {
  if (typeof window === 'undefined') return 'server';
  
  let sessionId = localStorage.getItem('view_session_id');
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem('view_session_id', sessionId);
  }
  return sessionId;
}

// Check if a book has been viewed in the current session
export function hasViewedBook(bookId: string): boolean {
  if (typeof window === 'undefined') return false;
  
  const viewedBooks = JSON.parse(localStorage.getItem('viewed_books') || '{}');
  return viewedBooks[bookId] === true;
}

// Mark a book as viewed in the current session
export function markBookAsViewed(bookId: string): void {
  if (typeof window === 'undefined') return;
  
  const viewedBooks = JSON.parse(localStorage.getItem('viewed_books') || '{}');
  viewedBooks[bookId] = true;
  localStorage.setItem('viewed_books', JSON.stringify(viewedBooks));
}
