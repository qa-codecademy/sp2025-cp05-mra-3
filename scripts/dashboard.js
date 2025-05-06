document.getElementById('userForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const userFormData = {
      name: document.getElementById('userNameInput').value,
      email: document.getElementById('userNameEmail').value,
      password: document.getElementById('userNamePassword').value,
    };
  
    const res = await fetch('/api/dashboard', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userFormData),
    });

    const responseBody = await res.json();
  
    if (res.ok) {
      alert('Content saved!');
      document.getElementById('contentForm').reset();
    } else {
      alert('Failed to save content.'+ responseBody.error);
    }
  });
  