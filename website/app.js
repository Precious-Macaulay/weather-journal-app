/* Global Variables */
const generate = document.getElementById("generate");
const feelings = document.getElementById("feelings");
const zip = document.getElementById("zip");

// Personal API Key for OpenWeatherMap API
const apiKey = "6fe903f17bb24acf079814a7b5529df4&units=imperial";
const baseUrl = `https://api.openweathermap.org/data/2.5/weather?`;
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

/* Function to GET Web API Data*/
const getWeatherData = async (baseUrl, zip, apiKey) => {
  await fetch(`${baseUrl}zip=${zip}&appid=${apiKey}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      const newData = {
        temp: data.main.temp,
        date: newDate,
        feel: feelings.value,
      };
      postData("/addData", newData);
    })
    .catch(() => alert("Invalid zip code"));
};

//Add click event to generate button
generate.addEventListener("click", () => {
  //Check if zip code is entered
  if (zip.value !== "") {
    /* Function called by event listener */
    getWeatherData(baseUrl, zip.value, apiKey).then(() => {
      retrieveData();
    });
  } else {
    alert("Please enter a valid zip code");
  }
});

/* Function to POST data */

const postData = async (url, data) => {
  const settings = {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(url, settings);
    return response;
  } catch (error) {
    console.log("error", error);
    // appropriately handle the error
  }
};
//Retrieve data and update UI
const retrieveData = async () => {
  const request = await fetch("/all");
  try {
    // Transform into JSON
    const allData = await request.json();
    // Write updated data to DOM elements
    document.getElementById("temp").innerHTML =
      Math.round(allData.temp) + " degrees";
    document.getElementById("content").innerHTML = allData.feel;
    document.getElementById("date").innerHTML = allData.date;
  } catch (error) {
    console.log("error", error);
    // appropriately handle the error
  }
};
