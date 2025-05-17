async function handlePartnerLogin(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const username = formData.get('username');
  const password = formData.get('password');

  try {
    const res = await fetch('/partner/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (res.status === 401) {
      document.getElementById('loginError').style.display = 'block';
      return;
    }

    const data = await res.json();
    window.location.href = data.redirectTo;
  } catch (err) {
    console.error('Login error:', err);
  }
}
