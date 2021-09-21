// ?Global Variables

// get a Date for the current time or Date
let date = new Date();

// Api Url & Personal API key to reterive weather data from API
let baseUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = ',&appid=b4d3d3fef0bb2d3296ed61ce09a198d9&units=metric';

// writes an error message to the console. for testing purposes
const catchError = (error) => {
  console.error(' Something went wrong =>', error);
};

const error = document.getElementById('error');
//===================================================================================================//

// general function :

const generalteData = () => {
  // get inputes value after clicked on the button
  const zipCode = document.getElementById('zip').value;
  const feelings = document.getElementById('feelings').value;
  // call getweatherDatafunction to fetch the data from Api using baseUrl+ input zip code + input user apiKey
  getWeatherData(baseUrl, zipCode, apiKey).then(function (data) {
    if (data) {
      const {
        main: { temp },
        name: city,
        weather: [{ description }],
      } = data;

      // my own object by destructing the return object which is will be saved on server and appear on the page
      const info = {
        date,
        city,
        temp: temp,
        description,
        feelings,
       };
      return info
  
    }
  });
};
  .then(async function (info) { await postData(‘/addData’, info) })
      .then(updateUI)

// Event listener to add function generalData () to existing HTML DOM element
document.getElementById('generate').addEventListener('click', generalteData);

//======================================================================================================//
// set a function to GET Data from API using fetch()
const getWeatherData = async (baseUrl, zipCode, apiKey) => {
  try {
    const res = await fetch(baseUrl + zipCode + apiKey);
    const data = await res.json();

    if (data.cod != 200) {
      //display error message in UI
      error.innerHTML = data.message;
      setTimeout(() => ((error.innerHTML = ''), 2000));
      throw `${data.message} `;
    }

    return data;
  } catch (error) {
    console.log('error', error);
  }
};

// set a function to send/post data to server
const postData = async (url = '', info = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(info),
  });

  try {
    const newData = await response.json();
    console.log(newData);
    return newData;
  } catch (error) {
    console.log('error', error);
  }
};

// Update UI
// function to GET  project data
const updateUI = async () => {
  const request = await fetch('/all');
  try {
    const allData = await request.json();
    document.getElementById('date').innerHTML = allData.date;
    document.getElementById('city').innerHTML = allData.city;
    document.getElementById('temp').innerHTML = allData.temp;
    document.getElementById('description').innerHTML = allData.description;
    document.getElementById('content').innerHTML = allData.feelings;
  } catch (error) {
    console.log('error', error);
  }
};
