// Foursquare API Info
const clientId = '0AHEKYAJBPNOURVBC5D50WHCB1ZNYNQDDOWE44G5LUBEVDJG';
const clientSecret = 'FGYCKBCK24MXKNMAWQDHK1HPE4GBI3VKJ3BGHOY3SAAA40BW';
const url = 'https://api.foursquare.com/v2/venues/explore?near=';

// OpenWeather API
const apiKey = 'dd67530bcb569ce22aa6d6af6f165cc0';
const forecastUrl = 'https://api.openweathermap.org/data/2.5/weather?';

// Page Elements
const $input = $('#city');
const $submit = $('#button');
const $destination = $('#destination');
const $container = $('.container');
const $venueDivs = [$("#venue1"), $("#venue2"), $("#venue3"), $("#venue4"), $("#venue5")];
const $weatherDiv = $(".weather");
const $body = $(".overflow");
const iconCanvas = document.getElementById("icon");
let today = new Date().toJSON().slice(0,10).replace(/-/g,'');

function init() {
  // venues.
  getVenues();
  // weather.
  getForecast()
}
// ====== AJAX functions ======
const getVenues = async () => {
  const city = $input.val();
  const urlToFetch = `${url}${city}&limit=8&client_id=${clientId}&client_secret=${clientSecret}&v=${today}`;

	try {
  	const response = await fetch(urlToFetch)
    if(response.ok) {
    	const jsonResponse = await response.json();
      const venues = jsonResponse.response.groups[0].items.map(item => item.venue);
      return venues

  	} else {
      throw new Error('Request failed! (VENUES)')
    }

	} catch (error) {
    console.log(error.message);
  }
};

const getForecast = async () => {
  const userInput = document.getElementById("city").value;
	const urlToFetch = `${forecastUrl}q=${userInput}&APPID=${apiKey}&units=imperial`;

  try {
		const response = await fetch(urlToFetch)
    if(response.ok) {
      const jsonResponse = await response.json();
      const currentWeather = jsonResponse;
      console.log(currentWeather)
      return currentWeather;
    } else {
      throw new Error('Request failed! (WEATHER)')
    }
  } catch (error) {
    console.log(error.message);
  }
};

// ====== End of AJAX functions ======

// ====== Render functions ======
const renderVenues = (venues) => {
  $venueDivs.forEach(($venue) => {
  	let randomIndex = Math.floor(Math.random() * venues.length)

		const venue = venues[randomIndex]
    const venueIcon = venue.categories[0].icon;
    const venueImgSrc = `${venueIcon.prefix}bg_64${venueIcon.suffix}`

    let venueContent = createVenueHTML(venue.name, venue.location, venueImgSrc);
    $venue.append(venueContent);
  });
  $destination.append(`<h2 id="locationTitle">${venues[0].location.city}</h2>`);
}

const renderForecast = (current) => {
  let weatherContent = createWeatherHTML(current);
  $weatherDiv.append(weatherContent);
  setIcons(current.weather[0].description, iconCanvas)
}

// ====== End Render functions ======

function setIcons(icon, iconID) {

  console.log(icon)
  const skycons = new Skycons({color: "white"});
  let newIcon;
  switch (icon) {
    case "clear sky":
      if ("clear sky") {
        newIcon = "CLEAR_DAY"
        break;
      }
      // Need to find a way to know when it's night time
      // to display moon from Skycons.
    case "overcast clouds":
      newIcon = "CLOUDY"
      break;
    case "few clouds":
    case "scattered clouds":
    case "broken clouds":
      newIcon = "PARTLY_CLOUDY_DAY"
      break;
    case "shower rain":
    case "rain":
    case "thunderstorm":
      newIcon = "RAIN"
      break;  
    case "snow":
      newIcon = "SNOW"
      break;  
    case "mist":
      newIcon = "FOG"
      break;  
    default:
      break;
  }  
  skycons.play();
  return skycons.set(iconID, Skycons[newIcon]);
}

const executeSearch = () => {
  $venueDivs.forEach(venue => venue.empty());
  $weatherDiv.empty();
  $destination.empty();
  $container.css("visibility", "visible");
  $body.css("overflow-y", "visible");
  getVenues()
    .then((venues) =>
          renderVenues(venues));
  getForecast()
    .then((weather) =>
          renderForecast(weather));
  return false;
}

$submit.click(executeSearch)
