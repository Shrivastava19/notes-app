import { useState, useEffect } from 'react';
import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';
import NoteDetail from './components/NoteDetail';

const API = 'http://localhost:5000/api/notes';

function App() {
  const [notes, setNotes] = useState([]);          
  const [loading, setLoading] = useState(false);   
  const [error, setError] = useState(null);        
  const [selectedNote, setSelectedNote] = useState(null);  
  const [editingNote, setEditingNote] = useState(null);    

  useEffect(() => {
    setLoading(true);
    fetch(API)
      .then(res => res.json())
      .then(data => { setNotes(data); setLoading(false); })
      .catch(() => { setError('Failed to load notes'); setLoading(false); });
  }, []);

  const createNote = (title, content) => {
    fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content })
    })
      .then(res => res.json())
      .then(newNote => setNotes([...notes, newNote]))
      .catch(() => setError('Failed to create note'));
  };

  const updateNote = (id, title, content) => {
    fetch(`${API}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content })
    })
      .then(res => res.json())
      .then(updated => {
        setNotes(notes.map(n => n.id === id ? updated : n));
        setEditingNote(null);
      })
      .catch(() => setError('Failed to update note'));
  };

  const deleteNote = (id) => {
    fetch(`${API}/${id}`, { method: 'DELETE' })
      .then(() => {
        setNotes(notes.filter(n => n.id !== id));
        setSelectedNote(null);
      })
      .catch(() => setError('Failed to delete note'));
  };

  return (
    <div>
      <h1>Notes App</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <NoteForm onSubmit={createNote} />
      <NoteList notes={notes} onSelect={setSelectedNote} onDelete={deleteNote} onEdit={setEditingNote} />
      {selectedNote && <NoteDetail note={selectedNote} />}
      {editingNote && <NoteForm existing={editingNote} onSubmit={(t, c) => updateNote(editingNote.id, t, c)} />}
    </div>
  );
}

export default App;