## References

* https://github.com/angular/angularfire2
* https://github.com/ngrx/platform
* https://firebase.google.com/docs/firestore
* https://golb.hplar.ch/2017/11/Ionic-with-Workbox-Service-Worker.html

## Testing

Terminal 1

```
npm run build
```

Terminal 2

```
npm run open-nocache
```

Use Chrome incognito window.

## Firebase hosting

```
npm install -g firebase-tools
firebase init
firebase deploy
```

```
TodoListPage
    shared/TodoListComponent
    TodoListPopover
    TodoDetailModal
        shared/ControlMessagesComponent
        shared/TodoDetailComponent

TodoCompletedListPage
    shared/TodoCompletedListComponent
    TodoCompletedDetailModal

LoginPage
    shared/ControlMessagesComponent
    SignupPage

SignupPage
    shared/ControlMessagesComponent
```

# Convert to PWA

* Remove @ionic-native from package.json, app.module.ts & app.component.ts.
* Remove cordovaPlugins and cordovaPlatforms from package.json.
* Remove sw-toolbox from package.json.
* ionic.config.json: Clear "integrations".

```
"integrations": {}
```

* index.html: Remove the script tag that imports cordova.js

```
<script src="cordova.js"></script>
```

* Install the Workbox library and command line interface.

```
npm install workbox-cli -D
npm install workbox-sw
```

* copy.config.js

```typescript
module.exports = {
  copyWorkbox: {
    src: [
      './node_modules/workbox-sw/build/importScripts/workbox-sw.prod.v2.1.3.js',
    ],
    dest: '{{WWW}}',
  },
};
```

* package.json

```json
"config": {
  "ionic_copy": "./copy.config.js"
},
```

* src/service-worker.js

```typescript
importScripts('workbox-sw.prod.v2.1.3.js');

const workboxSW = new self.WorkboxSW({
  clientsClaim: true,
  skipWaiting: true,
});
workboxSW.precache([]);
workboxSW.precache([
  {
    url: 'assets/fonts/ionicons.woff2?v=3.0.0-alpha.3',
  },
]);
```

* package.json

```
"postbuild": "workbox inject:manifest",
```

* workbox-cli-config.js

```typescript
module.exports = {
  globDirectory: 'www/',
  globPatterns: [
    'assets/fonts/*.woff2',
    'build/**/*.css',
    'build/**/*.js',
    'index.html',
    'manifest.json',
  ],
  dontCacheBustUrlsMatching: new RegExp('.+.[a-f0-9]{8}..+'),
  maximumFileSizeToCacheInBytes: '5MB',
  swSrc: 'src/service-worker.js',
  swDest: 'www/service-worker.js',
};
```

* Install http-server

```
npm install http-server -D
```

* package.json

```
"open": "http-server www  -o -a localhost -p 1234",
"open-nocache": "http-server www -c-1 -o -a localhost -p 1234",
```

* index.html

```html
  <!-- #region Service Worker -->
  <!--
   The following script is based on
   https://developers.google.com/web/tools/workbox/guides/advanced-recipes#offer_a_page_reload_for_users

   I added the window.isUpdateAvailable stuff.
   The window.addEventListener('load'... causes the reload detection to fail.
  -->
  <script>
    function onNewServiceWorker(registration, callback) {
      if (registration.waiting) {
        // SW is waiting to activate. Can occur if multiple clients open and
        // one of the clients is refreshed.
        return callback();
      }

      function listenInstalledStateChange() {
        registration.installing.addEventListener('statechange', function (event) {
          if (event.target.state === 'installed') {
            // A new service worker is available, inform the user
            callback();
          }
        });
      }

      if (registration.installing) {
        return listenInstalledStateChange();
      }

      // We are currently controlled so a new SW may be found...
      // Add a listener in case a new SW is found,
      registration.addEventListener('updatefound', listenInstalledStateChange);
    }

    // make the whole serviceworker process into a promise so later on we can
    // listen to it and in case new content is available a toast will be shown
    window.isUpdateAvailable = new Promise(function (resolve, reject) {
      // Commented out by me.
      // window.addEventListener('load', function () {
      navigator.serviceWorker.register('service-worker.js').then(function (registration) {
        console.log('##-serviceWorker:register');

        // Track updates to the Service Worker.
        if (!navigator.serviceWorker.controller) {
          // The window client isn't currently controlled so it's a new service
          // worker that will activate immediately
          console.log('##-serviceWorker:new');
          return;
        }

        /* Commented out by me.
        // When the user asks to refresh the UI, we'll need to reload the window
        var preventDevToolsReloadLoop;
        navigator.serviceWorker.addEventListener('controllerchange', function (
          event,
        ) {
          console.log('##-serviceWorker:controllerchange:preventDevToolsReloadLoop>', preventDevToolsReloadLoop);
          // Ensure refresh is only called once.
          // This works around a bug in "force update on reload".
          if (preventDevToolsReloadLoop) return;
          preventDevToolsReloadLoop = true;
          console.log('#### window.location.reload() required');
          // window.location.reload();

        });
        */
        onNewServiceWorker(registration, function () {
          // Commented out by me.
          // showRefreshUI(registration);
          resolve(true);
        });
      });

    }); // addEventListener- load'
    // Commented out by me.  
    // }); // Promise  
  </script>
  <!-- #endregion -->
```

* app.component.ts

```typescript
import { Component } from '@angular/core';
import { Platform, ToastController } from 'ionic-angular';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html',
})
export class MyApp {
  rootPage: any = HomePage;

  constructor(platform: Platform, private toastCtrl: ToastController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.serviceWorkerUpdatesCheck();
    });
  }

  private serviceWorkerUpdatesCheck(): void {
    // listen to the service worker promise in index.html to see if there has been a new update.
    // condition: the service-worker.js needs to have some kind of change - e.g. increment CACHE_VERSION.
    window['isUpdateAvailable'].then((isAvailable) => {
      if (isAvailable) {
        console.log('isUpdateAvailable');
        // window.location.reload();

        const toast = this.toastCtrl.create({
          message: 'A new version is available, reload ',
          closeButtonText: 'Reload',
          showCloseButton: true,
        });
        toast.onDidDismiss((data, role) => {
          if (role === 'close') {
            window.location.reload();
          }
        });
        toast.present();
      }
    });
  }
}
```

## Firbase Hosting

firebase.json

```json
{
  "hosting": {
    "public": "www",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
    "headers": [
      {
        "source": "service-worker.js",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "no-cache"
          }
        ]
      }
    ]
  }
}
```

.firebaserc

```
{
  "projects": {
    "default": "ionic-todo-angularfirestore"
  }
}
```
