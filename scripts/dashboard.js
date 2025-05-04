document.getElementById('contentForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const formData = {
      title: document.getElementById('title').value,
      german: document.getElementById('german').value,
      english: document.getElementById('english').value,
      macedonian: document.getElementById('macedonian').value,
    };
  
    const res = await fetch('/api/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const responseBody = await res.json();
  
    if (res.ok) {
      alert('Content saved!');
      document.getElementById('contentForm').reset();
    } else {
      alert('Failed to save content.'+ responseBody.error);
    }
  });
  