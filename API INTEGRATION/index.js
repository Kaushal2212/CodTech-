const API_KEY = "3c30def3990e4a3392055405251202"; // Replace with your actual API key

document.getElementById("search-btn").addEventListener("click", () => {
  const city = document.getElementById("city-input").value;
  if (city) {
    fetchWeather(city);
  } else {
    displayError("Please enter a city name.");
  }
});

function fetchWeather(city) {
  const apiURL = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`;

  fetch(apiURL)
    .then(response => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then(data => displayWeather(data))
    .catch(error => displayError(error.message));
}

function displayWeather(data) {
    document.getElementById("error-message").textContent = "";
    document.getElementById("city-name").textContent = `Weather in ${data.location.name}`;
    document.getElementById("temperature").textContent = `Temperature: ${data.current.temp_c}°C`;
    document.getElementById("description").textContent = `Condition: ${data.current.condition.text}`;
    document.getElementById("humidity").textContent = `Humidity: ${data.current.humidity}%`;
  }
  

function displayError(message) {
  document.getElementById("error-message").textContent = message;
  document.getElementById("city-name").textContent = "";
  document.getElementById("temperature").textContent = "";
  document.getElementById("description").textContent = "";
  document.getElementById("humidity").textContent = "";
}
