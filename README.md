
# QuickNotes

## Project Description

QuickNotes is a simple web-based note-taking application developed as a system design project. It allows users to retrieve, create, and delete notes through REST API requests.

The project demonstrates fundamental web development and system design concepts, including HTML, CSS, JavaScript, HTTP methods, API communication, relational database design, and system architecture.

## Features

- Retrieve and display notes using GET requests.
- Create new notes using POST requests.
- Delete notes using DELETE requests.
- Validate note titles before submission.
- Display loading, success, and error messages.
- Responsive interface with a decorative design.

## Technologies Used

- HTML5 — page structure.
- CSS3 — styling and responsive layout.
- JavaScript — application logic and API communication.
- JSONPlaceholder — sample REST API.
- SQLite — proposed relational database for the system design.

## How to Run the Application

1. Clone this repository:

   ```bash
   git clone YOUR_GITHUB_REPOSITORY_URL
   ```

2. Open the project folder in Visual Studio Code.

3. Open the `index.html` file using the Live Server extension.

4. Click **Load notes** to retrieve sample notes from JSONPlaceholder.

5. Use the Create Note form to submit a new note or click Delete to remove a displayed note.

**Requirements:** An internet connection is needed to communicate with JSONPlaceholder.

**Important:** JSONPlaceholder simulates POST and DELETE operations. Newly created notes are not permanently stored, and deleted sample notes may reappear when the notes are reloaded.

## Project Structure

```text
quicknotes-system-design/
│
├── index.html
├── style.css
├── api.js
├── README.md
│
└── docs/
    ├── api-design.md
    ├── data-model.md
    └── architecture.md
```

## Technical Documentation

The project includes three supporting design documents:

1. [API Design](docs/api-design.md) — REST endpoints, JSON examples, HTTP status codes, and error handling.

2. [Data Model](docs/data-model.md) — database tables, relationships, SQL queries, indexes, and database selection.

3. [System Architecture](docs/architecture.md) — system requirements, capacity estimates, architecture diagram, request flows, and architectural trade-offs.

## What I Learned

Through this project, I gained practical experience in:

1. **API communication:** Using JavaScript Fetch API to send GET, POST, and DELETE requests and handle server responses.

2. **Error handling:** Using async/await, try/catch/finally, HTTP status codes, and user-friendly status messages.

3. **Database design:** Designing relational database tables using primary keys, foreign keys, relationships, and SQL queries.

4. **System architecture:** Understanding load balancing, caching, read replicas, message queues, scalability, and fault tolerance.

5. **Technical documentation:** Documenting REST APIs, database structures, system requirements, and architecture decisions.

6. **Version control:** Using Git and GitHub to track project changes through meaningful commits.

---

**Project:** QuickNotes System Design  
**Repository:** quicknotes-system-design
