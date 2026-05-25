function NoteDetail({ note }) {
  return (
    <div>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
      <small>Created: {note.createdAt}</small>
    </div>
  );
}
export default NoteDetail;