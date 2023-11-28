import { MarkerClusterer } from '@googlemaps/markerclusterer';
import { loadZipMarkersFromJsonFile } from './externalServices.mjs';

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
  const tempMarkers = await loadZipMarkersFromJsonFile();
  const locations = tempMarkers.map((item) => item.position);

  // Add some markers to the map.
  //   const markers = locations.map((position, i) => {
  const markers = tempMarkers.map((zip, i) => {
    const label = labels[i % labels.length];
    const pinGlyph = new google.maps.marker.PinElement({
      glyph: label,
      glyphColor: 'white',
    });

    //  const testposition = { lat: zip.LAT, lng: zip.LON };
    const testposition = zip.position;
    console.log(testposition);

    const marker = new google.maps.marker.AdvancedMarkerElement({
      // position: { lat: +zip.LAT, lng: +zip.LON },
      position: zip.position,
      content: pinGlyph.element,
    });

    const contentString = `<div class='Zip Code'><b>${zip.PC}</b></div>
    <div class='city'>${zip.PN}</div>
    <div class='county'>
    ${zip.AN2}, ${zip.AC1}
    </div>`;

    // markers can only be keyboard focusable when they have click listeners
    // open info window when marker is clicked
    marker.addListener('click', () => {
      // infoWindow.setContent(position.lat + ', ' + position.lng);
      infoWindow.setContent(contentString);
      infoWindow.open(map, marker);
    });
    return marker;
  });

  // Add a marker clusterer to manage the markers.
  const markerCluster = new MarkerClusterer({ markers, map });
}

initMap();
