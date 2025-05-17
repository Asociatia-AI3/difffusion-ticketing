async function handlePartnerLogin() {
  console.log('login');

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

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

    const partnerBox = document.getElementById('partnerBox');
    partnerBox.innerHTML = `
          <button class="action-button" onclick="alert('Ticket scanned!')">Scan Ticket</button>
        `;
  } catch (err) {
    console.error('Login error:', err);
  }
}

function selectRole(role) {
  const userBox = document.getElementById('userBox');
  let partnerBox = document.getElementById('partnerBox');
  const header = document.getElementById('headerText');
  const backButton = document.getElementById('backButton');

  if (role === 'User') {
    partnerBox.classList.add('hidden');
    userBox.classList.add('centered');
    document.body.style.backgroundColor = '#B1C29E';
    userBox.style.backgroundColor = '#DEAA79';
    header.innerText = 'User';
    userBox.innerHTML = `<button class="action-button" onclick="alert('Ticket generated!')">Generate Ticket</button>`;
  } else if (role === 'Partner') {
    userBox.classList.add('hidden');
    document.body.style.backgroundColor = '#659287';
    header.innerText = 'Partner';
    partnerBox.outerHTML = `
        <div class="box partner-box" id="partnerBox">
          <div id="partnerLoginForm" >
            <div id="loginError" style="display:none;">Wrong credentials</div>
            <input id="username" type="text" name="username" placeholder="Partner name" required />
            <input id="password" type="password" name="password" placeholder="Password" required />
            <div class="modal-actions">
              <button class="action-button" onclick="handlePartnerLogin()">Log In</button>
            </div>
          </div>
        </div>
      `;
    partnerBox = document.getElementById('partnerBox');
    partnerBox.classList.add('centered');
    partnerBox.style.backgroundColor = '#DEAA79';
  }

  backButton.style.display = 'block';
}

function goBack() {
  const userBox = document.getElementById('userBox');
  const partnerBox = document.getElementById('partnerBox');
  const header = document.getElementById('headerText');
  const backButton = document.getElementById('backButton');

  document.body.style.backgroundColor = '#FFE6A9';
  header.innerText = 'Use application as';

  userBox.classList.remove('hidden', 'centered');
  partnerBox.classList.remove('hidden', 'centered');

  userBox.style.backgroundColor = '#B1C29E';
  partnerBox.style.backgroundColor = '#659287';

  userBox.innerHTML = '<span>User</span>';
  partnerBox.outerHTML = `<div class="box partner-box" onclick="selectRole('Partner')" id="partnerBox"><span>Partner</span></div>`;

  backButton.style.display = 'none';
}