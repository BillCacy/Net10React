import { useState } from "react";
import ContactList from "./ContactList";
import AddContact from "./AddContact";
import { useContacts } from "../../hooks/useContacts";
import AddRandomContact from "./AddRandomContact";

const initialContacts = [
  {
    id: 1,
    name: "Tony Stark",
    email: "ts@av.com",
    phone: "111-222-3333",
    isFavorite: false,
  },
  {
    id: 2,
    name: "Wade Wilson",
    email: "deadpool@fu.com",
    phone: "111-222-3334",
    isFavorite: true,
  },
  {
    id: 3,
    name: "Peter Parker",
    email: "spiderman@webslinger.com",
    phone: "111-222-3335",
    isFavorite: true,
  },
];

function ContactIndex() {
  const {
    contacts,
    add,
    addRandomContact,
    update,
    remove,
    toggleFavorite,
    clear,
  } = useContacts(initialContacts);

  const [selectedContact, setSelectedContact] = useState(null);
  // Lives here because AddContact remounts (and loses its own state) after an update
  const [updateMessage, setUpdateMessage] = useState(null);

  function handleUpdateClick(contact) {
    setUpdateMessage(null);
    setSelectedContact(contact);
  }

  function handleUpdateContact(contact) {
    const response = update(contact);
    if (response.status === "success") {
      setUpdateMessage(response.msg);
      setSelectedContact(null);
    }
    return response;
  }

  function handleCancelUpdateContact() {
    setUpdateMessage(null);
    setSelectedContact(null);
  }

  function handleToggleFavorite(contact) {
    toggleFavorite(contact.id);
  }

  function handleDeleteContact(contactId) {
    // Leave update mode if the contact being edited is deleted
    if (selectedContact?.id === contactId) {
      setSelectedContact(null);
    }
    remove(contactId);
  }

  function handleRemoveAllContacts() {
    setSelectedContact(null);
    clear();
  }

  function handleAddRandomContact(randomContact) {
    addRandomContact(randomContact);
  }

  return (
    <div className="container" style={{ minHeight: "85vh" }}>
      <div className="py-3">
        <div className="row py-2">
          <div className="col-6">
            <AddRandomContact onAddRandomContact={handleAddRandomContact} />
          </div>
          <div className="col-6">
            <button
              className="btn btn-danger form-control"
              onClick={handleRemoveAllContacts}
            >
              Remove All
            </button>
          </div>
        </div>
        <div className="py-2">
          <div className="col-12">
            <AddContact
              key={selectedContact?.id ?? "new"}
              handleAddContact={add}
              handleCancelUpdateContact={handleCancelUpdateContact}
              selectedContact={selectedContact}
              initialMessage={updateMessage}
              handleUpdateContact={handleUpdateContact}
            />
          </div>
        </div>
        <div className="py-2">
          <div className="col-12">
            <ContactList
              title="Favorites"
              contacts={contacts.filter((u) => u.isFavorite)}
              onToggleFavorite={handleToggleFavorite}
              onDelete={handleDeleteContact}
              onEdit={handleUpdateClick}
            />
          </div>
        </div>
        <div className="py-2">
          <div className="col-12">
            <ContactList
              title="General"
              contacts={contacts.filter((u) => !u.isFavorite)}
              onToggleFavorite={handleToggleFavorite}
              onDelete={handleDeleteContact}
              onEdit={handleUpdateClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactIndex;
