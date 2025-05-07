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
      alert('Email saved!');
      document.getElementById('emailForm').reset();
    } else {
      alert('Failed to save email.'+ responseBody.error);
    }
  });

  document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Fetch all emails from the backend
    const res = await fetch('/api/contact');
    const emails = await res.json();

    // Convert createdAt from string to Date and sort by descending order
    const sortedEmails = emails
      .map(email => ({
        ...email,
        createdAt: new Date(email.createdAt),  // Convert createdAt from string to Date object
      }))
      .sort((a, b) => b.createdAt - a.createdAt);  // Sort by descending date (newest first)

    // Render the sorted emails in the table
    renderEmailsTable(sortedEmails);
  } catch (err) {
    console.error('Error fetching emails:', err);
  }
});

// Function to render emails in a table
function renderEmailsTable(emails) {
  const tableBody = document.getElementById('emailsTableBody'); // Assuming you have a <tbody> with id="emailsTableBody"
  
  // Clear existing table rows
  tableBody.innerHTML = '';

  // Loop through the emails and create table rows
  emails.forEach(email => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${email.name}</td>
      <td>${email.email}</td>
      <td>${email.message}</td>
      <td>${new Date(email.createdAt).toLocaleString()}</td>  <!-- Format the date -->
    `;
    tableBody.appendChild(row);
  });
}

  