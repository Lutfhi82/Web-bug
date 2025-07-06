const DATA_URL = 'github db mu';

async function login() {
  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();

  if (!user || !pass) return alert("Lengkapi semua kolom");

  try {
    const res = await fetch(DATA_URL);
    const users = await res.json();

    const match = users.find(u => u.username === user && u.password === pass);
    if (!match) return alert("Username atau password salah");

    const now = new Date();
    const expireDate = new Date(match.active_until + 'T23:59:59Z'); 

    if (now > expireDate) {
      return alert("Akun expired per tanggal: " + match.active_until);
    }

    const expiry = Date.now() + 5 * 60 * 1000; 
    localStorage.setItem("session", JSON.stringify({ user, expiry }));
    window.location.href = "/";

  } catch (err) {
    alert("Gagal ambil data user: " + err.message);
  }
}

function checkSession() {
  const session = JSON.parse(localStorage.getItem("session"));
  const now = Date.now();

  if (!session || now > session.expiry) {
    alert("Login Require\nOur session saved 5 minute after login");
    localStorage.removeItem("session");
    window.location.href = "/login";
  } else {
    const remaining = session.expiry - now;
    setTimeout(() => {
      alert("Session end, Please Re-Login now");
      localStorage.removeItem("session");
      window.location.href = "/login";
    }, remaining);
  }
}
function sendRequest() {
  const number = document.getElementById('numberInput').value.trim();
  const type = document.getElementById('typeSelect').value;
  const jid = number + "@s.whatsapp.net";

  if (!number.startsWith("62")) {
    return alert("Number must be prefixed 62 (not 08)");
  }

  let url = "";

  switch (type) {
    case "1":
      url = `http://ip:port/radzzoffc?chatId=${encodeURIComponent(jid)}&type=1`;
      break;
    case "2":
      url = `http://ip:port/radzzoffc?chatId=${encodeURIComponent(jid)}&type=2`;
      break;
    case "dly":
      url = `https://ip:port/delay/trigger?chatId=${encodeURIComponent(jid)}&type=3`;
      break;
    default:
      return alert("Invalid type selected");
  }

  fetch(url)
    .then(res => {
      if (!res.ok) throw new Error("Fetch failed");
      return res.json();
    })
    .then(() => alert("Success Send to: " + jid))
    .catch(err => alert("Failed: " + err.message));
}

particlesJS.load('particles-js', '/assets/particles.json', function () {
  console.log('particles.js loaded');
});

const storeBtn = document.getElementById('store-btn');
  const storePopup = document.getElementById('store-popup');
  const WA_OWNER = '6285850493138';

  storeBtn.addEventListener('click', () => {
    storePopup.style.display = storePopup.style.display === 'grid' ? 'none' : 'grid';
  });

  storePopup.addEventListener('click', (e) => {
    if (e.target === storePopup) {
      storePopup.style.display = 'none';
    }
  });

  function buy(paket) {
    const pesan = `Halo, saya ingin membeli akses: *${paket}*`;
    const url = `https://wa.me/${WA_OWNER}?text=${encodeURIComponent(pesan)}`;
    window.open(url, '_blank');
    storePopup.style.display = 'none';
  }