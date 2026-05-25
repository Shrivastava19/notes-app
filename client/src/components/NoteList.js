function NoteList({ notes, onSelect, onDelete, onEdit }) {
  
  if (notes.length === 0) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '2rem',
        color: '#aaa',
        fontSize: '14px',
        border: '1px dashed #e0e0de',
        borderRadius: '12px'
      }}>
        No notes yet. Create your first one above!
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {notes.map(note => (
        <div
          key={note.id}
          style={{
            background: 'white',
            border: '1px solid #e0e0de',
            borderRadius: '12px',
            padding: '1rem 1.25rem',
          }}
        >
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: '8px',
            marginBottom: '6px'
          }}>
            <span
              onClick={() => onSelect(note)}
              style={{
                fontSize: '15px',
                fontWeight: '500',
                color: '#111',
                cursor: 'pointer'
              }}
            >
              {note.title}
            </span>
            <span style={{
              fontSize: '12px',
              color: '#aaa',
              whiteSpace: 'nowrap'
            }}>
              {note.createdAt}
            </span>
          </div>
          <p
            onClick={() => onSelect(note)}
            style={{
              fontSize: '13px',
              color: '#666',
              lineHeight: '1.5',
              cursor: 'pointer',
              marginBottom: '12px'
            }}
          >
            {note.content.length > 60
              ? note.content.substring(0, 60) + '...'
              : note.content}
          </p>
          <div style={{
            borderTop: '1px solid #f0f0ee',
            paddingTop: '10px',
            display: 'flex',
            gap: '8px'
          }}>
            <button
              onClick={() => onEdit(note)}
              style={{
                background: '#f5f5f3',
                border: '1px solid #e0e0de',
                color: '#333',
                padding: '5px 14px',
                borderRadius: '8px',
                fontSize: '13px',
                cursor: 'pointer',
                fontFamily: 'inherit'
              }}
            >
               Edit
            </button>

            <button
              onClick={() => onDelete(note.id)}
              style={{
                background: '#fcebeb',
                border: 'none',
                color: '#a32d2d',
                padding: '5px 14px',
                borderRadius: '8px',
                fontSize: '13px',
                cursor: 'pointer',
                fontFamily: 'inherit'
              }}
            >
               Delete
            </button>

          </div>
        </div>
      ))}
    </div>
  );
}

export default NoteList;