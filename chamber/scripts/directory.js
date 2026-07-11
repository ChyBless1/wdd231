console.log("directory.js is connected");
const membersContainer = document.querySelector("#members");

async function getMembers() {
  try {
    const response = await fetch("data/members.json");

    if (!response.ok) {
      throw new Error("Unable to load the member data.");
    }

    const members = await response.json();
    displayMembers(members);
  } catch (error) {
    console.error(error);
    membersContainer.innerHTML =
      "<p>Sorry, the business directory could not be loaded.</p>";
  }
}

function displayMembers(members) {
  membersContainer.innerHTML = "";

  members.forEach((member) => {
    const card = document.createElement("article");
    card.classList.add("member-card");

    const membershipNames = {
      1: "Member",
      2: "Silver",
      3: "Gold"
    };

    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name}" loading="lazy">
      <h2>${member.name}</h2>
      <p>${member.description}</p>
      <p><strong>Address:</strong> ${member.address}</p>
      <p><strong>Email:</strong> ${member.email}</p>
      <p><strong>Phone:</strong> ${member.phone}</p>
      <p>
        <strong>Website:</strong>
        <a href="${member.website}" target="_blank">${member.website}</a>
      </p>
      <p><strong>Membership:</strong> ${membershipNames[member.membershipLevel]}</p>
    `;

    membersContainer.appendChild(card);
  });
}


const gridButton = document.querySelector("#grid-view");
const listButton = document.querySelector("#list-view");

gridButton.addEventListener("click", () => {
  membersContainer.classList.add("grid");
  membersContainer.classList.remove("list");
});

listButton.addEventListener("click", () => {
  membersContainer.classList.add("list");
  membersContainer.classList.remove("grid");
});
getMembers();