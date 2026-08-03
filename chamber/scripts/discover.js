import { places } from "../data/places.mjs";

const placesContainer = document.querySelector("#places-container");

const placeDialog = document.querySelector("#place-dialog");
const closeDialogButton = document.querySelector("#close-dialog");
const dialogTitle = document.querySelector("#dialog-title");
const dialogImage = document.querySelector("#dialog-image");
const dialogAddress = document.querySelector("#dialog-address");
const dialogDescription = document.querySelector("#dialog-description");
const dialogDetails = document.querySelector("#dialog-details");

function displayPlaces(placeList) {
  placeList.forEach((place, index) => {
    const card = document.createElement("article");
    card.classList.add("place-card", `place-${index + 1}`);

    const title = document.createElement("h2");
    title.textContent = place.name;

    const figure = document.createElement("figure");

    const image = document.createElement("img");
    image.src = place.image;
    image.alt = place.alt;
    image.width = 300;
    image.height = 200;
    image.loading = "lazy";

    const address = document.createElement("address");
    address.textContent = place.address;

    const description = document.createElement("p");
    description.textContent = place.description;

    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "Learn More";
    button.classList.add("place-learn-more");

    button.addEventListener("click", () => {
  dialogTitle.textContent = place.name;

  dialogImage.src = place.image;
  dialogImage.alt = place.alt;

  dialogAddress.textContent = place.address;
  dialogDescription.textContent = place.description;
  dialogDetails.textContent = place.details;

  placeDialog.showModal();
});

    figure.appendChild(image);

    card.appendChild(title);
    card.appendChild(figure);
    card.appendChild(address);
    card.appendChild(description);
    card.appendChild(button);

    placesContainer.appendChild(card);
  });
}

displayPlaces(places);
closeDialogButton.addEventListener("click", () => {
  placeDialog.close();
});

function displayVisitMessage() {
  const messageContainer = document.querySelector("#visit-message");

  if (!messageContainer) {
    return;
  }

  const lastVisit = localStorage.getItem("maiangaLastVisit");
  const currentVisit = Date.now();
  const millisecondsPerDay = 1000 * 60 * 60 * 24;

  let message;

  if (lastVisit === null) {
   message = `
  Welcome! Let us know if you have any questions.
  <a href="mailto:info@maiangachamber.org">Contact us</a>
`;
  } else {
    const timeBetweenVisits = currentVisit - Number(lastVisit);
    const daysBetweenVisits = Math.floor(
      timeBetweenVisits / millisecondsPerDay
    );

    if (timeBetweenVisits < millisecondsPerDay) {
      message = "Back so soon! Awesome!";
    } else if (daysBetweenVisits === 1) {
      message = "You last visited 1 day ago.";
    } else {
      message = `You last visited ${daysBetweenVisits} days ago.`;
    }
  }

  messageContainer.innerHTML = message;

  localStorage.setItem("maiangaLastVisit", currentVisit.toString());
}

displayVisitMessage();