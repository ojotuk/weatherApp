// we register service worker here (sw.js)

// check if browser support service worker
if ("serviceWorker" in navigator) {
  //reg service worker step ONE
  navigator.serviceWorker
    .register("/sw.js")
    .then((reg) => {
      console.log("service worker register", reg);
    })
    .catch((err) => {
      // console.log('service worker not registered',err)
    });

  // step TWO
  //install event for service worker on sw.js file
}
