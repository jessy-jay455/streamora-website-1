document.addEventListener('DOMContentLoaded', () => {
  // 1. UI Elements
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

  // 2. Modal Toggle Functions
  function openModal() {
    if (authModal) authModal.classList.add('active');
  }

  function closeModal() {
    if (authModal) authModal.classList.remove('active');
  }

  // 3. Switch between 'Login' and 'Sign Up'
  function toggleAuthMode(e) {
    if (e) e.preventDefault();
    isSignUpMode = !isSignUpMode;

    if (isSignUpMode) {
      if (authModalTitle) authModalTitle.textContent = 'Create an Account';
      if (authModalSubtitle) authModalSubtitle.textContent = 'Join Streamora for personalized AI curation';
      if (nameGroup) nameGroup.style.display = 'block';
      if (authSubmitBtn) authSubmitBtn.textContent = 'Sign Up';
      if (authToggleQuestion) authToggleQuestion.textContent = 'Already have an account?';
      if (authToggleLink) authToggleLink.textContent = 'Log In';
    } else {
      if (authModalTitle) authModalTitle.textContent = 'Welcome Back';
      if (authModalSubtitle) authModalSubtitle.textContent = 'Sign in to your Streamora account';
      if (nameGroup) nameGroup.style.display = 'none';
      if (authSubmitBtn) authSubmitBtn.textContent = 'Log In';
      if (authToggleQuestion) authToggleQuestion.textContent = "Don't have an account?";
      if (authToggleLink) authToggleLink.textContent = 'Sign Up';
    }
  }

  // 4. Form Submit Handler
  function handleAuthSubmit(e) {
    e.preventDefault();
    const email = document.getElementById('authEmail')?.value;
    const name = isSignUpMode ? document.getElementById('authName')?.value : '';

    const userData = { name: name || email.split('@')[0], email };
    localStorage.setItem('streamora_user', JSON.stringify(userData));
    updateUserUI(userData);
    
    alert(isSignUpMode ? `Account created! Welcome, ${userData.name}` : `Welcome back, ${userData.name}!`);
    closeModal();
    if (authForm) authForm.reset();
  }

  // 5. Update UI Session
  function updateUserUI(user) {
    if (openAuthBtn && user) {
      openAuthBtn.textContent = `Hi, ${user.name || 'User'}`;
      openAuthBtn.classList.remove('btn-secondary');
      openAuthBtn.classList.add('btn-primary');
    }
  }

  function checkSavedSession() {
    const savedUser = localStorage.getItem('streamora_user');
    if (savedUser) {
      updateUserUI(JSON.parse(savedUser));
    }
  }

  // 6. Event Listeners
  if (openAuthBtn) openAuthBtn.addEventListener('click', openModal);
  if (authCloseBtn) authCloseBtn.addEventListener('click', closeModal);
  if (authModalBackdrop) authModalBackdrop.addEventListener('click', closeModal);
  if (authToggleLink) authToggleLink.addEventListener('click', toggleAuthMode);
  if (authForm) authForm.addEventListener('submit', handleAuthSubmit);

  // Initialize Session
  checkSavedSession();
});
