export function loadMarkersFromJsonFile() {
  return fetch('/json/markers.json')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      return data ? data : [];
    })
    .catch((error) => {
      console.error(
        'There has been a problem with your fetch operation:',
        error
      );
    });
}

export function loadZipMarkersFromJsonFile() {
  return fetch('/json/zip.json')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      return data ? data : [];
    })
    .catch((error) => {
      console.error(
        'There has been a problem with your fetch operation:',
        error
      );
    });
}

export async function xloadZipMarkersFromJsonFile() {
  const response = await fetch('/json/zip.json');
  const data = await response.json();
  return data.map((item) => {
    return data ? data : [];
    // {
    // position: { lat: item.LAT, lng: item.LON },
    // };
  });
}
