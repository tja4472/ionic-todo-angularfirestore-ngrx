## References

* https://github.com/angular/angularfire2
* https://github.com/ngrx/platform
* https://firebase.google.com/docs/firestore

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
* ionic.config.json: Clear "integrations".

```
"integrations": {}
```

## package.json

## app.component.ts
