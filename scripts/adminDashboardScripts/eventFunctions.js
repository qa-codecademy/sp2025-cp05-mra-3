import { defaultTitle, editOptions, renderPage } from "./adminDashboard.js";

export function navigateTo(path) {
  history.pushState({}, '', path);
  renderPage(path);
}

// FUNCTIONS FOR INSIDE THE EVENT LISTENERS
export function mainCall() {
    document.title = defaultTitle; // sets the page title as the default value declared in the HTML file
    editOptions.innerHTML = ''; //emptys the editContent DIV
    editOptions.style.display = 'block'; //displays the DIV
    console.log('main');
}
export function welcomeCall() {
    document.title = defaultTitle;
    editOptions.style.display = 'none';
    console.log('welcome');
}
export function themeCall() {
    document.title = "Theme Settings";
    editOptions.style.display = 'block';
    editOptions.innerText = 'THEME WINDOW';
    console.log('theme');
}
export function multilanguageCall() {
    document.title = "Multilanguage Settings";
    editOptions.style.display = 'block';
    editOptions.innerText = 'MULTILANGUAGE WINDOW';
    console.log('multilanguage');}
export function cardsCall() {
    document.title = "Card Settings";
    editOptions.style.display = 'block';
    editOptions.innerText = 'CARDS WINDOW';
    console.log('cards');
}
export function logoCall() {
    document.title = "Logo Settings";
    editOptions.style.display = 'block';
    editOptions.innerText = 'LOGO WINDOW';
    console.log('logo');
}

