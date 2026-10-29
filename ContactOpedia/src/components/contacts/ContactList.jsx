import { useId } from "react";
import Contact from "./Contact.jsx";

export default function ContactList({
  title,
  contacts,
  onToggleFavorite,
  onDelete,
  onEdit,
}) {
  const headingId = useId();

  return (
    <section
      aria-labelledby={headingId}
      className="p-2 rounded-3 bg-body-tertiary"
    >
      <h2 id={headingId} className="h6 text-center text-white-50">
        {title}
      </h2>
      {contacts.length === 0 ? (
        <p className="text-center text-white-50 small mb-0">No contacts.</p>
      ) : (
        <ul className="list-unstyled p-2 mb-0">
          {contacts.map((contact) => (
            <Contact
              key={contact.id}
              contact={contact}
              onToggleFavorite={onToggleFavorite}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </ul>
      )}
    </section>
  );
}
