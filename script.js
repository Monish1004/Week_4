const apiKey = "024a0d3fdbbf6ba7683ada32a4526f01";
const getWeatherButton = document.getElementById("getWeather");
const weatherChartCanvas = document.getElementById("weatherChart");

const getWeatherData = async (city) => {
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error("City not found");
    const data = await response.json();
    return data;
  } catch (error) {
    alert(error.message);
  }
};  

const renderChart = (labels, temperatures) => {
  new Chart(weatherChartCanvas, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Temperature (°C)",
          data: temperatures,
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {   
      responsive: true,
      scales: {
        x: { title: { display: true, text: "Time" } },
        y: { title: { display: true, text: "Temperature (°C)" } },
      },
    },
  });
};

const displayWeather = async () => {
  const city = document.getElementById("city").value.trim();
  if (city === "") {
    alert("Please enter a city name");
    return;
  }

  const weatherData = await getWeatherData(city);
  if (!weatherData) return;

  const labels = weatherData.list.slice(0, 8).map((item) => {
    const date = new Date(item.dt * 1000);
    return `${date.getHours()}:00`;
  });

  const temperatures = weatherData.list
    .slice(0, 8)
    .map((item) => item.main.temp);

  renderChart(labels, temperatures);
};

getWeatherButton.addEventListener("click", () => {
  displayWeather();
});
