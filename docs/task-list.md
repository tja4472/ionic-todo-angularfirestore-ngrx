taskLists
- taskList
  - todos
  - completedTodos

aaaa

## Cloud Firestore
- users(collection)
  - user(document)
    - completed-todos(collection)
        - completed-todo(document)
          - description(field)
          - id(field)
          - isComplete(field)
          - name(field)
    - current-todos(collection)
      - current-todo(document)   
          - description(field)
          - id(field)
          - index(field)
          - isComplete(field)
          - name(field)      
    - todo-lists(collection)
      - todo-list(document)
        - id(field)
        - name(field)
