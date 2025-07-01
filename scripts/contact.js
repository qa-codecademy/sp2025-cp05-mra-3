// processing email - start
document.getElementById('emailForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const emailFormData = {
    name: document.getElementById('nameInput').value,
    email: document.getElementById('emailInput').value,
    message: document.getElementById('messageInput').value,
    createdAt: new Date().toISOString()
  };

  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(emailFormData),
  });
  const responseBody = await res.json();

  if (res.ok) {
    alert('Email processed!');
    document.getElementById('emailForm').reset();
  } else {
    alert('Failed to process email.' + responseBody.error);
  }
});
// processing email - end