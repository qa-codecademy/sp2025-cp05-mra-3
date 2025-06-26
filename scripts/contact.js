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
// adminpanel - start 
// user sign up form - start
document.getElementById('submitToggleNewUser').addEventListener('click', () => {
  const wrapper = document.getElementById('signup-form-wrapper');
  if (wrapper.style.display === 'none' || wrapper.style.display === '') {
    wrapper.style.display = 'block';
    document.getElementById('userTableWrapper').style.display = 'none';
    document.getElementById('emailTableWrapper').style.display = 'none';
    document.getElementById('contentTableWrapper').style.display = 'none';
    document.getElementById('card-form-wrapper').style.display = 'none';
    document.getElementById('cardTableWrapper').style.display = 'none';
    document.getElementById('reviewTableWrapper').style.display = 'none';
    wrapper.focus();
  } else {
    wrapper.style.display = 'none';
  }
});

document.getElementById('userSignupForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const userFormData = {
    name: document.getElementById('userNameInput').value,
    email: document.getElementById('userNameEmail').value,
    password: document.getElementById('userNamePassword').value,
    enabled: 'true',
  };

  const res = await fetch('/api/user', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userFormData),
  });

  const responseBody = await res.json();

  if (res.ok) {
    alert('User saved!');
    document.getElementById('userSignupForm').reset();
    location.reload(true);
  } else {
    alert('Failed to save user.' + responseBody.error);
  }
});
// user sign up form - end
// table with all users - start
let allUsers = [];
document.getElementById('submitToggleAllUsers').addEventListener('click', () => {
  const wrapper = document.getElementById('userTableWrapper');
  if (wrapper.style.display === 'none' || wrapper.style.display === '') {
    wrapper.style.display = 'block';
    document.getElementById('signup-form-wrapper').style.display = 'none';
    document.getElementById('emailTableWrapper').style.display = 'none';
    document.getElementById('contentTableWrapper').style.display = 'none';
    document.getElementById('card-form-wrapper').style.display = 'none';
    document.getElementById('cardTableWrapper').style.display = 'none';
    wrapper.focus();
  } else {
    wrapper.style.display = 'none';
  }
});

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const res = await fetch('/api/user');
    if (!res.ok) throw new Error('Failed to fetch users');

    const users = await res.json();
    const sortedUsers = users
      .map(user => ({
        ...user,
      }))
      .sort((a, b) => {
        const nameA = a.name || '';
        const nameB = b.name || '';
        return nameA.localeCompare(nameB);
      });

    allUsers = sortedUsers

    renderUsersTable(allUsers);
  } catch (err) {
    console.error('Error fetching users:', err);
    alert('Could not load users.');
  }
});

//  Log in and out simulation - start
document.getElementById('logInButton').addEventListener('click', (e) => {
  e.preventDefault();
  localStorage.setItem('isLoggedIn', '22a73cfa-6c65-4849-b816-4ada6408daac');
  alert('Logged in! LocalStorage set.');
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  // location.reload()
  console.log(isLoggedIn);
});

document.getElementById('logOutButton').addEventListener('click', (e) => {
  e.preventDefault();
  localStorage.removeItem('isLoggedIn');
  alert('Logged out! LocalStorage removed.');
});
const adminId = 'fb9e5650-ce84-4ce4-9247-c9aa53df0506'
//  Log in and out simulation - end
function renderUsersTable(users) {
  const container = document.getElementById('usersContainer');
  container.innerHTML = '';

  const loggedInId = localStorage.getItem('isLoggedIn');
  const isAdmin = (loggedInId === adminId);

  users.forEach(user => {
    // Toggle enabled status:
    // Admin can toggle all users, normal user only own row
    const canToggle = isAdmin || (loggedInId === user.id);

    const cursorStyle = canToggle ? 'pointer' : 'default';
    const colorStyle = canToggle ? 'blue' : 'black';
    const onclickHandler = canToggle ? `onclick="toggleEnabled(this, '${user.id}')"` : '';

    const entry = document.createElement('div');
    entry.classList.add('user-entry');
    entry.innerHTML = `
      <div><strong class="onscreenText adminhtmlNumber:"></strong><p style="display: inline;">${user.id}</p></div>
      <div><strong class="onscreenText adminhtmlFullName:"></strong><p class="onscreenText${user.id}" style="display: inline;" onclick="this.focus()">${user.name}</p></div>
      <div><strong class="onscreenText adminhtmlEmail:"></strong><p class="onscreenText${user.id}" style="display: inline;" onclick="this.focus()">${user.email}</p></div>
      <div><strong class="onscreenText adminhtmlPassword:"></strong><p class="onscreenText${user.id}" style="display: inline;">${'•'.repeat(user.password.length)}</p></div>
      <div><strong class="onscreenText adminhtmlEnabled:"></strong><p class="onscreenText${user.id} enabled-status" style="display: inline; cursor: ${cursorStyle}; color: ${colorStyle};" tabindex="0" ${onclickHandler}>${user.enabled}</p></div>

      <button id="enableEdit${user.id}" class="onscreenText adminhtmlUpdate" onclick="enableUserEdit('${user.id}')" style="display: inline;" type="button"></button>
      <button id="cancelEdition${user.id}" class="onscreenText adminhtmlCancel" onclick="cancelUserEdition('${user.id}', '${user.name}', '${user.email}', '${user.password}', '${user.enabled}')" style="display: none;" type="button"></button>
      <button id="saveEdition${user.id}" class="onscreenText adminhtmlSave" onclick="saveUserEdition('${user.id}')" style="display: none;" type="button"></button>
    `;
    container.appendChild(entry);
  });
}

