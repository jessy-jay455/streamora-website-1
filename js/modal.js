document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('videoModal');
  const iframe = document.getElementById('videoIframe');
  const closeBtn = document.getElementById('closeModal');

  // Attach click to all play buttons
  document.addEventListener('click', (e) => {
    const playBtn = e.target.closest('.play-btn');
    if (playBtn) {
      e.preventDefault();
      const rawUrl = playBtn.getAttribute('data-video');

      if (rawUrl && modal && iframe) {
        // Convert YouTube links to embed links if needed
        let embedUrl = rawUrl;
        if (rawUrl.includes('youtu.be/')) {
          const id = rawUrl.split('youtu.be/')[1].split('?')[0];
          embedUrl = `https://www.youtube.com/embed/${id}`;
        } else if (rawUrl.includes('watch?v=')) {
          const id = rawUrl.split('watch?v=')[1].split('&')[0];
          embedUrl = `https://www.youtube.com/embed/${id}`;
        }

        iframe.src = embedUrl + '?autoplay=1';
        modal.classList.add('active');
      }
    }
  });

  // Close Modal
  function closeModal() {
    if (modal) modal.classList.remove('active');
    if (iframe) iframe.src = ''; // Stop video playback
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }
});