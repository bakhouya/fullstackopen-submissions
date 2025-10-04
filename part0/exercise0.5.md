sequenceDiagram
    participant User
    participant Browser
    participant Server

    User->>Browser: Navigates to https://studies.cs.helsinki.fi/exampleapp/spa

    Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate Server
    Server-->>Browser: HTML document
    deactivate Server

    Browser->>Server: GET /main.js
    activate Server
    Server-->>Browser: Javascript file
    deactivate Server

    Browser->>Server: GET /frame_ant.js
    activate Server
    Server-->>Browser: JavaScript file
    deactivate Server

    Note right of Browser: The browser executes spa.js which makes an AJAX request

    Browser->>Server: GET /data.json
    activate Server
    Server-->>Browser: JSON (all existing notes with content + dates)
    deactivate Server

    Note right of Browser: JavaScript renders all notes dynamically without reloading the page
