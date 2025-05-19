import { mainCall, welcomeCall, themeCall, multilanguageCall, cardsCall, logoCall, navigateTo } from "./eventFunctions.js";

const main = document.getElementById('backToMainId');
const welcome = document.getElementById('welcomePageId');
const theme = document.getElementById('themeStyleId');
const multilanguage = document.getElementById('multilanguageStyleId');
const cards = document.getElementById('cardStyleId');
const logo = document.getElementById('logoStyleId');

export const editOptions = document.getElementById('editOptionsId');
export const defaultTitle = document.title;  /*Gets default page title*/

export function renderPage(path) {
  switch (path) {
    case '/admin/main':
        mainCall();
    break;
    
    case '/admin/welcome':
        welcomeCall();
    break;
    
    case '/admin/theme':
        themeCall();
    break;

    case '/admin/multilanguage':
        multilanguageCall();  
    break;

    case '/admin/cards':
        cardsCall(); 
    break;

    case '/admin/logo':
        logoCall();  
    break;

    default:
      document.title = defaultTitle;
      editOptions.style.display = 'none';
      editOptions.innerText = '';
      break;
  }
}

main?.addEventListener('click', ()=>{
    navigateTo('/admin/main');
});
welcome?.addEventListener('click', ()=>{
    navigateTo('/admin/welcome');
});
theme?.addEventListener('click', ()=>{
    navigateTo('/admin/theme');
});
multilanguage?.addEventListener('click', ()=>{
    navigateTo('/admin/multilanguage');
});
cards?.addEventListener('click', ()=>{
    navigateTo('/admin/cards');
});
logo?.addEventListener('click', ()=>{
    navigateTo('/admin/logo');
});


window.addEventListener('popstate', () => {
  renderPage(window.location.pathname);
});
window.addEventListener('DOMContentLoaded', () => {
  renderPage(window.location.pathname);
});