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
    rating: Number(document.getElementById('ratingInput').value),
    opinion: document.getElementById('opinionInput').value,
    createdAt: new Date().toISOString(),
    public: 'no',
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
// all reviews list - start
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const res = await fetch('/api/review');
    if (!res.ok) throw new Error('Failed to fetch reviews');

    const reviews = await res.json();
    const publicReviews = reviews.filter(review => review.public === "yes");
    const sortedReviews = publicReviews
      .map(review => ({
        ...review,
        createdAt: new Date(review.createdAt)
      }))
      .sort((a, b) => b.createdAt - a.createdAt);

    renderReviewsTable(sortedReviews);
  } catch (err) {
    console.error('Error fetching reviews:', err);
    alert('Could not load reviews.');
  }
});

function renderReviewsTable(reviews) {
  const container = document.getElementById('reviewsContainer');
  container.innerHTML = '';

  reviews.forEach(review => {
    const entry = document.createElement('div');
    entry.classList.add('review');

    if (review.rating === 1) {
    entry.innerHTML = `
        <div class="review-header">
          <h3> ${review.name}</h3>
          <div class="stars">&#9733&#9734&#9734&#9734&#9734</div>
        </div>
        <p id="review-createdAt"> ${new Date(review.createdAt).toLocaleString()}</p>
        <p id="review-opinion"> ${review.opinion}</p>
      `;
    } else if (review.rating === 2) {
    entry.innerHTML = `
        <div class="review-header">
          <h3> ${review.name}</h3>
          <div class="stars">&#9733&#9733&#9734&#9734&#9734</div>
        </div>
        <p id="review-createdAt"> ${new Date(review.createdAt).toLocaleString()}</p>
        <p id="review-opinion"> ${review.opinion}</p>
      `;
    }else if (review.rating === 3) {
    entry.innerHTML = `
        <div class="review-header">
          <h3> ${review.name}</h3>
          <div class="stars">&#9733&#9733&#9733&#9734&#9734</div>
        </div>
        <p id="review-createdAt"> ${new Date(review.createdAt).toLocaleString()}</p>
        <p id="review-opinion"> ${review.opinion}</p>
      `;
    }else if (review.rating === 4) {
    entry.innerHTML = `
        <div class="review-header">
          <h3> ${review.name}</h3>
          <div class="stars">&#9733&#9733&#9733&#9733&#9734</div>
        </div>
        <p id="review-createdAt"> ${new Date(review.createdAt).toLocaleString()}</p>
        <p id="review-opinion"> ${review.opinion}</p>
      `;
    }else {
    entry.innerHTML = `
        <div class="review-header">
          <h3> ${review.name}</h3>
          <div class="stars">&#9733&#9733&#9733&#9733&#9733</div>
        </div>
        <p id="review-createdAt"> ${new Date(review.createdAt).toLocaleString()}</p>
        <p id="review-opinion"> ${review.opinion}</p>
      `;
    }
    container.appendChild(entry);
  });
}

// all reviews list - end