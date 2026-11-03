
// The API endpoint that provides sample notes
const API_URL = "https://jsonplaceholder.typicode.com/posts";

// Select the HTML elements we need
const loadButton = document.getElementById("load-btn");
const statusMessage = document.getElementById("status");
const notesList = document.getElementById("notes-list");


async function request(url, options = {}) {
    const response = await fetch(url, options);

    // Check whether the server returned a successful response
    if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
    }

    // Return the server's response as JavaScript data
    return response.json();
}


function renderNote(note) {
    // Create the list item
    const listItem = document.createElement("li");

    // Create and populate the note title
    const title = document.createElement("h3");
    title.textContent = note.title;

    // Create and populate the note content
    const body = document.createElement("p");
    body.textContent = note.body;

    // Create a Delete button
    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";

    // Connect the button to the delete function
    deleteButton.addEventListener("click", () => {
        deleteNote(note.id, listItem, deleteButton);
    });

    // Place all elements inside the list item
    listItem.append(title, body, deleteButton);

    return listItem;
}


async function deleteNote(noteId, listItem, deleteButton) {
    // Disable the button while the request is running
    deleteButton.disabled = true;
    showStatus("Deleting note...", "status-loading");

    try {
        // Send a DELETE request to the API
        await request(`${API_URL}/${noteId}`, {
            method: "DELETE"
        });

        // Remove the note from the displayed list
        listItem.remove();

        showStatus(
            `Note ${noteId} deleted successfully.`,
            "status-success"
        );

        // JSONPlaceholder simulates DELETE; it does not permanently
        // remove the note from its sample dataset.

    } catch (error) {
        showStatus(
            "We couldn't delete this note. Please try again.",
            "status-error"
        );
        console.error(error);

    } finally {
        // Re-enable the button
        deleteButton.disabled = false;
    }
}

function showStatus(message, type = "") {
    statusMessage.textContent = message;
    statusMessage.className = type;
}

async function loadNotes() {
    loadButton.disabled = true;
    showStatus("Loading notes...", "status-loading");

    try {
        const notes = await request(`${API_URL}?_limit=10`);

        // Clear any notes already displayed
        notesList.replaceChildren();

        if (notes.length === 0) {
            const emptyMessage = document.createElement("li");
            emptyMessage.textContent = "No notes were found.";
            notesList.appendChild(emptyMessage);

            showStatus("No notes were found.", "");
            return;
        }

        // Display each note
        notes.forEach(note => {
            notesList.appendChild(renderNote(note));
        });

        showStatus(`Loaded ${notes.length} notes from the server.`, "status-success");

    } catch (error) {
        showStatus("We couldn't load your notes. Please try again.", "status-error");
        console.error(error);

    } finally {
        loadButton.disabled = false;
    }
}

// Run loadNotes when the button is clicked
loadButton.addEventListener("click", loadNotes);

const noteForm = document.getElementById("note-form");
const titleInput = document.getElementById("title-input");
const bodyInput = document.getElementById("body-input");
const submitButton = document.getElementById("submit-btn");


noteForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const title = titleInput.value.trim();
    const body = bodyInput.value.trim();

    // Validate the title
    if (title === "") {
        showStatus("Please enter a note title.", "status-error");
        titleInput.focus();
        return;
    }

    if (title.length > 100) {
        showStatus("The title must not exceed 100 characters.", "status-error");
        titleInput.focus();
        return;
    }

    
    submitButton.disabled = true;
    showStatus("Creating your note...", "status-loading");

    try {
        const newNote = await request(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: title,
                body: body,
                userId: 1
            })
        });

// Display the new note at the top without removing existing notes
notesList.prepend(renderNote(newNote));

        showStatus(
            `Note created (status 201, id ${newNote.id}).`,
            "status-success"
        );

        // Clear the form after successful submission
        noteForm.reset();

    } catch (error) {
        showStatus("We couldn't create your note. Please try again.", "status-error");
        console.error(error);

    } finally {
        submitButton.disabled = false;
    }

});
