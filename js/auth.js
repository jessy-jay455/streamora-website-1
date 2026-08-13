document.addEventListener('DOMContentLoaded', () => {
  // UI Elements
  const authModal = document.getElementById('authModal');
  const openAuthBtn = document.getElementById('openAuthBtn');
  const authCloseBtn = document.getElementById('authCloseBtn');
  const authModalBackdrop = document.getElementById('authModalBackdrop');
  
  const authForm = document.getElementById('authForm');
  const authModalTitle = document.getElementById('authModalTitle');
  const authModalSubtitle = document.getElementById('authModalSubtitle');
  const nameGroup = document.getElementById('nameGroup');
  const authSubmitBtn = document.getElementById('authSubmitBtn');
  const authToggleQuestion = document.getElementById('authToggleQuestion');
  const authToggleLink = document.getElementById('authToggleLink');

  let isSignUpMode = false;

  // Toggle Modal Display
  function openModal() {
    if (authModal) authModal.classList.add('active');
  }

  function closeModal() {
    if (authModal) authModal.classList.remove('active');
  }

  // Switch between 'Login' and 'Sign Up' views dynamically
  function toggleAuthMode(e) {
    if (e) e.preventDefault();
    isSignUpMode = !isSignUpMode;

    if (isSignUpMode) {
      authModalTitle.textContent = 'Create an Account';
      authModalSubtitle.textContent = 'Join Streamora for personalized AI curation';
      nameGroup.style.display = 'block';
      authSubmitBtn.textContent = 'Sign Up';
      authToggleQuestion.textContent = 'Already have an account?';
      authToggleLink.textContent = 'Log In';
    } else {
      authModalTitle.textContent = 'Welcome Back';
      authModalSubtitle.textContent = 'Sign in to your Streamora account';
      nameGroup.style.display = 'none';
      authSubmitBtn.textContent = 'Log In';
      authToggleQuestion.textContent = "Don't have an account?";
      authToggleLink.textContent = 'Sign Up';
    }
  }

  // Handle Form Submission
  function handleAuthSubmit(e) {
    e.preventDefault();

    const email = document.getElementById('authEmail').value;
    const password = document.getElementById('authPassword').value;
    const name = isSignUpMode ? document.getElementById('authName').value : '';

    if (isSignUpMode) {
      // Basic Signup Logic
      const userData = { name, email };
      localStorage.setItem('streamora_user', JSON.stringify(userData));
      updateUserUI(userData);
      alert(`Account created successfully! Welcome to Streamora, ${name}.`);
    } else {
      // Basic Login Logic
      const storedUser = JSON.parse(localStorage.getItem('streamora_user')) || { name: email.split('@')[0], email };
      updateUserUI(storedUser);
      alert(`Welcome back, ${storedUser.name}!`);
    }

    closeModal();
    authForm.reset();
  }

  // Update Navigation UI after login
  function updateUserUI(user) {
    if (openAuthBtn && user) {
      openAuthBtn.textContent = `Hi, ${user.name || 'User'}`;
      openAuthBtn.classList.remove('btn-secondary');
      openAuthBtn.classList.add('btn-primary');
    }
  }

  // Check saved login session on page load
  function checkSavedSession() {
    const savedUser = localStorage.getItem('streamora_user');
    if (savedUser) {
      updateUserUI(JSON.parse(savedUser));
    }
  }

  // Event Listeners
  if (openAuthBtn) openAuthBtn.addEventListener('click', openModal);
  if (authCloseBtn) authCloseBtn.addEventListener('click', closeModal);
  if (authModalBackdrop) authModalBackdrop.addEventListener('click', closeModal);
  if (authToggleLink) authToggleLink.addEventListener('click', toggleAuthMode);
  if (authForm) authForm.addEventListener('submit', handleAuthSubmit);

  checkSavedSession();
});
