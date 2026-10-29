export default function Contact({ contact, onToggleFavorite, onEdit, onDelete }) {
  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(contact.name)}`;

  return (
    <li className="row align-items-center mx-0 mb-2 p-2 rounded-4 border border-secondary">
      <div className="col-2">
        {/* Decorative: the name is right next to it */}
        <img src={avatarUrl} alt="" width={50} height={50} className="rounded" />
      </div>
      <div className="col-6">
        <h3 className="h4 mb-0 text-warning">{contact.name}</h3>
        <div className="text-white-50">
          {contact.email}
          <br />
          {contact.phone}
        </div>
      </div>
      <div className="col-4 text-end">
        <button
          type="button"
          onClick={() => onToggleFavorite(contact.id)}
          aria-label={`Favorite ${contact.name}`}
          aria-pressed={contact.isFavorite}
          className={`btn btn-sm m-1 ${contact.isFavorite ? "btn-warning" : "btn-outline-warning"}`}
        >
          <i className="bi bi-star-fill" aria-hidden="true"></i>
        </button>
        <button
          type="button"
          onClick={() => onEdit(contact)}
          aria-label={`Edit ${contact.name}`}
          className="btn btn-info btn-sm m-1"
        >
          <i className="bi bi-pencil-square" aria-hidden="true"></i>
        </button>
        <button
          type="button"
          onClick={() => onDelete(contact.id)}
          aria-label={`Delete ${contact.name}`}
          className="btn btn-danger btn-sm m-1"
        >
          <i className="bi bi-trash-fill" aria-hidden="true"></i>
        </button>
      </div>
    </li>
  );
}
