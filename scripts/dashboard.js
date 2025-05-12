// user sign up form - start
document.getElementById('submitToggleNewUser').addEventListener('click', () => {
  const wrapper = document.getElementById('signup-form-wrapper');
  if (wrapper.style.display === 'none' || wrapper.style.display === '') {
    wrapper.style.display = 'block';
    document.getElementById('emailTableWrapper').style.display = 'none';
    document.getElementById('contentTableWrapper').style.display = 'none';
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
    alert('Failed to save content.' + responseBody.error);
  }
});
// user sign up form - end
// table with all emails - start
document.getElementById('submitToggleAllEmails').addEventListener('click', () => {
  const wrapper = document.getElementById('emailTableWrapper');
  if (wrapper.style.display === 'none' || wrapper.style.display === '') {
    wrapper.style.display = 'block';
    document.getElementById('signup-form-wrapper').style.display = 'none';
    document.getElementById('contentTableWrapper').style.display = 'none';
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
        <div><strong class = "onscreenText dashboardhtmlDate:"></strong> ${new Date(email.createdAt).toLocaleString()}</div>
        <div><strong class = "onscreenText dashboardhtmlName:"></strong> ${email.name}</div>
        <div><strong class = "onscreenText dashboardhtmlEmail:"></strong> ${email.email}</div>
        <div><strong class = "onscreenText dashboardhtmlMessage:"></strong> ${email.message}</div>
      `;
    container.appendChild(entry);
  });
}
// table with all emails - end
// table with all contents - start
let allContents = [];
document.getElementById('submitToggleAllContents').addEventListener('click', () => {
  const wrapper = document.getElementById('contentTableWrapper');
  if (wrapper.style.display === 'none' || wrapper.style.display === '') {
    wrapper.style.display = 'block';
    document.getElementById('signup-form-wrapper').style.display = 'none';
    document.getElementById('emailTableWrapper').style.display = 'none';
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
      <div><strong class = "onscreenText dashboardhtmlNumber:"></strong><p style="display: inline;">${content.id}</p></div>
      <div><strong class = "onscreenText dashboardhtmlGerman:"></strong><p class = "${content.id}" style="display: inline;" onclick="this.focus()" >${content.german}</p></div>
      <div><strong class = "onscreenText dashboardhtmlEnglish:"></strong><p class = "${content.id}" style="display: inline;" onclick="this.focus()" >${content.english}</p></div>
      <div><strong class = "onscreenText dashboardhtmlMacedonian:"></strong><p class = "${content.id}" style="display: inline;" onclick="this.focus()" >${content.macedonian}</div>
      <button id="enableEdit${content.id}" class="onscreenText dashboardhtmlUpdateContent" onclick="enableEdit('${content.id}')" style="display: inline;" type="button"></button>
      <button id="cancelEdition${content.id}" class="onscreenText dashboardhtmlCancelChanges" onclick="cancelEdition('${content.id}', '${content.german}', '${content.english}', '${content.macedonian}')" style="display: none;" type="button"></button>
      <button id="saveEdition${content.id}" class="onscreenText dashboardhtmlSaveChanges" onclick="saveEdition('${content.id}')" style="display: none;" type="button"></button>
    `;
    container.appendChild(entry);
  });
}

function enableEdit(contentId) {
  const thisButtonId = "enableEdit"+contentId
  const otherButton1Id = "saveEdition"+contentId
  const otherButton2Id = "cancelEdition"+contentId
  document.getElementById(otherButton1Id).style.display = "inline"
  document.getElementById(otherButton2Id).style.display = "inline"
  document.getElementById(thisButtonId).style.display = "none"
  const elements = document.getElementsByClassName(contentId);
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    element.contentEditable = true;
    element.style.border = '1px dashed gray';
  }
}

function cancelEdition(contentId, contentGerman, contentEnglish, contentMacedonian) {
  const thisButtonId = "cancelEdition"+contentId
  const otherButton1Id = "enableEdit"+contentId
  const otherButton2Id = "saveEdition"+contentId
  document.getElementById(otherButton1Id).style.display = "inline"
  document.getElementById(otherButton2Id).style.display = "none"
  document.getElementById(thisButtonId).style.display = "none"

  document.getElementsByClassName(contentId)[0].innerText = contentGerman
  document.getElementsByClassName(contentId)[1].innerText = contentEnglish
  document.getElementsByClassName(contentId)[2].innerText = contentMacedonian
  const elements = document.getElementsByClassName(contentId);
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    element.contentEditable = false;
    element.style.border = 'none';
  }
}

async function saveEdition(contentId) {
  const thisButtonId = "saveEdition"+contentId
  const otherButton1Id = "enableEdit"+contentId
  const otherButton2Id = "cancelEdition"+contentId
  document.getElementById(otherButton1Id).style.display = "inline"
  document.getElementById(otherButton2Id).style.display = "none"
  document.getElementById(thisButtonId).style.display = "none"
  const elements = document.getElementsByClassName(contentId);
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    element.contentEditable = false;
    element.style.border = 'none';
  }
  // changing content - start
    const contentFormData = {
      german: document.getElementsByClassName(contentId)[0].innerText,
      english: document.getElementsByClassName(contentId)[1].innerText,
      macedonian: document.getElementsByClassName(contentId)[2].innerText,
      id: contentId,
    };

    const res = await fetch('/api/content', {
      method: 'POST',
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