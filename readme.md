## References

* https://github.com/angular/angularfire2
* https://github.com/ngrx/platform
* https://firebase.google.com/docs/firestore
* https://golb.hplar.ch/2017/11/Ionic-with-Workbox-Service-Worker.html

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
* index.html: Remove the script tag that imports cordova.js

```
<script src="cordova.js"></script>
```


```
"integrations": {}
```

## package.json

## app.component.ts
