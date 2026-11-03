
# QuickNotes API Design

## 1. Overview

The QuickNotes API allows users to create, retrieve, update, and delete notes. It also supports managing tags associated with notes.

The API uses REST principles and JSON for data exchange. All endpoints use the base URL:

`https://api.quicknotes.com/v1`

Authenticated requests must include a valid Bearer token in the Authorization header.

## 2. API Endpoints

| HTTP Method | Endpoint | Description | Success Status |
|---|---|---|---|
| GET | `/notes` | Retrieves all notes belonging to the authenticated user. | 200 OK |
| POST | `/notes` | Creates a new note. | 201 Created |
| GET | `/notes/{noteId}` | Retrieves a specific note using its ID. | 200 OK |
| PATCH | `/notes/{noteId}` | Updates an existing note. | 200 OK |
| DELETE | `/notes/{noteId}` | Deletes a specific note. | 204 No Content |
| GET | `/tags` | Retrieves all tags belonging to the authenticated user. | 200 OK |
| POST | `/notes/{noteId}/tags` | Associates a tag with a specific note. | 201 Created |


## 3. JSON Request and Response Examples

### A. Retrieve Notes (GET /notes)

The frontend sends a GET request to retrieve the authenticated user's notes.

**Request:**

`GET /notes`

**Successful Response (200 OK):**

```json
{
  "notes": [
    {
      "id": 1,
      "userId": 12,
      "title": "My First Note",
      "body": "This is my first QuickNotes entry.",
      "createdAt": "2026-11-01T10:30:00Z"
    },
    {
      "id": 2,
      "userId": 12,
      "title": "Project Ideas",
      "body": "Ideas for my next project.",
      "createdAt": "2026-11-02T08:15:00Z"
    }
  ]
}
```

### B. Create a Note (POST /notes)

The frontend sends a POST request with the new note's title and body.

**Request:**

`POST /notes`

Content-Type: `application/json`

**Request Body:**

```json
{
  "title": "Meeting Notes",
  "body": "Discuss the project timeline and deliverables."
}
```

**Successful Response (201 Created):**

```json
{
  "id": 3,
  "userId": 12,
  "title": "Meeting Notes",
  "body": "Discuss the project timeline and deliverables.",
  "createdAt": "2026-11-03T09:00:00Z"
}
```

## 4. Error Handling

The API uses standard HTTP status codes to communicate errors. Each error response includes a status code, an error description, and a message explaining what went wrong.

### Error Status Codes

| Status Code | Error | Description |
|---|---|---|
| 400 | Bad Request | The request contains invalid or missing information, such as an empty note title. |
| 401 | Unauthorized | The user has not provided a valid authentication token. |
| 403 | Forbidden | The user is authenticated but does not have permission to access the requested resource. |
| 404 | Not Found | The requested note or resource does not exist. |
| 500 | Internal Server Error | An unexpected problem occurred on the server while processing the request. |

### Example Error Response

**Scenario:** A user attempts to create a note without providing a title.

**Response: 400 Bad Request**

```json id="8m0x2v"
{
  "error": {
    "code": 400,
    "type": "Bad Request",
    "message": "The note title is required."
  }
}
```

The frontend can use the error message to inform the user what went wrong and what action to take.

