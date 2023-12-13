import { MarkerClusterer } from '@googlemaps/markerclusterer';
import { loadDeviceMarkersFromJsonFile } from './externalServices.mjs';
import { loadHeader } from './utils.mjs';

loadHeader('Device');

/* global google */
async function initMap() {
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

  // Add some markers to the map.
  const markers = tempMarkers.map((device, i) => {
    // A marker using a Font Awesome icon for the glyph.
    const icon = document.createElement('div');
    icon.innerHTML = '<i class="fab fa-viacoin" aria-hidden="true"></i>';
    const faPin = new google.maps.marker.PinElement({
      glyph: icon,
      glyphColor: 'white',
      background: 'darkgreen',
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

    const contentString = `<div class='d_name'><b>${device.name}</b></div>
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

  // Add a marker clusterer to manage the markers.
  const markerCluster = new MarkerClusterer({ markers, map });
}

initMap();