function toggleEnabled(element, userId) {
  let current = element.textContent;
  let newValue = (current === 'true') ? 'false' : 'true';
  element.textContent = newValue;
  saveUserEdition(userId)

  // You can update your allUsers data or backend here accordingly
  const user = allUsers.find(u => u.id == userId);
  if (user) {
    user.enabled = newValue;
  }
}

function enableUserEdit(userId) {
  const onscreenUserId = "onscreenText" + userId;
  const thisButtonId = "enableEdit" + userId;
  const otherButton1Id = "saveEdition" + userId;
  const otherButton2Id = "cancelEdition" + userId;

  const elements = document.getElementsByClassName(onscreenUserId);
  const user = allUsers.find(u => u.id == userId);
  if (!user) return alert('User not found.');

  const isLoggedIn = localStorage.getItem('isLoggedIn');
  if (isLoggedIn === user.id) {
    document.getElementById(otherButton1Id).style.display = "inline";
    document.getElementById(otherButton2Id).style.display = "inline";
    document.getElementById(thisButtonId).style.display = "none";

    for (let i = 0; i < elements.length - 1; i++) {
      const element = elements[i];
      element.contentEditable = true;
      element.style.border = '1px dashed gray';
    }
  } else {
    alert("You can only edit your own user details.");
  }
}
// 

function cancelUserEdition(userId, userName, userEmail, userPassword, userEnabled) {
  const onscreenUserId = "onscreenText" + userId
  const thisButtonId = "cancelEdition" + userId
  const otherButton1Id = "enableEdit" + userId
  const otherButton2Id = "saveEdition" + userId
  document.getElementById(otherButton1Id).style.display = "inline"
  document.getElementById(otherButton2Id).style.display = "none"
  document.getElementById(thisButtonId).style.display = "none"

  document.getElementsByClassName(onscreenUserId)[0].innerText = userName
  document.getElementsByClassName(onscreenUserId)[1].innerText = userEmail
  document.getElementsByClassName(onscreenUserId)[2].innerText = userPassword
  document.getElementsByClassName(onscreenUserId)[3].innerText = userEnabled

  const elements = document.getElementsByClassName(onscreenUserId);
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    element.contentEditable = false;
    element.style.border = 'none';
  }
}

