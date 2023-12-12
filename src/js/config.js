((g) => {
  var h,
    a,
    k,
    p = 'The Google Maps JavaScript API',
    c = 'google',
    l = 'importLibrary',
    q = '__ib__',
    m = document,
    b = window;
  b = b[c] || (b[c] = {});
  var d = b.maps || (b.maps = {}),
    r = new Set(),
    e = new URLSearchParams(),
    u = () => {
      if (!h) {
        h = new Promise((f, n) => {
          a = m.createElement('script');
          e.set('libraries', [...r] + '');
          for (k in g)
            e.set(
              k.replace(/[A-Z]/g, (t) => '_' + t[0].toLowerCase()),
              g[k]
            );
          e.set('callback', c + '.maps.' + q);
          a.src = `https://maps.${c}apis.com/maps/api/js?` + e;
          d[q] = f;
          a.onerror = () => {
            h = null;
            n(Error(p + ' could not load.'));
          };
          a.nonce = m.querySelector('script[nonce]')?.nonce || '';
          m.head.append(a);
        });
      }
      return h;
    };
  d[l]
    ? console.warn(p + ' only loads once. Ignoring:', g)
    : (d[l] = (f, ...n) => {
        r.add(f);
        return u().then(() => d[l](f, ...n));
      });
})({
  key: 'AIzaSyA5_4E24xxgD4akSaTxi1Bs2QRsSLEqOIM',
  v: 'weekly',
});
