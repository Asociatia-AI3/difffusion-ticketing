async function handlePartnerLogin() {
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
          <button class="action-button" onclick="document.getElementById('qrInput').click()">Scan Ticket</button>
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
    userBox.innerHTML = `<button class="action-button" onclick="generateTicket()">Generate Ticket</button>`;
  } else if (role === 'Partner') {
    userBox.classList.add('hidden');
    document.body.style.backgroundColor = '#659287';
    header.innerText = 'Partner';
    partnerBox.outerHTML = `
        <div class="box partner-box" id="partnerBox">
          <div id="partnerLoginForm" >
            <div id="loginError" style="display:none;">Wrong credentials</div>
            <input id="username" type="text" name="username" placeholder="Partner name" autocomplete="off" />
            <input id="password" type="password" name="password" placeholder="Password" autocomplete="off" />
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
      link.download = `ticket-${body.name}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });

    closeGenerateTicketModal();
  } catch (err) {
    console.error('Ticket generation error:', err);
  }
}

function resetQRInput() {
  const qrInput = document.getElementById('qrInput');
  qrInput.value = '';
}

function showPopupMessage(text) {
  document.getElementById('popupText').textContent = text;
  document.getElementById('popupMessage').style.display = 'flex';
}

function closePopup() {
  document.getElementById('popupMessage').style.display = 'none';
}

async function scanQRCode(event) {
  const file = event.target.files[0];
  if (!file) return;

  const img = new Image();
  const reader = new FileReader();

  reader.onload = function (e) {
    img.onload = async function () {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height);

      if (code?.data) {
        try {
          const res = await fetch(`/process?code=${encodeURIComponent(code.data)}`);
          const message = res.ok ? 'Ticket Valid' : 'Ticket Invalid';
          showPopupMessage(message);
        } catch (err) {
          showPopupMessage('Error checking ticket');
        }
      } else {
        showPopupMessage('No QR code found in image.');
      }

      resetQRInput();
    };
    img.src = e.target.result;
  };

  reader.readAsDataURL(file);
}
