const timestamp = document.querySelector("#timestamp");

timestamp.value = new Date().toLocaleString();
const learnMoreLinks = document.querySelectorAll(".learn-more");
const closeButtons = document.querySelectorAll(".close-modal");

learnMoreLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();

        const dialogId = link.getAttribute("href");
        const dialog = document.querySelector(dialogId);

        if (dialog) {
            dialog.showModal();
        }
    });
});

closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
        button.closest("dialog").close();
    });
});