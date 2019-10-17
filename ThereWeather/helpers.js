const createVenueHTML = (name, location, iconSource) => {
  const crossStreet = location.crossStreet || "-";
  
  return `
  <div id="imageContainer">
    <img id="venueImage" src="${iconSource}"/>
  </div>
  <h2 id="venueName">${name}</h2>
  <p>Address: ${location.address}</p>
	<p>Cross Street: ${crossStreet}</p>
  <p>City: ${location.city}</p>
  <p>Country: ${location.country}</p>`;
}

const createWeatherHTML = (current) => {
  const temperature = Math.floor(current.main.temp) + "\xB0";
  const description = (current.weather[0].description).charAt(0).toUpperCase() + current.weather[0].description.slice(1); 
  const hight = Math.floor(current.main.temp_max);
  const low = Math.floor(current.main.temp_min);
  const winds = current.wind.speed;
  const humidity = current.main.humidity;
  const today = new Date().toJSON().slice(5,10).replace(/-/g,'/');
  return `
  <h2 class="dayToday">${today}</h2>
  <div id="weatherMain">
    <h2 id="temperature"> ${temperature}</h2>
    <h2 id="description"> ${description}</h2>
  </div>
  <div id="weatherDetails">
  <hr>
  <h2 class="moreDetails"> High: ${hight}</h2>
  <h2 class="moreDetails"> Low: ${low}</h2>
  <h2 class="moreDetails"> Winds at ${winds} m/s</h2>
  <h2 class="moreDetails"> Humidity levels at ${humidity}</h2>
  </div>
  `;
}