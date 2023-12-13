import { MarkerClusterer } from '@googlemaps/markerclusterer';
import { loadDeviceMarkersFromJsonFile } from './externalServices.mjs';
import { loadHeader, getParam } from './utils.mjs';

loadHeader('Map');
const deviceId = getParam('id');

/* global google */
async function initMap(id) {
  // Request needed libraries.
  const { Map, InfoWindow } = await google.maps.importLibrary('maps');
  const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary(
    'marker'
  );
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: { lat: 39.93459, lng: -93.924026 },
    mapTypeId: 'satellite',
    mapId: 'DEMO_MAP_ID',
  });
  const infoWindow = new google.maps.InfoWindow({
    content: '',
    disableAutoPan: true,
  });
  // Create an array of alphabetical characters used to label the markers.
  // const labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  // Load locations from JSON file
  const tempMarkers = await loadDeviceMarkersFromJsonFile();
  const locations = tempMarkers.map((item) => item.position);

  // If an id is provided and it's a valid index in the locations array, recenter the map
  if (id && locations[id]) {
    map.setCenter(locations[id]);
    map.setZoom(18); // Reset the zoom level to 18
  }

  // Add some markers to the map.
  const markers = tempMarkers.map((device, i) => {
    // A marker using a Font Awesome icon for the glyph.
    const icon = document.createElement('div');
    icon.innerHTML = '<i class="fab fa-viacoin" aria-hidden="true"></i>';
    const faPin = new google.maps.marker.PinElement({
      glyph: icon,
      glyphColor: 'white',
      background: 'green',
      borderColor: 'white',
    });

    const detail = document.createElement('div');

    detail.className = 'detail';

    if (device.status === 'Critical') {
      detail.classList.add('critical');
    } else if (device.status === 'Warning') {
      detail.classList.add('warning');
    }

    detail.innerHTML =
      '<i class="fab fa-viacoin icon-shadow" aria-hidden="true"></i>';

    const marker = new google.maps.marker.AdvancedMarkerElement({
      position: device.position,
      content: detail,
    });

    const contentString = ` <div class='d_name'>
    <b><a href="/device/index.html?id=${device.id}">${device.name}</a></b>
  </div>
  <div class='d_status'>${device.status}</div>
  <div class='d_stats'>
    ${device.temp}°F, ${device.battery}%, ${device.voltage}v
  </div>`;

    // markers can only be keyboard focusable when they have click listeners
    // open info window when marker is clicked
    marker.addListener('click', () => {
      infoWindow.setContent(contentString);
      infoWindow.open(map, marker);
    });
    return marker;
  });
}

initMap(deviceId);
