const burgerIcon = document.getElementById('burger')
const navbarMenu = document.getElementById('nav-links')
const dropdown = document.getElementById('dropdown');
const dropdownTrigger = document.getElementById('dropdownTrigger')

burgerIcon.addEventListener('click', (event) => {
    navbarMenu.classList.toggle('is-active')
    event.stopPropagation();
    dropdownTrigger.classList.toggle('is-hidden');
})