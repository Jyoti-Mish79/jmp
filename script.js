function getCurrentTimezone() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }
  
  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
  
    getTimezoneByCoordinates(latitude, longitude, 'current-timezone');
  }
  
  function error() {
    console.log('Unable to retrieve your location.');
  }
  
  function getTimezoneByCoordinates(latitude, longitude, elementId) {
    const timestamp = Math.floor(Date.now() / 1000);
  
    const apiUrl = `https://api.geoapify.com/v1/timezone?lat=${latitude}&lon=${longitude}&apiKey=YOUR_API_KEY`;
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const timezone = data.timezone;
        document.getElementById(elementId).textContent = timezone;
      })
      .catch(error => {
        console.log('Error:', error);
      });
  }
  
  function getTimezone() {
    const address = document.getElementById('address-input').value;
  
    if (address) {
      const geocodingUrl = `https://api.geoapify.com/v1/geocode/autocomplete?text=${address}&apiKey=YOUR_API_KEY`;
  
      fetch(geocodingUrl)
        .then(response => response.json())
        .then(data => {
          const results = data.features;
          if (results.length > 0) {
            const latitude = results[0].geometry.coordinates[1];
            const longitude = results[0].geometry.coordinates[0];
  
            getTimezoneByCoordinates(latitude, longitude, 'address-timezone');
          } else {
            console.log('No results found for the entered address.');
          }
        })
        .catch(error => {
          console.log('Error:', error);
        });
    } else {
      console.log('Please enter an address.');
    }
  }
  
  getCurrentTimezone();
  