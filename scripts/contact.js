document.getElementById('emailForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const formData = {
      name: document.getElementById('nameInput').value,
      email: document.getElementById('emailInput').value,
      message: document.getElementById('messageInput').value,
    };
  
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const responseBody = await res.json();
  
    if (res.ok) {
      alert('Email saved!');
      document.getElementById('emailForm').reset();
    } else {
      alert('Failed to save email.'+ responseBody.error);
    }
  });
  