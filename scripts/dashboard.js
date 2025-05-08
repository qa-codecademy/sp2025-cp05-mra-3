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
        <div><strong class = "onscreenText dashboardhtml Date:"></strong> ${new Date(email.createdAt).toLocaleString()}</div>
        <div><strong class = "onscreenText dashboardhtml Name:"></strong> ${email.name}</div>
        <div><strong class = "onscreenText dashboardhtml Email:"></strong> ${email.email}</div>
        <div><strong class = "onscreenText dashboardhtml Message:"></strong> ${email.message}</div>
      `;
    container.appendChild(entry);
  });
}
// table with all emails - end
// table with all contents - start
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
        createdAt: new Date(content.createdAt)
      }))
      .sort((a, b) => b.createdAt - a.createdAt);

    renderContentsTable(sortedContents);
  } catch (err) {
    console.error('Error fetching contents:', err);
    alert('Could not load contents.');
  }
});

function renderContentsTable(contents) {
  const container = document.getElementById('contentsContainer');
  container.innerHTML = '';
  contents.forEach(content => {
    const entry = document.createElement('div');
    entry.classList.add('content-entry');
    entry.innerHTML = `
      <div><strong class = "onscreenText dashboardhtml Title:"></strong><p style="display: inline;"> ${content.title}</p></div>
      <div><strong class = "onscreenText dashboardhtml German:"></strong><p class = "${content.id}" style="display: inline;" onclick="this.focus()" > ${content.german}</p></div>
      <div><strong class = "onscreenText dashboardhtml English:"></strong><p class = "${content.id}" style="display: inline;" onclick="this.focus()" > ${content.english}</p></div>
      <div><strong class = "onscreenText dashboardhtml Macedonian:"></strong><p class = "${content.id}" style="display: inline;" onclick="this.focus()" > ${content.macedonian}</div>
      <button id="enableEdit${content.id}" class="onscreenText dashboardhtml UpdateContent" onclick="enableEdit('${content.id}')" style="display: inline;" type="button"></button>
      <button id="saveEdition${content.id}" class="onscreenText dashboardhtml SaveChanges" onclick="saveEdit('${content.id}')" style="display: none;" type="button"></button>
    `;
    container.appendChild(entry);
  });
}
function enableEdit(contentId) {
  const thisButtonId = "enableEdit"+contentId
  const otherButtonId = "saveEdition"+contentId
  document.getElementById(otherButtonId).style.display = "inline"
  document.getElementById(thisButtonId).style.display = "none"
  const elements = document.getElementsByClassName(contentId);
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    element.contentEditable = true;
    element.style.border = '1px dashed gray';
  }
}
function saveEdit(contentId) {
  const thisButtonId = "saveEdition"+contentId
  const otherButtonId = "enableEdit"+contentId
  document.getElementById(otherButtonId).style.display = "inline"
  document.getElementById(thisButtonId).style.display = "none"
  // const elements = document.getElementsByClassName(contentId);
  // for (let i = 0; i < elements.length; i++) {
  //   const element = elements[i];
  //   element.contentEditable = true;
  //   element.style.border = '1px dashed gray';
  // }
  
  alert("Changes are saved")
}
// table with all contents - end