async function saveUserEdition(userId) {
  const onscreenUserId = "onscreenText" + userId
  const thisButtonId = "saveEdition" + userId
  const otherButton1Id = "enableEdit" + userId
  const otherButton2Id = "cancelEdition" + userId
  document.getElementById(otherButton1Id).style.display = "inline"
  document.getElementById(otherButton2Id).style.display = "none"
  document.getElementById(thisButtonId).style.display = "none"
  const elements = document.getElementsByClassName(onscreenUserId);
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    element.contentEditable = false;
    element.style.border = 'none';
  }
  // changing user - start
  const userFormData = {
    name: document.getElementsByClassName(onscreenUserId)[0].innerText,
    email: document.getElementsByClassName(onscreenUserId)[1].innerText,
    password: document.getElementsByClassName(onscreenUserId)[2].innerText,
    enabled: document.getElementsByClassName(onscreenUserId)[3].innerText,
    id: userId,
  };

  const res = await fetch('/api/user', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userFormData),
  });

  const responseBody = await res.json();

  if (res.ok) {
    alert('User changed!');
    location.reload();
  } else {
    alert('Failed to change user. ' + (responseBody.message || 'Unknown error.'));
    const oldUser = allUsers.find(u => u.id == userId);
    document.getElementsByClassName(onscreenUserId)[0].innerText = oldUser.name;
    document.getElementsByClassName(onscreenUserId)[1].innerText = oldUser.email;
    document.getElementsByClassName(onscreenUserId)[2].innerText = '•'.repeat(user.password.length);
    document.getElementsByClassName(onscreenUserId)[3].innerText = oldUser.enabled;
  }
  // // changing users - end
}
// table with all users - end
// table with all emails - start
document.getElementById('submitToggleAllEmails').addEventListener('click', () => {
  const wrapper = document.getElementById('emailTableWrapper');
  if (wrapper.style.display === 'none' || wrapper.style.display === '') {
    wrapper.style.display = 'block';
    document.getElementById('signup-form-wrapper').style.display = 'none';
    document.getElementById('userTableWrapper').style.display = 'none';
    document.getElementById('contentTableWrapper').style.display = 'none';
    document.getElementById('card-form-wrapper').style.display = 'none';
    document.getElementById('cardTableWrapper').style.display = 'none';
    wrapper.focus();
  } else {
    wrapper.style.display = 'none';
  }
});

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const res = await fetch('/api/contact');
    if (!res.ok) throw new Error('Failed to fetch emails');

    const emails = await res.json();
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
        <div><strong class = "onscreenText adminhtmlDate:"></strong> ${new Date(email.createdAt).toLocaleString()}</div>
        <div><strong class = "onscreenText adminhtmlName:"></strong> ${email.name}</div>
        <div><strong class = "onscreenText adminhtmlEmail:"></strong> ${email.email}</div>
        <div><strong class = "onscreenText adminhtmlMessage:"></strong> ${email.message}</div>
      `;
    container.appendChild(entry);
  });
}
// table with all emails - start
// table with all contents - start
let allContents = [];
document.getElementById('submitToggleAllContents').addEventListener('click', () => {
  const wrapper = document.getElementById('contentTableWrapper');
  if (wrapper.style.display === 'none' || wrapper.style.display === '') {
    wrapper.style.display = 'block';
    document.getElementById('signup-form-wrapper').style.display = 'none';
    document.getElementById('userTableWrapper').style.display = 'none';
    document.getElementById('emailTableWrapper').style.display = 'none';
    document.getElementById('card-form-wrapper').style.display = 'none';
    document.getElementById('cardTableWrapper').style.display = 'none';
    wrapper.focus();
  } else {
    wrapper.style.display = 'none';
  }
});

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const res = await fetch('/api/content');
    if (!res.ok) throw new Error('Failed to fetch contents');

    const contents = await res.json();
    const sortedContents = contents
      .map(content => ({
        ...content,
      }))
      .sort((a, b) => b.createdAt - a.createdAt);

    allContents = sortedContents

    renderContentsTable(allContents);
  } catch (err) {
    console.error('Error fetching contents:', err);
    alert('Could not load contents.');
  }
});
// selecting page-filter - start
const menuList = document.getElementsByClassName('pageMenu')
for (let i = 0; i < menuList.length; i++) {
  menuList[i].addEventListener('click', () => {
    document.getElementById('dropdown1-toggle').innerHTML = menuList[i].innerHTML
    const page = menuList[i].innerHTML.trim().toLowerCase()
    filterEntriesByPage(page)
  });
}

function filterEntriesByPage(page) {
  const entries = document.querySelectorAll('.content-entry');
  entries.forEach(entry => {
    const idParagraph = entry.querySelector('div > p');
    const contentId = idParagraph.textContent.trim().toLowerCase();

    if ((page !== 'alle') && (page !== 'all') && (page !== 'сите')) {
      if (contentId.includes(page)) {
        entry.style.display = 'block';
      } else {
        entry.style.display = 'none';
      }
    } else {
      entry.style.display = 'block';
    }
  });
}
// selecting page-filter - end
function renderContentsTable(contents) {
  const container = document.getElementById('contentsContainer');
  container.innerHTML = '';
  contents.forEach(content => {
    const entry = document.createElement('div');
    entry.classList.add('content-entry');
    entry.innerHTML = `
      <div><strong class = "onscreenText adminhtmlNumber:"></strong><p style="display: inline;">${content.id}</p></div>
      <div><strong class = "onscreenText adminhtmlGerman:"></strong><p class = "onscreenText${content.id}" style="display: inline;" onclick="this.focus()" >${content.german}</p></div>
      <div><strong class = "onscreenText adminhtmlEnglish:"></strong><p class = "onscreenText${content.id}" style="display: inline;" onclick="this.focus()" >${content.english}</p></div>
      <div><strong class = "onscreenText adminhtmlMacedonian:"></strong><p class = "onscreenText${content.id}" style="display: inline;" onclick="this.focus()" >${content.macedonian}</div>
      <button id="enableEdit${content.id}" class="onscreenText adminhtmlUpdate" onclick="enableContentEdit('${content.id}')" style="display: inline;" type="button"></button>
      <button id="cancelEdition${content.id}" class="onscreenText adminhtmlCancel" onclick="cancelContentEdition('${content.id}', '${content.german}', '${content.english}', '${content.macedonian}')" style="display: none;" type="button"></button>
      <button id="saveEdition${content.id}" class="onscreenText adminhtmlSave" onclick="saveContentEdition('${content.id}')" style="display: none;" type="button"></button>
    `;
    container.appendChild(entry);
  });
}

function enableContentEdit(contentId) {
  const onscreenContentId = "onscreenText" + contentId
  const thisButtonId = "enableEdit" + contentId
  const otherButton1Id = "saveEdition" + contentId
  const otherButton2Id = "cancelEdition" + contentId
  document.getElementById(otherButton1Id).style.display = "inline"
  document.getElementById(otherButton2Id).style.display = "inline"
  document.getElementById(thisButtonId).style.display = "none"
  const elements = document.getElementsByClassName(onscreenContentId);
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    element.contentEditable = true;
    element.style.border = '1px dashed gray';
  }
}

function cancelContentEdition(contentId, contentGerman, contentEnglish, contentMacedonian) {
  const onscreenContentId = "onscreenText" + contentId
  const thisButtonId = "cancelEdition" + contentId
  const otherButton1Id = "enableEdit" + contentId
  const otherButton2Id = "saveEdition" + contentId
  document.getElementById(otherButton1Id).style.display = "inline"
  document.getElementById(otherButton2Id).style.display = "none"
  document.getElementById(thisButtonId).style.display = "none"

  document.getElementsByClassName(onscreenContentId)[0].innerText = contentGerman
  document.getElementsByClassName(onscreenContentId)[1].innerText = contentEnglish
  document.getElementsByClassName(onscreenContentId)[2].innerText = contentMacedonian
  const elements = document.getElementsByClassName(onscreenContentId);
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    element.contentEditable = false;
    element.style.border = 'none';
  }
}

async function saveContentEdition(contentId) {
  const onscreenContentId = "onscreenText" + contentId
  const thisButtonId = "saveEdition" + contentId
  const otherButton1Id = "enableEdit" + contentId
  const otherButton2Id = "cancelEdition" + contentId
  document.getElementById(otherButton1Id).style.display = "inline"
  document.getElementById(otherButton2Id).style.display = "none"
  document.getElementById(thisButtonId).style.display = "none"
  const elements = document.getElementsByClassName(onscreenContentId);
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    element.contentEditable = false;
    element.style.border = 'none';
  }
  // changing content - start
  const contentFormData = {
    german: document.getElementsByClassName(onscreenContentId)[0].innerText,
    english: document.getElementsByClassName(onscreenContentId)[1].innerText,
    macedonian: document.getElementsByClassName(onscreenContentId)[2].innerText,
    id: contentId,
  };

  const res = await fetch('/api/content', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contentFormData),
  });

  const responseBody = await res.json();

  if (res.ok) {
    alert('Content changed!');
    location.reload();
  } else {
    alert('Failed to change content. ' + (responseBody.message || 'Unknown error.'));
  }
  // // changing content - end
}
// table with all contents - end
// cards - start
document.getElementById('submitToggleNewCard').addEventListener('click', () => {
  const wrapper = document.getElementById('card-form-wrapper');
  if (wrapper.style.display === 'none' || wrapper.style.display === '') {
    wrapper.style.display = 'block';
    document.getElementById('signup-form-wrapper').style.display = 'none';
    document.getElementById('userTableWrapper').style.display = 'none';
    document.getElementById('emailTableWrapper').style.display = 'none';
    document.getElementById('contentTableWrapper').style.display = 'none';
    document.getElementById('cardTableWrapper').style.display = 'none';
    document.getElementById('reviewTableWrapper').style.display = 'none';
    wrapper.focus();
  } else {
    wrapper.style.display = 'none';
  }
});
// new card form - start

document.getElementById('newCardForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const imageFile = document.getElementById('cardPicture').files[0];

  if (!imageFile) {
    alert('Please select an image file.');
    return;
  }

  // Cloudinary settings
  const cloudName = 'du3oe7qmq';
  const uploadPreset = 'unsigned_preset';

  // Upload image to Cloudinary
  const formData = new FormData();
  formData.append('file', imageFile);
  formData.append('upload_preset', uploadPreset);

  let imageUrl;

  try {
    const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
      method: 'POST',
      body: formData,
    });

    const uploadData = await uploadRes.json();

    if (!uploadData.secure_url) {
      throw new Error('Image upload failed.');
    }

    imageUrl = uploadData.secure_url;
  } catch (err) {
    console.error('Cloudinary upload error:', err);
    alert('Image upload failed. Please try again.');
    return;
  }

  // Send the card data with the image URL to your backend
  const cardFormData = {
    titleDEU: document.getElementById('cardTitleDEU').value,
    titleENG: document.getElementById('cardTitleENG').value,
    titleMKD: document.getElementById('cardTitleMKD').value,
    descriptionDEU: document.getElementById('cardDescriptionDEU').value,
    descriptionENG: document.getElementById('cardDescriptionENG').value,
    descriptionMKD: document.getElementById('cardDescriptionMKD').value,
    picture: imageUrl,
  };

  try {
    const res = await fetch('/api/card', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cardFormData),
    });

    const responseBody = await res.json();

    if (res.ok) {
      alert('Card saved!');
      document.getElementById('newCardForm').reset();
      location.reload();
    } else {
      alert('Failed to save card. ' + (responseBody.message || 'Unknown error.'));
    }
  } catch (err) {
    console.error('Saving card error:', err);
    alert('Unexpected error saving card.');
  }
});

// new card form - end

// table with all cards - start
let allCards = [];
document.getElementById('submitToggleAllCards').addEventListener('click', () => {
  const wrapper = document.getElementById('cardTableWrapper');
  if (wrapper.style.display === 'none' || wrapper.style.display === '') {
    wrapper.style.display = 'block';
    document.getElementById('signup-form-wrapper').style.display = 'none';
    document.getElementById('userTableWrapper').style.display = 'none';
    document.getElementById('emailTableWrapper').style.display = 'none';
    document.getElementById('contentTableWrapper').style.display = 'none';
    document.getElementById('card-form-wrapper').style.display = 'none';
    document.getElementById('reviewTableWrapper').style.display = 'none';
    wrapper.focus();
  } else {
    wrapper.style.display = 'none';
  }
});

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const res = await fetch('/api/card');
    if (!res.ok) throw new Error('Failed to fetch users');

    const cards = await res.json();
    const sortedCards = cards
      .map(card => ({
        ...card,
      }))
      .sort((a, b) => {
        const titleA = a.titleDEU || '';
        const titleB = b.titleDEU || '';
        return titleA.localeCompare(titleB);
      });

    allCards = sortedCards

    renderCardsTable(allCards);
  } catch (err) {
    console.error('Error fetching cards:', err);
    alert('Could not load cards.');
  }
});

function renderCardsTable(cards) {
  const container = document.getElementById('cardsContainer');
  container.innerHTML = '';
  cards.forEach(card => {
    const entry = document.createElement('div');
    entry.classList.add('card-entry');
    entry.innerHTML = `
      <div><strong class = "onscreenText adminhtmlNumber:"></strong><p style="display: inline;">${card.id}</p></div>
      <div><strong class = "onscreenText adminhtmlCardTitel:"></strong><p class = "onscreenText${card.id}" style="display: inline;" onclick="this.focus()" >${card.titleDEU}</p></div>
      <div><strong class = "onscreenText adminhtmlCardTitle:"></strong><p class = "onscreenText${card.id}" style="display: inline;" onclick="this.focus()" >${card.titleENG}</p></div>
      <div><strong class = "onscreenText adminhtmlCardNaslov:"></strong><p class = "onscreenText${card.id}" style="display: inline;" onclick="this.focus()" >${card.titleMKD}</p></div>      
      <div><strong class = "onscreenText adminhtmlCardBeschreibung:"></strong><p class = "onscreenText${card.id}" style="display: inline;" onclick="this.focus()" >${card.descriptionDEU}</p></div>
      <div><strong class = "onscreenText adminhtmlCardDescription:"></strong><p class = "onscreenText${card.id}" style="display: inline;" onclick="this.focus()" >${card.descriptionENG}</p></div>
      <div><strong class = "onscreenText adminhtmlCardOpis:"></strong><p class = "onscreenText${card.id}" style="display: inline;" onclick="this.focus()" >${card.descriptionMKD}</p></div>
      <div><strong class = "onscreenText adminhtmlCardPicture:"></strong><p class = "onscreenText${card.id}" style="display: inline;" onclick="this.focus()">${card.picture}</div>

      <div class="image-preview-container" style="width: 100%; margin-top: 0.5em;">
        <img id="imgPreview${card.id}" src="${card.picture}" style="width: 100%; height: auto; display: block; object-fit: contain;" />
      </div>

      <input type="file" accept="image/*" id="editImageInput${card.id}" style="display: none; margin: 0.5em 0;" />
      <input type="hidden" id="originalImage${card.id}" value="${card.picture}" />

      <button id="enableEdit${card.id}" class="onscreenText adminhtmlUpdate" onclick="enableCardEdit('${card.id}')" style="display: inline;" type="button"></button>
      <button id="cancelEdition${card.id}" class="onscreenText adminhtmlCancel" onclick="cancelCardEdition('${card.id}', '${card.titleDEU}', '${card.titleENG}', '${card.titleMKD}', '${card.descriptionDEU}', '${card.descriptionENG}', '${card.descriptionMKD}', '${card.picture}')" style="display: none;" type="button"></button>
      <button id="saveEdition${card.id}" class="onscreenText adminhtmlSave" onclick="saveCardEdition('${card.id}')" style="display: none;" type="button"></button>
    `;
    container.appendChild(entry);
  });
}

function enableCardEdit(cardId) {
  console.log(cardId)

  const fileInput = document.getElementById(`editImageInput${cardId}`);
  const imagePreview = document.getElementById(`imgPreview${cardId}`);

  const onscreenCardId = "onscreenText" + cardId
  const thisButtonId = "enableEdit" + cardId
  const otherButton1Id = "saveEdition" + cardId
  const otherButton2Id = "cancelEdition" + cardId
  document.getElementById(otherButton1Id).style.display = "inline"
  document.getElementById(otherButton2Id).style.display = "inline"
  document.getElementById(thisButtonId).style.display = "none"
  fileInput.style.display = "block";

  const elements = document.getElementsByClassName(onscreenCardId);
  for (let i = 0; i < elements.length - 1; i++) {
    elements[i].contentEditable = true;
    elements[i].style.border = '1px dashed gray';
  }
  // Listen for file selection to preview
  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      imagePreview.src = previewUrl;
    }
  });
}
// 

function cancelCardEdition(cardId, titleDEU, titleENG, titleMKD, descriptionDEU, descriptionENG, descriptionMKD, picture) {

  const onscreenCardId = "onscreenText" + cardId;
  const thisButtonId = "cancelEdition" + cardId;
  const otherButton1Id = "enableEdit" + cardId;
  const otherButton2Id = "saveEdition" + cardId;

  document.getElementById(otherButton1Id).style.display = "inline";
  document.getElementById(otherButton2Id).style.display = "none";
  document.getElementById(thisButtonId).style.display = "none";
  document.getElementById(`editImageInput${cardId}`).style.display = "none";


  const elements = document.getElementsByClassName(onscreenCardId);
  elements[0].innerText = titleDEU;
  elements[1].innerText = titleENG;
  elements[2].innerText = titleMKD;
  elements[3].innerText = descriptionDEU;
  elements[4].innerText = descriptionENG;
  elements[5].innerText = descriptionMKD;
  elements[6].innerText = picture;

  for (let i = 0; i < elements.length; i++) {
    elements[i].contentEditable = false;
    elements[i].style.border = 'none';
  }
  // Reset image preview to original
  const originalImageUrl = document.getElementById(`originalImage${cardId}`).value;
  const imagePreview = document.getElementById(`imgPreview${cardId}`);
  imagePreview.src = originalImageUrl;
}

async function saveCardEdition(cardId) {
  const onscreenCardId = "onscreenText" + cardId;
  const thisButtonId = "saveEdition" + cardId;
  const otherButton1Id = "enableEdit" + cardId;
  const otherButton2Id = "cancelEdition" + cardId;
  const fileInput = document.getElementById(`editImageInput${cardId}`);
  const imagePreview = document.getElementById(`imgPreview${cardId}`);

  document.getElementById(otherButton1Id).style.display = "inline";
  document.getElementById(otherButton2Id).style.display = "none";
  document.getElementById(thisButtonId).style.display = "none";
  document.getElementById(`editImageInput${cardId}`).style.display = "none";
  const elements = document.getElementsByClassName(onscreenCardId);
  for (let i = 0; i < elements.length; i++) {
    elements[i].contentEditable = false;
    elements[i].style.border = 'none';
  }

  // Get new values
  const updatedCard = {
    titleDEU: elements[0].innerText,
    titleENG: elements[1].innerText,
    titleMKD: elements[2].innerText,
    descriptionDEU: elements[3].innerText,
    descriptionENG: elements[4].innerText,
    descriptionMKD: elements[5].innerText,
    picture: elements[6].innerText,
    id: cardId,
  };

  // If a new file is selected, upload it to Cloudinary
  if (fileInput.files[0]) {
    const cloudName = 'du3oe7qmq';
    const uploadPreset = 'unsigned_preset';
    const formData = new FormData();
    formData.append('file', fileInput.files[0]);
    formData.append('upload_preset', uploadPreset);

    try {
      const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
        method: 'POST',
        body: formData,
      });

      const uploadData = await uploadRes.json();

      if (!uploadData.secure_url) {
        throw new Error('Upload failed');
      }

      // Update the picture field with Cloudinary URL
      updatedCard.picture = uploadData.secure_url;
    } catch (err) {
      console.error("Cloudinary upload failed:", err);
      alert("Image upload failed. Changes not saved.");
      return;
    }
  }

  // Save updated card to server
  try {
    const res = await fetch('/api/card', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedCard),
    });

    const responseBody = await res.json();

    if (res.ok) {
      alert('Card updated!');
      location.reload();
    } else {
      throw new Error(responseBody.message || 'Unknown error');
    }
  } catch (err) {
    console.error("Card update failed:", err);
    alert('Failed to save card. ' + err.message);

    // Revert to previous state
    const oldCard = allCards.find(c => c.id === cardId);
    if (oldCard) {
      elements[0].innerText = oldCard.titleDEU;
      elements[1].innerText = oldCard.titleENG;
      elements[2].innerText = oldCard.titleMKD;
      elements[3].innerText = oldCard.descriptionDEU;
      elements[4].innerText = oldCard.descriptionENG;
      elements[5].innerText = oldCard.descriptionMKD;
      elements[6].innerText = oldCard.picture;
      imagePreview.src = oldCard.picture;
    }
  }
}
// cards - end
// table with all reviews - start
let allReviews = [];
document.getElementById('submitToggleAllReviews').addEventListener('click', () => {
  const wrapper = document.getElementById('reviewTableWrapper');
  if (wrapper.style.display === 'none' || wrapper.style.display === '') {
    wrapper.style.display = 'block';
    document.getElementById('signup-form-wrapper').style.display = 'none';
    document.getElementById('userTableWrapper').style.display = 'none';
    document.getElementById('emailTableWrapper').style.display = 'none';
    document.getElementById('contentTableWrapper').style.display = 'none';
    document.getElementById('card-form-wrapper').style.display = 'none';
    document.getElementById('cardTableWrapper').style.display = 'none';
    wrapper.focus();
  } else {
    wrapper.style.display = 'none';
  }
});

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const res = await fetch('/api/review');
    if (!res.ok) throw new Error('Failed to fetch reviews');

    const reviews = await res.json();
    const sortedReviews = reviews
      .map(review => ({
        ...review,
      }))
      .sort((a, b) => b.createdAt - a.createdAt);

    allReviews = sortedReviews

    renderReviewsTable(allReviews);
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
    entry.classList.add('review-entry');
    entry.innerHTML = `
      <div><strong class="onscreenText adminhtmlReviewNumber:"></strong><p style="display: inline;">${review.id}</p></div>
      <div><strong class="onscreenText adminhtmlAllReviewName:"></strong><p class="onscreenText${review.id}" style="display: inline;">${review.name}</p></div>
      <div><strong class="onscreenText adminhtmlAllReviewCreatedAt:"></strong><p class="onscreenText${review.id}" style="display: inline;">${review.createdAt}</p></div>
      <div><strong class="onscreenText adminhtmlAllReviewRating:"></strong><p class="onscreenText${review.id}" style="display: inline;">${review.rating}</p></div>
      <div><strong class="onscreenText adminhtmlAllReviewOpinion:"></strong><p class="onscreenText${review.id}" style="display: inline;">${review.opinion}</p></div>
      <div><strong class="onscreenText adminhtmlAllReviewPublic:"></strong><p class="onscreenText${review.id}" style="display: inline;">${review.public}</p></div>

      <button id="enableEdit${review.id}" class="onscreenText adminhtmlUpdate" onclick="enableReviewEdit('${review.id}')" style="display: inline;" type="button"></button>
      <button id="cancelEdition${review.id}" class="onscreenText adminhtmlCancel" onclick="cancelReviewEdition('${review.id}', '${review.name}', '${review.createdAt}', '${review.rating}', '${review.opinion}', '${review.public}')" style="display: none;" type="button"></button>
      <button id="saveEdition${review.id}" class="onscreenText adminhtmlSave" onclick="saveReviewEdition('${review.id}')" style="display: none;" type="button"></button>
    `;
    container.appendChild(entry);
  });
}

function enableReviewEdit(reviewId) {
  const onscreenReviewId = "onscreenText" + reviewId;
  const thisButtonId = "enableEdit" + reviewId;
  const otherButton1Id = "saveEdition" + reviewId;
  const otherButton2Id = "cancelEdition" + reviewId;
  document.getElementById(otherButton1Id).style.display = "inline";
  document.getElementById(otherButton2Id).style.display = "inline";
  document.getElementById(thisButtonId).style.display = "none";
  const reviewElement = document.getElementsByClassName(onscreenReviewId)[4];
  reviewElement.contentEditable = true;
  reviewElement.style.border = '1px dashed gray';
}

function cancelReviewEdition(reviewId, reviewName, reviewCreatedAt, reviewRating, reviewOpinion, reviewPublic) {
  const onscreenReviewId = "onscreenText" + reviewId;  // Declare it here
  const thisButtonId = "cancelEdition" + reviewId;
  const otherButton1Id = "enableEdit" + reviewId;
  const otherButton2Id = "saveEdition" + reviewId;

  document.getElementById(otherButton1Id).style.display = "inline";
  document.getElementById(otherButton2Id).style.display = "none";
  document.getElementById(thisButtonId).style.display = "none";

  document.getElementsByClassName(onscreenReviewId)[0].innerText = reviewName;
  document.getElementsByClassName(onscreenReviewId)[1].innerText = reviewCreatedAt;
  document.getElementsByClassName(onscreenReviewId)[2].innerText = reviewRating;
  document.getElementsByClassName(onscreenReviewId)[3].innerText = reviewOpinion;
  document.getElementsByClassName(onscreenReviewId)[4].innerText = reviewPublic;

  const reviewElement = document.getElementsByClassName(onscreenReviewId)[4];
  reviewElement.contentEditable = false;
  reviewElement.style.border = 'none';
}

async function saveReviewEdition(reviewId) {
  const onscreenReviewId = "onscreenText" + reviewId
  const thisButtonId = "saveEdition" + reviewId
  const otherButton1Id = "enableEdit" + reviewId
  const otherButton2Id = "cancelEdition" + reviewId
  document.getElementById(otherButton1Id).style.display = "inline"
  document.getElementById(otherButton2Id).style.display = "none"
  document.getElementById(thisButtonId).style.display = "none"
  document.getElementsByClassName(onscreenReviewId)[4].contentEditable = true;
  document.getElementsByClassName(onscreenReviewId)[4].style.border = '1px dashed gray';
  // changing review - start
  const reviewFormData = {
    name: document.getElementsByClassName(onscreenReviewId)[0].innerText,
    createdAt: document.getElementsByClassName(onscreenReviewId)[1].innerText,
    rating: Number(document.getElementsByClassName(onscreenReviewId)[2].innerText),
    opinion: document.getElementsByClassName(onscreenReviewId)[3].innerText,
    public: document.getElementsByClassName(onscreenReviewId)[4].innerText,
    id: reviewId,
  };

  const res = await fetch('/api/review', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(reviewFormData),
  });

  const responseBody = await res.json();

  if (res.ok) {
    alert('Review changed!');
    location.reload();
  } else {
    alert('Failed to change review. ' + (responseBody.message || 'Unknown error.'));
    const oldReview = allReviews.find(u => u.id == userId);
    document.getElementsByClassName(onscreenUserId)[0].innerText = oldReview.name;
    document.getElementsByClassName(onscreenUserId)[1].innerText = oldReview.createdAt;
    document.getElementsByClassName(onscreenUserId)[2].innerText = oldReview.rating;
    document.getElementsByClassName(onscreenUserId)[3].innerText = oldReview.opinion;
    document.getElementsByClassName(onscreenUserId)[4].innerText = oldReview.public;


  }
  // // changing review - end
}
// table with all reviews - end
// adminpanel - end