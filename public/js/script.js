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
    //TODO implement scanning functionality
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
    //TODO implement generation functionality
    userBox.innerHTML = `<button class="action-button" onclick="generateTicket()">Generate Ticket</button>`;
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

function generateTicket() {
  document.getElementById('ticketModal').classList.remove('hidden');
}

function closeGenerateTicketModal() {
  document.getElementById('ticketModal').classList.add('hidden');
}

async function submitTicket() {
  console.log('submit ticket');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const phoneInput = document.getElementById('phone');

  let failedValidation = false;

  if (!nameInput.value) {
    failedValidation = true;
    nameInput.placeholder = 'Name is required';
    nameInput.classList.add('userDetails');
  }

  if (!emailInput.value) {
    failedValidation = true;
    emailInput.placeholder = 'Email is required';
    emailInput.classList.add('userDetails');
  }

  if (!phoneInput.value) {
    failedValidation = true;
    phoneInput.placeholder = 'Phone is required';
    phoneInput.classList.add('userDetails');
  }

  if (failedValidation) {
    return;
  }

  const body = {
    name: nameInput.value,
    email: emailInput.value,
    phone: phoneInput.value
  };

  try {
    const res = await fetch('/process', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    const code = data.code;

    QRCode.toDataURL(code, { margin: 1 }, (err, url) => {
      if (err) return console.error('QR generation failed', err);
      const link = document.createElement('a');
      link.href = url;
      link.download = `ticket-${code}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });

    closeGenerateTicketModal();
  } catch (err) {
    console.error('Ticket generation error:', err);
  }
}
