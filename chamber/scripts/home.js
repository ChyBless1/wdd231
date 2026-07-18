const apiKey = 
"a798bc6171067be4216ff5db8cde0dbf";

const latitude = -8.84;
const longitude = 13.23;

const currentWeatherUrl =
 `https://api.openweathermap.org/data/2.5/weather` +
  `?lat=${latitude}&lon=${longitude}` +
  `&units=metric&appid=${apiKey}`;

const forecastUrl =
  `https://api.openweathermap.org/data/2.5/forecast` +
  `?lat=${latitude}&lon=${longitude}` +
  `&units=metric&appid=${apiKey}`;

  const weatherIcon = document.querySelector("#weather-icon");
const currentTemperature = document.querySelector("#current-temperature");
const weatherDescription = document.querySelector("#weather-description");

async function getCurrentWeather() {
  try {
    const response = await fetch(currentWeatherUrl);

    if (!response.ok) {
      throw new Error(`Current weather request failed: ${response.status}`);
    }

    const data = await response.json();
    displayCurrentWeather(data);
  } catch (error) {
    console.error(error);
    weatherDescription.textContent =
      "Current weather information is temporarily unavailable.";
  }
}

function displayCurrentWeather(data) {
  const iconCode = data.weather[0].icon;
  const description = data.weather[0].description;
  const temperature = Math.round(data.main.temp);

  weatherIcon.src =
    `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  weatherIcon.alt = description;

  currentTemperature.textContent = temperature;

  weatherDescription.textContent =
    description.charAt(0).toUpperCase() + description.slice(1);
}

const forecastContainer = document.querySelector("#forecast-container");

async function getForecast() {
  try {
    const response = await fetch(forecastUrl);

    if (!response.ok) {
      throw new Error(`Forecast request failed: ${response.status}`);
    }

    const data = await response.json();
    displayForecast(data.list);
  } catch (error) {
    console.error(error);
    forecastContainer.innerHTML =
      "<p>Three-day forecast is temporarily unavailable.</p>";
  }
}

function displayForecast(forecastList) {
  forecastContainer.innerHTML = "";

  const dailyForecasts = forecastList.filter((forecast) =>
    forecast.dt_txt.includes("12:00:00")
  );

  dailyForecasts.slice(0, 3).forEach((forecast) => {
    const forecastDate = new Date(forecast.dt_txt);

    const dayName = forecastDate.toLocaleDateString("en-US", {
      weekday: "long"
    });

    const temperature = Math.round(forecast.main.temp);

    const forecastCard = document.createElement("article");
    forecastCard.classList.add("forecast-card");

    forecastCard.innerHTML = `
      <h3>${dayName}</h3>
      <p>${temperature}&deg;C</p>
    `;

    forecastContainer.appendChild(forecastCard);
  });
}


const membersUrl = "data/members.json";
const spotlightContainer = document.querySelector("#spotlight-container");

const membershipNames = {
  1: "Member",
  2: "Silver",
  3: "Gold"
};

async function getSpotlightMembers() {
  try {
    const response = await fetch(membersUrl);

    if (!response.ok) {
      throw new Error(`Member request failed: ${response.status}`);
    }

    const data = await response.json();

    displaySpotlights(data);
  } catch (error) {
    console.error(error);
    spotlightContainer.innerHTML =
      "<p>Member spotlights are temporarily unavailable.</p>";
  }
}

function displaySpotlights(members) {
  const qualifiedMembers = members.filter(
    (member) =>
      member.membershipLevel === 2 ||
      member.membershipLevel === 3
  );

  const shuffledMembers = qualifiedMembers.sort(
    () => Math.random() - 0.5
  );

  const selectedMembers = shuffledMembers.slice(0, 3);

  spotlightContainer.innerHTML = "";

  selectedMembers.forEach((member) => {
    const card = document.createElement("article");
    card.classList.add("spotlight-card");

    card.innerHTML = `
      <img
        src="images/${member.image}"
        alt="${member.name} logo"
        width="250"
        height="160"
        loading="lazy"
      >
      <h3>${member.name}</h3>
      <p><strong>Phone:</strong> ${member.phone}</p>
      <p><strong>Address:</strong> ${member.address}</p>
      <p>
        <strong>Website:</strong>
        <a href="${member.website}" target="_blank">
          Visit website
        </a>
      </p>
      <p>
        <strong>Membership:</strong>
        ${membershipNames[member.membershipLevel]}
      </p>
    `;

    spotlightContainer.appendChild(card);
  });
}
getCurrentWeather();
getForecast();
getSpotlightMembers();

