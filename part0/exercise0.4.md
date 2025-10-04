sequenceDiagram
    participant User
    participant Browser
    participant Server

    User->>Browser: Writes a new note in the input and clicks Save

    Browser->>Server: POST /exampleapp/new_note (with note content)
    activate Server
    Server-->>Browser: 302 Redirect → https://studies.cs.helsinki.fi/exampleapp/notes (183ms)
    deactivate Server

    Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate Server
    Server-->>Browser: HTML document
    deactivate Server

    Browser->>Server: GET /main.js
    activate Server
    Server-->>Browser: JavaScript file
    deactivate Server

    Browser->>Server: GET /frame_ant.js
    activate Server
    Server-->>Browser: JavaScript file
    deactivate Server

    Browser->>Server: GET /data.json
    activate Server
    Server-->>Browser: JSON [ {content: "test123", date: "2025-10-04"}, ... ]
    deactivate Server

    Note right of Browser: The browser updates the page and displays the new note

