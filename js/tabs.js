function filterCategory(category, buttonElement) {
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  buttonElement.classList.add('active');

  document.querySelectorAll('.content-card').forEach(card => {
    if (category === 'all' || card.getAttribute('data-category') === category) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}