document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const headerSearchInput = document.getElementById('headerSearchInput');
  const cards = document.querySelectorAll('.content-card');

  const filterCards = (query) => {
    const searchTerm = query.toLowerCase().trim();

    cards.forEach(card => {
      const title = card.getAttribute('data-title').toLowerCase();
      if (title.includes(searchTerm)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  };

  if (searchInput) {
    searchInput.addEventListener('input', (e) => filterCards(e.target.value));
  }

  if (headerSearchInput) {
    headerSearchInput.addEventListener('input', (e) => {
      filterCards(e.target.value);
      // Optional sync with explore search bar
      if (searchInput) searchInput.value = e.target.value;
    });
  }
});