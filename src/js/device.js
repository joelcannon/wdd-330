import { loadDeviceMarkersFromJsonFile } from './externalServices.mjs';
import { loadHeader, getParam } from './utils.mjs';

loadHeader('Device');

// Fetch the JSON file
fetch('/json/device.json')
  .then((response) => response.json())
  .then((data) => {
    // Get the device id from the URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    // Find the device with the matching id
    // const foundDevice = data.find((device) => device.Id === id);
    const foundDevice = data[id];

    // Display the device details
    if (foundDevice) {
      document.getElementById(
        'device-name'
      ).textContent = `${foundDevice.name}`;
      document.getElementById('device-position').textContent = ` 
      ${parseFloat(foundDevice.position.lat).toFixed(4)}° N, 
      ${parseFloat(-foundDevice.position.lng).toFixed(4)}° W`;

      document.getElementById(
        'device-status'
      ).textContent = `Status: ${foundDevice.status}`;
      document.getElementById(
        'device-temperature'
      ).textContent = `Temp: ${foundDevice.temp}°F`;
      document.getElementById(
        'device-battery'
      ).textContent = `Battery: ${foundDevice.battery}%`;
      document.getElementById(
        'device-voltage'
      ).textContent = `Voltage: ${foundDevice.voltage} v`;

      // Get the div where the map will be placed
      const mapDiv = document.getElementById('mini-map');

      // Define the latitude, longitude, and zoom level for the map
      const lat = foundDevice.position.lat.toFixed(4);
      const lng = foundDevice.position.lng.toFixed(4);
      const zoom = 18;

      // Create the URL for the static map
      const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=${zoom}&size=600x300&maptype=satellite&markers=color:red%7C${lat},${lng}&key=AIzaSyA5_4E24xxgD4akSaTxi1Bs2QRsSLEqOIM`;

      // Create an img element
      const img = document.createElement('img');
      img.src = mapUrl;

      // Create an a element
      const a = document.createElement('a');
      a.href = `/map/index.html?id=${foundDevice.id}`;
      a.appendChild(img);

      // Add the img to the div
      mapDiv.appendChild(a);
    }
  })
  .catch((error) => console.error('Error:', error));
