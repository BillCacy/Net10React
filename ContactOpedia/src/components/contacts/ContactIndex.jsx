import { useState } from "react";
import AddContact from "./AddContact.jsx";
import AddRandomContact from "./AddRandomContact.jsx";
import ContactList from "./ContactList.jsx";
import { useContacts } from "../../hooks/useContacts.js";
import { initialContacts } from "../../data/initialContacts.js";

export default function ContactIndex() {
  const { contacts, add, update, remove, toggleFavorite, clear } =
    useContacts(initialContacts);

  const [selectedContact, setSelectedContact] = useState(null);
  // Lives here because AddContact remounts (and loses its own state) after an update
  const [updateMessage, setUpdateMessage] = useState(null);

  function handleEdit(contact) {
    setUpdateMessage(null);
    setSelectedContact(contact);
  }

  function handleUpdate(contact) {
    const response = update(contact);
    if (response.status === "success") {
      setUpdateMessage({ type: "success", text: response.msg });
      setSelectedContact(null);
    }
    return response;
  }

  function handleCancelUpdate() {
    setUpdateMessage(null);
    setSelectedContact(null);
  }

  function handleDelete(contactId) {
    // Leave update mode if the contact being edited is deleted
    if (selectedContact?.id === contactId) {
      setSelectedContact(null);
    }
    remove(contactId);
  }

  function handleRemoveAll() {
    if (!window.confirm("Remove all contacts?")) return;
    setSelectedContact(null);
    clear();
  }

  const favorites = contacts.filter((c) => c.isFavorite);
  const others = contacts.filter((c) => !c.isFavorite);

  return (
    <div className="py-3">
      <div className="row g-2 mb-3">
        <div className="col-6">
          <AddRandomContact onAdd={add} />
        </div>
        <div className="col-6">
          <button
            type="button"
            className="btn btn-danger w-100"
            onClick={handleRemoveAll}
            disabled={contacts.length === 0}
          >
            Remove All
          </button>
        </div>
      </div>
      <div className="mb-3">
        <AddContact
          key={selectedContact?.id ?? "new"}
          selectedContact={selectedContact}
          initialMessage={updateMessage}
          onAdd={add}
          onUpdate={handleUpdate}
          onCancel={handleCancelUpdate}
        />
      </div>
      <div className="mb-3">
        <ContactList
          title="Favorites"
          contacts={favorites}
          onToggleFavorite={toggleFavorite}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </div>
      <ContactList
        title="General"
        contacts={others}
        onToggleFavorite={toggleFavorite}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </div>
  );
}
