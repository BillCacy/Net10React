import Contact from "./Contact.jsx";

export default function ContactList({
  title,
  contacts,
  onToggleFavorite,
  onDelete,
  onEdit,
}) {
  return (
    <div
      className="col-12 p-2"
      style={{ borderRadius: "10px", backgroundColor: "#323637" }}
    >
      <div className="text-center text-white-50">{title}</div>
      <div className="p-2">
        {contacts.map((contact) => (
          <Contact
            key={contact.id}
            contact={contact}
            favoriteClick={onToggleFavorite}
            deleteContact={onDelete}
            handleUpdateClick={onEdit}
          ></Contact>
        ))}
      </div>
    </div>
  );
}
