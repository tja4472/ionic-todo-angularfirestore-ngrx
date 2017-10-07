### Rules
```
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
    	match /{allChidren=**} {
    		allow read, write: if request.auth.uid == userId;
      }
    }  
    match /completed-todos/{document=**} {
      allow read, write;
    }
    match /current-todos/{document=**} {
      allow read, write;
    }    
  }
}
```
