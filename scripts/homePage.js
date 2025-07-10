if (localStorage.getItem('language') === "English") {
    document.getElementById('mainMessage').classList.add('english')
    document.getElementById('mainMessage').classList.remove('german')
    document.getElementById('mainMessage').classList.remove('macedonian')
} else if (localStorage.getItem('language') === "Macedonian") {
    document.getElementById('mainMessage').classList.add('macedonian')
    document.getElementById('mainMessage').classList.remove('german')
    document.getElementById('mainMessage').classList.remove('english')
} else {
    document.getElementById('mainMessage').classList.add('german')
    document.getElementById('mainMessage').classList.remove('english')
    document.getElementById('mainMessage').classList.remove('macedonian')
}
