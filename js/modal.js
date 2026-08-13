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
// Helper to transform any YouTube URL into an embed link
function formatYouTubeEmbedUrl(url) {
  if (!url) return '';
  
  // Extract Video ID using Regex
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);

  if (match && match[2].length === 11) {
    return `https://www.youtube.com/embed/${match[2]}?autoplay=1`;
  }
  
  return url;
}

// Event delegation for opening the modal
document.addEventListener('click', (e) => {
  const playBtn = e.target.closest('.play-btn') || e.target.closest('#heroWatchBtn');
  
  if (playBtn) {
    const rawVideoUrl = playBtn.getAttribute('data-video');
    const embedUrl = formatYouTubeEmbedUrl(rawVideoUrl);
    
    const iframe = document.getElementById('videoIframe');
    const modal = document.getElementById('videoModal');
    
    if (iframe && modal) {
      iframe.src = embedUrl;
      modal.classList.add('active'); // or modal.style.display = 'block';
    }
  }
});

// Close Modal & Clear iframe src to stop video audio
const closeBtn = document.getElementById('modalCloseBtn');
const backdrop = document.getElementById('modalBackdrop');

function closeModal() {
  const iframe = document.getElementById('videoIframe');
  const modal = document.getElementById('videoModal');
  if (iframe) iframe.src = '';
  if (modal) modal.classList.remove('active');
}

if (closeBtn) closeBtn.addEventListener('click', closeModal);
if (backdrop) backdrop.addEventListener('click', closeModal);
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
