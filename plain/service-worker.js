// DOCS: https://www.w3.org/TR/service-workers-1/

self.addEventListener('install', function (event) {
    // Perform install steps
    console.log("service-worker - install event");
    console.log(self);
    self.skipWaiting(); // will trigger activate event after update, fetch events will be handled immediately
    // event.waitUntil(
        // all important work should be done here
        // console.log("// service-worker installation logic")
    //   );
});


/*
The ExtendableEvent.waitUntil() method extends the lifetime of the event.
When called in an EventHandler associated to the install event,
it delays treating the installing worker as installed until the passed Promise resolves successfully.
This is primarily used to ensure that a service worker is not considered
installed until all of the core caches it depends on are populated.
*/
// https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle
self.addEventListener('activate', event => {
    // Take control of all pages under this SW's scope immediately,
    // instead of waiting for reload/navigation.
    console.log("service-worker - activate event")
    event.waitUntil(self.clients.claim()); // client == tab
  });

self.addEventListener('fetch', function (event) {
    console.log("service-worker - fetch event");

    const prefix="v2 - current date: ";
    const dateResponse = new Response(prefix + new Date().toUTCString());
    // console.log(event)

    if(event.request.url.includes("current-date")) {
        console.log("service-worker - sending get date response");
        event.respondWith(dateResponse);
        return;
    }

    event.respondWith(
        caches.match(event.request)
        .then(function (response) {
            // Cache hit - return response
            if (response) {
                return response;
            }
            return fetch(event.request);
        })
    );
});