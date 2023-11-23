import { Loader } from '@googlemaps/js-api-loader';
import {
  saveMarkersToLocalStorage,
  loadMarkersFromLocalStorage,
} from './utils.mjs';

/* global google */

const loader = new Loader({
  apiKey: 'AIzaSyA5_4E24xxgD4akSaTxi1Bs2QRsSLEqOIM',
  version: 'weekly',
});

loader.load().then(() => {
  const map = new google.maps.Map(document.getElementById('map'), {
    //  center: { lat: 39.930213, lng: -93.932722 },
    center: { lat: 39.93459, lng: -93.924026 },
    zoom: 18,
    mapTypeId: 'satellite',
  });

  let markers = loadMarkersFromLocalStorage();
  markers.forEach((markerData) => {
    new google.maps.Marker({
      position: markerData.position,
      map: map,
    });
  });

  // Add click event listener to map
  google.maps.event.addListener(map, 'click', function (event) {
    const marker = new google.maps.Marker({
      position: event.latLng,
      map: map,
    });

    markers.push({
      id: markers.length,
      position: { lat: event.latLng.lat(), lng: event.latLng.lng() },
    });

    saveMarkersToLocalStorage(markers);
  });
});
