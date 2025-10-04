sequenceDiagram
    participant User
    participant Browser
    participant Server

    User->>Browser: Types a new note and clicks Save

    Note right of Browser: JavaScript intercepts the event (no full page reload)

    Browser->>Server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa (with note content in JSON)
    activate Server
    Server-->>Browser: 201 Created (confirmation)
    deactivate Server

    Note right of Browser: The browser immediately updates the note list in the DOM

    Browser->>Server: GET /data.json
    activate Server
    Server-->>Browser: JSON (all notes including the new one)
    deactivate Server

    Note right of Browser: The page is updated with the new note dynamically
