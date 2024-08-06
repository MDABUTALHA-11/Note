let selectedColor = '#ffffff';
let notes = JSON.parse(localStorage.getItem('notes')) || [];
let trash = JSON.parse(localStorage.getItem('trash')) || [];
const userId = localStorage.getItem('userId') || generateUserId();
let currentImageUrl = '';

function generateUserId() {
    const id = 'user-' + Date.now();
    localStorage.setItem('userId', id);
    return id;
}

function selectColor(color) {
    selectedColor = color;
}

function addNote() {
    const noteText = document.getElementById('noteText').value;
    const noteLabel = document.getElementById('noteLabel').value;
    if (noteText.trim() === '') {
        alert('Please enter a note');
        return;
    }

    const note = {
        userId: userId,
        text: noteText,
        label: noteLabel,
        color: selectedColor,
        id: Date.now(),
        imageUrl: currentImageUrl
    };

    notes.push(note);
    saveNotes();
    renderNotes();
    document.getElementById('noteText').value = '';
    document.getElementById('noteLabel').value = '';
    currentImageUrl = ''; // Reset image URL after adding a note
    document.getElementById('imagePreview').style.display = 'none'; // Hide image preview
}

function deleteNote(noteId) {
    const noteIndex = notes.findIndex(note => note.id === noteId);
    if (noteIndex > -1) {
        trash.push(notes[noteIndex]);
        notes.splice(noteIndex, 1);
        saveNotes();
        renderNotes();
        renderTrash();
    }
}

function deleteTrashNote(noteId) {
    const noteIndex = trash.findIndex(note => note.id === noteId);
    if (noteIndex > -1) {
        trash.splice(noteIndex, 1);
        saveNotes();
        renderTrash();
    }
}

function saveNotes() {
    localStorage.setItem('notes', JSON.stringify(notes));
    localStorage.setItem('trash', JSON.stringify(trash));
}

function renderNotes() {
    const notesSection = document.getElementById('notesSection');
    notesSection.innerHTML = '';
    notes.filter(note => note.userId === userId).forEach(note => {
        const noteDiv = document.createElement('div');
        noteDiv.className = 'note';
        noteDiv.style.backgroundColor = note.color;

        const noteContent = document.createElement('p');
        noteContent.textContent = note.text;

        const noteLabel = document.createElement('div');
        noteLabel.className = 'note-label';
        noteLabel.textContent = note.label;

        if (note.imageUrl) {
            const noteImage = document.createElement('img');
            noteImage.src = note.imageUrl;
            noteImage.className = 'note-image';
            noteDiv.appendChild(noteImage);
        }

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-btn';
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.onclick = function() {
            deleteNote(note.id);
        };

        noteDiv.appendChild(noteContent);
        noteDiv.appendChild(noteLabel);
        noteDiv.appendChild(deleteButton);
        notesSection.appendChild(noteDiv);
    });
}

function renderTrash() {
    const trashSection = document.getElementById('trashSection');
    trashSection.innerHTML = '';
    trash.filter(note => note.userId === userId).forEach(note => {
        const noteDiv = document.createElement('div');
        noteDiv.className = 'note';
        noteDiv.style.backgroundColor = note.color;

        const noteContent = document.createElement('p');
        noteContent.textContent = note.text;

        const noteLabel = document.createElement('div');
        noteLabel.className = 'note-label';
        noteLabel.textContent = note.label;

        if (note.imageUrl) {
            const noteImage = document.createElement('img');
            noteImage.src = note.imageUrl;
            noteImage.className = 'note-image';
            noteDiv.appendChild(noteImage);
        }

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-btn';
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.onclick = function() {
            deleteTrashNote(note.id);
        };

        noteDiv.appendChild(noteContent);
        noteDiv.appendChild(noteLabel);
        noteDiv.appendChild(deleteButton);
        trashSection.appendChild(noteDiv);
    });
}

function previewImage(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            currentImageUrl = e.target.result;
            const imagePreview = document.getElementById('imagePreview');
            imagePreview.src = currentImageUrl;
            imagePreview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
}

function showSection(section) {
    const sections = ['notes', 'trash'];
    sections.forEach(sec => {
        document.getElementById(`${sec}Section`).style.display = (sec === section) ? 'flex' : 'none';
    });
}

// Initial render
renderNotes();
renderTrash();
