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
    }
  })
  .catch((error) => console.error('Error:', error));
