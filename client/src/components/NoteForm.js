import { useState, useEffect } from 'react';

function NoteForm({ onSubmit, existing }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (existing) {
      setTitle(existing.title);
      setContent(existing.content);
    }
  }, [existing]);

  const handleSubmit = () => {
    if (!title || !content) return alert('Please fill in both fields');
    onSubmit(title, content);
    setTitle('');
    setContent('');
  };

  return (
    <div style={{
      background: 'white',
      border: '1px solid #e0e0de',
      borderRadius: '12px',
      padding: '1.25rem',
      marginBottom: '1.5rem'
    }}>
      <p style={{
        fontSize: '11px',
        fontWeight: '500',
        color: '#888',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        marginBottom: '12px'
      }}>
        {existing ? 'Edit note' : 'New note'}
      </p>
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Title"
        style={{
          width: '100%',
          padding: '8px 12px',
          border: '1px solid #e0e0de',
          borderRadius: '8px',
          fontSize: '14px',
          marginBottom: '8px',
          background: '#fafaf8',
          fontFamily: 'inherit',
          outline: 'none'
        }}
      />
      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="Write your note here..."
        rows={4}
        style={{
          width: '100%',
          padding: '8px 12px',
          border: '1px solid #e0e0de',
          borderRadius: '8px',
          fontSize: '14px',
          marginBottom: '12px',
          background: '#fafaf8',
          fontFamily: 'inherit',
          resize: 'none',
          outline: 'none'
        }}
      />

      {/* Submit button */}
      <button
        onClick={handleSubmit}
        style={{
          background: '#e6f1fb',
          color: '#185fa5',
          border: 'none',
          padding: '8px 18px',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: '500',
          cursor: 'pointer',
          fontFamily: 'inherit'
        }}
      >
        {existing ? '✓ Update note' : '+ Add note'}
      </button>

    </div>
  );
}

export default NoteForm;