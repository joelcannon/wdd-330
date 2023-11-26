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

export async function loadZipMarkersFromJsonFile() {
  const response = await fetch('/json/csvjson.json');
  const data = await response.json();
  return data.map((item) => {
    return {
      position: { lat: item.LAT, lng: item.LON },
    };
  });
}
