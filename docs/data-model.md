
# QuickNotes Data Model

## 1. Database Overview

QuickNotes uses a relational database to store users, notes, and tags. The database is designed to maintain data accuracy, organise relationships between records, and allow users to retrieve their notes efficiently.

The database contains four main tables:

### A. Users Table

Stores information about registered users.

| Column | Data Type | Key / Constraint | Description |
|---|---|---|---|
| id | INTEGER | Primary Key | Unique user identifier. |
| name | VARCHAR(100) | NOT NULL | User's full name. |
| email | VARCHAR(255) | UNIQUE, NOT NULL | User's email address. |
| created_at | DATETIME | NOT NULL | Date the account was created. |

### B. Notes Table

Stores notes created by users.

| Column | Data Type | Key / Constraint | Description |
|---|---|---|---|
| id | INTEGER | Primary Key | Unique note identifier. |
| user_id | INTEGER | Foreign Key, NOT NULL | Identifies the user who owns the note. |
| title | VARCHAR(100) | NOT NULL | Title of the note. |
| body | TEXT | Optional | Main content of the note. |
| created_at | DATETIME | NOT NULL | Date the note was created. |
| updated_at | DATETIME | NOT NULL | Date the note was last updated. |

### C. Tags Table

Stores labels that users can use to organise their notes.

| Column | Data Type | Key / Constraint | Description |
|---|---|---|---|
| id | INTEGER | Primary Key | Unique tag identifier. |
| user_id | INTEGER | Foreign Key, NOT NULL | Identifies the user who owns the tag. |
| name | VARCHAR(50) | NOT NULL | Name of the tag. |

Each user can create their own tags. A user cannot create two tags with the same name.

### D. Note_Tags Table

Connects notes with tags. This table supports the many-to-many relationship between notes and tags.

| Column | Data Type | Key / Constraint | Description |
|---|---|---|---|
| note_id | INTEGER | Composite Primary Key, Foreign Key | Identifies the note. |
| tag_id | INTEGER | Composite Primary Key, Foreign Key | Identifies the tag. |

The combination of `note_id` and `tag_id` forms a composite primary key, preventing the same tag from being associated with the same note more than once.

## 2. Database Relationships

The database uses the following relationships:

1. **Users to Notes (One-to-Many):** One user can create many notes, but each note belongs to one user.

2. **Users to Tags (One-to-Many):** One user can create many tags, but each tag belongs to one user.

3. **Notes to Tags (Many-to-Many):** One note can have multiple tags, and one tag can be applied to multiple notes. The `note_tags` table manages this relationship.


## 3. SQL Table Creation Statements

The following SQL statements create the four QuickNotes database tables.

```sql
-- Enable foreign key enforcement in SQLite
PRAGMA foreign_keys = ON;

-- 1. Create the users table
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 2. Create the notes table
CREATE TABLE notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    title VARCHAR(100) NOT NULL,
    body TEXT,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE
);

-- 3. Create the tags table
CREATE TABLE tags (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    name VARCHAR(50) NOT NULL,

    FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE,

    UNIQUE (user_id, name)
);

-- 4. Create the note_tags table
CREATE TABLE note_tags (
    note_id INTEGER NOT NULL,
    tag_id INTEGER NOT NULL,

    PRIMARY KEY (note_id, tag_id),

    FOREIGN KEY (note_id) REFERENCES notes(id)
        ON DELETE CASCADE,

    FOREIGN KEY (tag_id) REFERENCES tags(id)
        ON DELETE CASCADE
);
```

## 4. Example SQL Queries

### Query 1: Retrieve all notes belonging to a user

This query retrieves a user's notes, displaying the most recently created notes first.

```sql
SELECT id, title, body, created_at
FROM notes
WHERE user_id = 1
ORDER BY created_at DESC;
```

### Query 2: Retrieve notes together with their tags (JOIN)

This query combines information from the notes, note_tags, and tags tables to show which tags are associated with each note.

```sql
SELECT
    notes.title,
    notes.body,
    tags.name AS tag_name
FROM notes
JOIN note_tags ON notes.id = note_tags.note_id
JOIN tags ON note_tags.tag_id = tags.id
WHERE notes.user_id = 1;
```

### Query 3: Count the number of notes created by each user

This query uses a LEFT JOIN to include users who have not created any notes.

```sql
SELECT
    users.name,
    COUNT(notes.id) AS total_notes
FROM users
LEFT JOIN notes ON users.id = notes.user_id
GROUP BY users.id, users.name;
```

## 5. Database Index

The following index improves the retrieval of notes belonging to a particular user, especially when displaying the newest notes first.

```sql
CREATE INDEX idx_notes_user_created
ON notes(user_id, created_at DESC);
```

**Reason for the index:**

QuickNotes may eventually store millions of notes. Without an index, the database may need to scan many records to find notes belonging to a particular user.

This index helps the database locate a user's notes and retrieve them in descending creation-date order more efficiently.

The index improves read performance, although it requires additional storage and slightly increases the work involved in inserting and updating records.


## 6. SQL vs NoSQL: Database Choice

QuickNotes will use SQLite, a relational SQL database.

### Why SQL is suitable for QuickNotes

1. **Structured data:** Users, notes, and tags have clearly defined fields and relationships that fit relational tables.

2. **Data integrity:** Primary keys, foreign keys, and constraints help prevent invalid records and maintain accurate relationships between users, notes, and tags.

3. **Relationships:** SQL supports JOIN operations, making it easier to retrieve notes together with their associated tags and user information.

4. **Transactions:** SQL databases support transactions, helping ensure that related database operations are completed consistently.

5. **Data consistency:** Relational databases help maintain reliable and organised information as the application grows.

### Why NoSQL was not selected

NoSQL databases are useful for applications that need flexible data structures or specialised horizontal scaling. However, QuickNotes has structured data and clear relationships between its entities.

A relational SQL database is therefore a more suitable choice for this project's data model.
