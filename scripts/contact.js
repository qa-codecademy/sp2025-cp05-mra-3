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
      alert('Failed to process email.'+ responseBody.error);
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
    if (!Array.isArray(users)) throw new Error('Invalid data format');

    const sortedUsers = users
      .map(user => ({
        ...user,
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
    
    allUsers = sortedUsers

    renderUsersTable(allUsers);
  } catch (err) {
    console.error('Error fetching users:', err);
    alert('Could not load users.');
  }
});
function renderUsersTable(users) {
  const container = document.getElementById('usersContainer');
  container.innerHTML = '';
  users.forEach(user => {
    const entry = document.createElement('div');
    entry.classList.add('user-entry');
    entry.innerHTML = `
      <div><strong class = "onscreenText adminhtmlNumber:"></strong><p style="display: inline;">${user.id}</p></div>
      <div><strong class = "onscreenText adminhtmlFullName:"></strong><p class = "onscreenText${user.id}" style="display: inline;" onclick="this.focus()" >${user.name}</p></div>
      <div><strong class = "onscreenText adminhtmlEmail:"></strong><p class = "onscreenText${user.id}" style="display: inline;" onclick="this.focus()" >${user.email}</p></div>
      <div><strong class = "onscreenText adminhtmlPassword:"></strong><p class = "onscreenText${user.id}" style="display: inline;" onclick="this.focus()" >${user.password}</div>
      <div><strong class = "onscreenText adminhtmlEnabled:"></strong><p class = "onscreenText${user.id}" style="display: inline;" onclick="this.focus()" >${user.enabled}</div>

      <button id="enableEdit${user.id}" class="onscreenText adminhtmlUpdate" onclick="enableUserEdit('${user.id}')" style="display: inline;" type="button"></button>
      <button id="cancelEdition${user.id}" class="onscreenText adminhtmlCancel" onclick="cancelUserEdition('${user.id}', '${user.name}', '${user.email}', '${user.password}', '${user.enabled}')" style="display: none;" type="button"></button>
      <button id="saveEdition${user.id}" class="onscreenText adminhtmlSave" onclick="saveUserEdition('${user.id}')" style="display: none;" type="button"></button>
    `;
    container.appendChild(entry);
  });
}

function enableUserEdit(userId) {
  const onscreenUserId = "onscreenText"+userId
  const thisButtonId = "enableEdit"+userId
  const otherButton1Id = "saveEdition"+userId
  const otherButton2Id = "cancelEdition"+userId
  document.getElementById(otherButton1Id).style.display = "inline"
  document.getElementById(otherButton2Id).style.display = "inline"
  document.getElementById(thisButtonId).style.display = "none"
  const elements = document.getElementsByClassName(onscreenUserId);
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    element.contentEditable = true;
    element.style.border = '1px dashed gray';
  }
}

function cancelUserEdition(userId, userName, userEmail, userPassword, userEnabled) {
  const onscreenUserId = "onscreenText"+userId
  const thisButtonId = "cancelEdition"+userId
  const otherButton1Id = "enableEdit"+userId
  const otherButton2Id = "saveEdition"+userId
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
  const onscreenUserId = "onscreenText"+userId
  const thisButtonId = "saveEdition"+userId
  const otherButton1Id = "enableEdit"+userId
  const otherButton2Id = "cancelEdition"+userId
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
    } else {
      alert('Failed to change user. ' + (responseBody.message || 'Unknown error.'));
    }
  // // changing content - end
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
    if (!Array.isArray(contents)) throw new Error('Invalid data format');

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
for (let i=0; i<menuList.length; i++){
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

    if ((page !== 'alle')&&(page !== 'all')&&(page !== 'сите')) {
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
  const onscreenContentId = "onscreenText"+contentId
  const thisButtonId = "enableEdit"+contentId
  const otherButton1Id = "saveEdition"+contentId
  const otherButton2Id = "cancelEdition"+contentId
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
  const onscreenContentId = "onscreenText"+contentId
  const thisButtonId = "cancelEdition"+contentId
  const otherButton1Id = "enableEdit"+contentId
  const otherButton2Id = "saveEdition"+contentId
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
  const onscreenContentId = "onscreenText"+contentId
  const thisButtonId = "saveEdition"+contentId
  const otherButton1Id = "enableEdit"+contentId
  const otherButton2Id = "cancelEdition"+contentId
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
    } else {
      alert('Failed to change content. ' + (responseBody.message || 'Unknown error.'));
    }
  // // changing content - end
}
// table with all contents - end
// adminpanel - end