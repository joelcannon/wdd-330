// Function to load the Google Maps API
function loadGoogleMapsAPI(config) {
  var loadPromise,
    scriptElement,
    key,
    googleMapsAPI = 'The Google Maps JavaScript API',
    google = 'google',
    importLibrary = 'importLibrary',
    callbackFunctionName = '__ib__',
    documentRef = document,
    windowRef = window;

  // Ensure the google and maps objects exist on the window
  windowRef = windowRef[google] || (windowRef[google] = {});
  var maps = windowRef.maps || (windowRef.maps = {}),
    libraries = new Set(),
    urlParams = new URLSearchParams(),
    // Function to load the script
    loadScript = () =>
      loadPromise ||
      (loadPromise = new Promise((resolve, reject) => {
        // Create a new script element
        scriptElement = documentRef.createElement('script');
        // Set the libraries URL parameter
        urlParams.set('libraries', [...libraries] + '');
        // Set the other URL parameters based on the config object
        for (key in config)
          urlParams.set(
            key.replace(/[A-Z]/g, (char) => '_' + char[0].toLowerCase()),
            config[key]
          );
        // Set the callback URL parameter
        urlParams.set('callback', google + '.maps.' + callbackFunctionName);
        // Set the script source
        scriptElement.src =
          `https://maps.${google}apis.com/maps/api/js?` + urlParams;
        // Set the callback function to resolve the promise
        maps[callbackFunctionName] = resolve;
        // Set the error handler to reject the promise
        scriptElement.onerror = () =>
          (loadPromise = reject(Error(googleMapsAPI + ' could not load.')));
        // Set the nonce attribute
        scriptElement.nonce =
          documentRef.querySelector('script[nonce]')?.nonce || '';
        // Append the script element to the head of the document
        documentRef.head.append(scriptElement);
      }));

  // If the importLibrary function already exists, log a warning
  // Otherwise, define the importLibrary function
  maps[importLibrary]
    ? console.warn(googleMapsAPI + ' only loads once. Ignoring:', config)
    : (maps[importLibrary] = (library, ...args) =>
        libraries.add(library) &&
        loadScript().then(() => maps[importLibrary](library, ...args)));
}

// Call the function with the API key and version
loadGoogleMapsAPI({
  key: 'AIzaSyA5_4E24xxgD4akSaTxi1Bs2QRsSLEqOIM',
  v: 'weekly',
});
