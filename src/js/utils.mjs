// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener('touchend', (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener('click', callback);
}

export function saveMarkersToLocalStorage(markers) {
  const markersJson = JSON.stringify(markers);
  localStorage.setItem('markers', markersJson);
}

export function loadMarkersFromLocalStorage() {
  const markersJson = localStorage.getItem('markers');
  return markersJson ? JSON.parse(markersJson) : [];
}

export async function renderWithTemplate(
  templateFn,
  parentElement,
  callback,
  data,
  position = 'afterbegin',
  clear = true
) {
  if (clear) {
    parentElement.innerHTML = '';
  }
  const htmlString = await templateFn(data);
  parentElement.insertAdjacentHTML(position, htmlString);

  if (callback) {
    callback(data);
  }
}

function loadTemplate(path) {
  return async function () {
    const res = await fetch(path);
    if (res.ok) {
      const html = await res.text();
      return html;
    }
  };
}

function setTitle(data) {
  // Get the title element
  const titleElement = document.querySelector('.title');

  // Set the title
  titleElement.textContent = data.title;
}

export async function loadHeader(title = '') {
  const headerTemplateFn = loadTemplate('/partials/header.html');
  const headerEl = document.querySelector('#main-header');
  await renderWithTemplate(headerTemplateFn, headerEl, setTitle, { title });
}
