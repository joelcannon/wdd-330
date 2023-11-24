import { MarkerClusterer } from '@googlemaps/markerclusterer';
import { loadMarkersFromJsonFile } from './externalServices.mjs';

/* global google */
async function initMap() {
  // Request needed libraries.
  const { Map, InfoWindow } = await google.maps.importLibrary('maps');
  const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary(
    'marker'
  );
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    //  center: { lat: -28.024, lng: 140.887 },
    center: { lat: 39.93459, lng: -93.924026 },
    mapTypeId: 'satellite',
    mapId: 'DEMO_MAP_ID',
  });
  const infoWindow = new google.maps.InfoWindow({
    content: '',
    disableAutoPan: true,
  });
  // Create an array of alphabetical characters used to label the markers.
  const labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  // Load locations from JSON file
  const tempMarkers = await loadMarkersFromJsonFile();
  const locations = tempMarkers.map((item) => item.position);

  // Add some markers to the map.
  const markers = locations.map((position, i) => {
    const label = labels[i % labels.length];
    const pinGlyph = new google.maps.marker.PinElement({
      glyph: label,
      glyphColor: 'white',
    });
    const marker = new google.maps.marker.AdvancedMarkerElement({
      position,
      content: pinGlyph.element,
    });

    // markers can only be keyboard focusable when they have click listeners
    // open info window when marker is clicked
    marker.addListener('click', () => {
      infoWindow.setContent(position.lat + ', ' + position.lng);
      infoWindow.open(map, marker);
    });
    return marker;
  });

  // Add a marker clusterer to manage the markers.
  new MarkerClusterer({ markers, map });

  //   const markerCluster = new MarkerClusterer({ markers, map });
}

initMap();
