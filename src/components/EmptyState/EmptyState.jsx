function EmptyState({ title, text }) {
  return (
    <div className="text-center text-secondary border rounded bg-body py-5 px-3">
      <div className="fw-semibold mb-1">{title}</div>
      {text && <div className="small">{text}</div>}
    </div>
  );
}

export default EmptyState;
