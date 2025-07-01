// user login form - start

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('loginlForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('emailInput').value.trim();
    const password = document.getElementById('passwordInput').value.trim();

    try {
      const res = await fetch('/api/user');
      if (!res.ok) throw new Error('Failed to fetch users');

      const users = await res.json();
      const user = users.find(
        u => u.email === email && u.password === password && u.enabled === "true"
      );

      if (user) {
        localStorage.setItem('isLoggedIn', `${user.id}`);
        window.location.href = './admin.html';
        alert('You are logged into the admin panel.');
      } else {
        window.location.href = './homepage.html';
        alert('You are not authorized to access the admin panel.');
      }
    } catch (err) {
      console.error('Error fetching users:', err);
      alert('Could not load users.');
    }
  });
});

// user login form - start