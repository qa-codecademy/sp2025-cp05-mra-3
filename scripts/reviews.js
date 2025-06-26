// toggle button - start
document.getElementById('submitToggleNewReview').addEventListener('click', () => {
  const wrapper = document.getElementById('review-form');
  if (wrapper.style.display === 'none' || wrapper.style.display === '') {
    wrapper.style.display = 'block';
    wrapper.focus();
  } else {
    wrapper.style.display = 'none';
  }
});
// toggle button - end
// review form - start
document.getElementById('reviewForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const reviewFormData = {
    name: document.getElementById('nameInput').value,
    rating: document.getElementById('ratingInput').value,
    opinion: document.getElementById('opinionInput').value,
    createdAt: new Date().toISOString(),
    public: 'true',
  };

  const res = await fetch('/api/review', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(reviewFormData),
  });

  const responseBody = await res.json();

  if (res.ok) {
    alert('Review saved!');
    document.getElementById('reviewForm').reset();
    location.reload(true);
  } else {
    alert('Failed to save review.' + responseBody.error);
  }
});
// review form - end