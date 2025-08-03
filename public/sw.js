// MAKU Travel Service Worker
// Handles push notifications, offline caching, and background sync

const CACHE_NAME = 'maku-travel-v1';
const API_CACHE_NAME = 'maku-api-v1';

// Files to cache for offline support
const STATIC_CACHE_FILES = [
  '/',
  '/inventory',
  '/manifest.json',
  // Add other critical pages and assets
];

// API endpoints to cache
const API_ENDPOINTS = [
  '/api/inventory/live'
];

// Install event - cache static files
self.addEventListener('install', (event) => {
  console.log('MAKU Service Worker: Installing...');

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('MAKU Service Worker: Caching static files');
        return cache.addAll(STATIC_CACHE_FILES);
      })
      .then(() => {
        console.log('MAKU Service Worker: Static files cached successfully');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('MAKU Service Worker: Cache installation failed', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('MAKU Service Worker: Activating...');

  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME && cacheName !== API_CACHE_NAME) {
              console.log('MAKU Service Worker: Deleting old cache', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('MAKU Service Worker: Old caches cleaned up');
        return self.clients.claim();
      })
  );
});

// Fetch event - handle network requests with caching strategy
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Handle API requests with network-first strategy
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Cache successful API responses
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(API_CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseClone);
              });
          }
          return response;
        })
        .catch(() => {
          // Fallback to cache if network fails
          return caches.match(event.request)
            .then((cachedResponse) => {
              if (cachedResponse) {
                console.log('MAKU Service Worker: Serving cached API response');
                return cachedResponse;
              }

              // Return offline fallback for inventory API
              if (url.pathname.includes('/inventory/live')) {
                return new Response(JSON.stringify({
                  hotels: [],
                  alerts: [{
                    id: 'offline_alert',
                    message: 'You are currently offline. Data may not be up to date.',
                    type: 'offline',
                    urgency: 'medium',
                    timestamp: new Date().toISOString()
                  }],
                  lastUpdated: new Date().toISOString(),
                  source: 'offline_cache',
                  metadata: {
                    totalHotels: 0,
                    petFriendlyCount: 0,
                    searchParams: {}
                  }
                }), {
                  headers: { 'Content-Type': 'application/json' }
                });
              }

              throw new Error('No cached response available');
            });
        })
    );
    return;
  }

  // Handle static files with cache-first strategy
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(event.request)
          .then((response) => {
            // Cache successful responses
            if (response.status === 200 && response.type === 'basic') {
              const responseClone = response.clone();
              caches.open(CACHE_NAME)
                .then((cache) => {
                  cache.put(event.request, responseClone);
                });
            }
            return response;
          });
      })
  );
});

// Push notification event handler
self.addEventListener('push', (event) => {
  console.log('MAKU Service Worker: Push message received');

  let data = {};
  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      data = { title: 'MAKU Travel', body: event.data.text() || 'New notification' };
    }
  }

  const options = {
    title: data.title || 'MAKU Travel Alert',
    body: data.body || 'You have a new travel update!',
    icon: '/icon-192.png',
    badge: '/badge-72.png',
    data: data,
    actions: [
      {
        action: 'view',
        title: 'View Details',
        icon: '/view-icon.png'
      },
      {
        action: 'dismiss',
        title: 'Dismiss',
        icon: '/dismiss-icon.png'
      }
    ],
    tag: data.tag || 'maku-notification',
    renotify: true,
    requireInteraction: data.urgent || false,
    vibrate: data.urgent ? [200, 100, 200] : [100, 50, 100]
  };

  // Customize notification based on type
  if (data.type === 'price_drop') {
    options.title = '💰 Price Drop Alert!';
    options.icon = '/price-drop-icon.png';
    options.requireInteraction = true;
    options.vibrate = [200, 100, 200, 100, 200];
  } else if (data.type === 'low_availability') {
    options.title = '⚠️ Low Availability Alert!';
    options.icon = '/availability-icon.png';
    options.requireInteraction = true;
    options.vibrate = [300, 100, 300];
  } else if (data.type === 'pet_deal') {
    options.title = '🐾 Pet-Friendly Deal!';
    options.icon = '/pet-deal-icon.png';
  }

  event.waitUntil(
    self.registration.showNotification(options.title, options)
      .then(() => {
        console.log('MAKU Service Worker: Notification displayed successfully');
      })
      .catch((error) => {
        console.error('MAKU Service Worker: Notification display failed', error);
      })
  );
});

// Notification click event handler
self.addEventListener('notificationclick', (event) => {
  console.log('MAKU Service Worker: Notification clicked', event);

  event.notification.close();

  const action = event.action;
  const data = event.notification.data || {};

  if (action === 'dismiss') {
    return;
  }

  // Determine URL to open based on notification type
  let url = '/';
  if (data.type === 'price_drop' || data.type === 'low_availability') {
    url = '/inventory';
  } else if (data.hotelId) {
    url = `/hotels/${data.hotelId}`;
  } else if (data.url) {
    url = data.url;
  }

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
        // Check if there's already a window/tab open
        for (const client of clientList) {
          if (client.url.includes(url) && 'focus' in client) {
            return client.focus();
          }
        }

        // Open a new window/tab
        if (clients.openWindow) {
          return clients.openWindow(url);
        }
      })
      .catch((error) => {
        console.error('MAKU Service Worker: Failed to handle notification click', error);
      })
  );
});

// Background sync event handler
self.addEventListener('sync', (event) => {
  console.log('MAKU Service Worker: Background sync triggered', event.tag);

  if (event.tag === 'inventory-sync') {
    event.waitUntil(
      fetch('/api/inventory/live')
        .then((response) => response.json())
        .then((data) => {
          console.log('MAKU Service Worker: Background inventory sync completed');

          // Check for urgent alerts and show notifications
          if (data.alerts && data.alerts.length > 0) {
            data.alerts.forEach((alert) => {
              if (alert.urgency === 'high') {
                self.registration.showNotification(alert.message, {
                  icon: '/alert-icon.png',
                  badge: '/badge-72.png',
                  tag: `alert-${alert.id}`,
                  data: { type: alert.type, hotelId: alert.hotelId }
                });
              }
            });
          }
        })
        .catch((error) => {
          console.error('MAKU Service Worker: Background sync failed', error);
        })
    );
  }
});

// Message event handler for communication with main thread
self.addEventListener('message', (event) => {
  console.log('MAKU Service Worker: Message received', event.data);

  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_NAME });
  }

  if (event.data && event.data.type === 'CACHE_INVENTORY') {
    event.waitUntil(
      caches.open(API_CACHE_NAME)
        .then((cache) => {
          return cache.put('/api/inventory/live', new Response(JSON.stringify(event.data.data)));
        })
        .then(() => {
          event.ports[0].postMessage({ success: true });
        })
        .catch((error) => {
          event.ports[0].postMessage({ success: false, error: error.message });
        })
    );
  }
});

console.log('MAKU Service Worker: Loaded successfully');
