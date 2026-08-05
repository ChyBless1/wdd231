const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#primary-navigation");
const currentYear = document.querySelector("#current-year");

if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
        const isOpen = menuButton.getAttribute("aria-expanded") === "true";

        menuButton.setAttribute("aria-expanded", String(!isOpen));
        menuButton.setAttribute(
            "aria-label",
            isOpen ? "Open navigation menu" : "Close navigation menu"
        );

        navigation.classList.toggle("open");
    });
}

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}