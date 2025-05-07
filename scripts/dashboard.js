// user sign up form - start
document.getElementById('submitToggleNewUser').addEventListener('click', () => {
  const wrapper = document.getElementById('signup-form-wrapper');
  if (wrapper.style.display === 'none' || wrapper.style.display === '') {
    wrapper.style.display = 'block';
  } else {
    wrapper.style.display = 'none';
  }
});

document.getElementById('userForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const userFormData = {
      name: document.getElementById('userNameInput').value,
      email: document.getElementById('userNameEmail').value,
      password: document.getElementById('userNamePassword').value,
      createdAt: new Date().toISOString()
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
// user sign up form - end
// table with all emails - start
  document.getElementById('submitToggleAllEmails').addEventListener('click', () => {
    const wrapper = document.getElementById('emailTableWrapper');
    if (wrapper.style.display === 'none' || wrapper.style.display === '') {
      wrapper.style.display = 'block';
    } else {
      wrapper.style.display = 'none';
    }
  });

  document.addEventListener('DOMContentLoaded', async () => {
    try {
      const res = await fetch('/api/contact');
      if (!res.ok) throw new Error('Failed to fetch emails');
  
      const emails = await res.json();
      if (!Array.isArray(emails)) throw new Error('Invalid data format');
  
      const sortedEmails = emails
        .map(email => ({
          ...email,
          createdAt: new Date(email.createdAt)
        }))
        .sort((a, b) => b.createdAt - a.createdAt);
  
      renderEmailsTable(sortedEmails);
    } catch (err) {
      console.error('Error fetching emails:', err);
      alert('Could not load emails.');
    }
  });
  
  function renderEmailsTable(emails) {
    const container = document.getElementById('emailsContainer');
    container.innerHTML = '';
  
    emails.forEach(email => {
      const entry = document.createElement('div');
      entry.classList.add('email-entry');
  
      entry.innerHTML = `
        <div><strong>Date:</strong> ${new Date(email.createdAt).toLocaleString()}</div>
        <div><strong>Name:</strong> ${email.name}</div>
        <div><strong>Email:</strong> ${email.email}</div>
        <div><strong>Message:</strong> ${email.message}</div>
      `;
      container.appendChild(entry);
    });
  }
// table with all emails - end