const express = require('express');      
const cors = require('cors');            
const app = express();

app.use(cors());                         
app.use(express.json());                 

let notes = [];
let nextId = 1;                          

app.get('/api/notes', (req, res) => {
  res.status(200).json(notes);
});

app.get('/api/notes/:id', (req, res) => {
  const note = notes.find(n => n.id === parseInt(req.params.id));
  if (!note) return res.status(404).json({ error: 'Note not found' });
  res.status(200).json(note);
});

app.post('/api/notes', (req, res) => {

  const { title, content } = req.body;  
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content required' });
  }
  const newNote = {
    id: nextId++,                                    
    title: title,                                    
    content: content,                                
    createdAt: new Date().toISOString().split('T')[0] 
  };

  notes.push(newNote);             
  res.status(201).json(newNote);   
});

app.put('/api/notes/:id', (req, res) => {
  const note = notes.find(n => n.id === parseInt(req.params.id));
  if (!note) return res.status(404).json({ error: 'Note not found' });

  const { title, content } = req.body;
  if (title) note.title = title;
  if (content) note.content = content;
  res.status(200).json(note);
});

app.delete('/api/notes/:id', (req, res) => {
  const index = notes.findIndex(n => n.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Note not found' });

  notes.splice(index, 1);            
  res.status(200).json({ message: 'Note deleted' });
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});

