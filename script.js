let currentQuery = '';
let startIndex = 0;
const maxResults = 20; // number of books per fetch

async function searchBooks() {
  currentQuery = document.getElementById('searchInput').value;
  startIndex = 0;
  document.getElementById('results').innerHTML = '';
  await fetchBooks();
}

async function loadMoreBooks() {
  startIndex += maxResults;
  await fetchBooks();
}

async function fetchBooks() {
  const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${currentQuery}&startIndex=${startIndex}&maxResults=${maxResults}`);
  const data = await response.json();

  const resultsDiv = document.getElementById('results');
  
  if (!data.items || data.items.length === 0) {
    if (startIndex === 0) {
      resultsDiv.innerHTML = '<p>No results found.</p>';
    }
    document.getElementById('loadMoreBtn').style.display = 'none';
    return;
  }

  data.items.forEach(book => {
    const title = book.volumeInfo.title;
    const authors = book.volumeInfo.authors?.join(', ') || 'Unknown';
    const thumbnail = book.volumeInfo.imageLinks?.thumbnail || '';

const bookDiv = document.createElement('div');
   bookDiv.innerHTML = `
  <img src="${thumbnail}" alt="${title}" />
  <h3>${title}</h3>
  <p><strong>Author:</strong> ${authors}</p>
`;
    resultsDiv.appendChild(bookDiv);
  });

  // Show Load More button only if more items may be available
  document.getElementById('loadMoreBtn').style.display = 'block';
}
