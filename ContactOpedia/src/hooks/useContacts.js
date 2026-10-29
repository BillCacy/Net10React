import { useEffect, useReducer } from "react";
import { contactsReducer } from "../state/contactsReducer";
import {
  isDuplicateContact,
  normalizeContact,
  validateContact,
} from "../state/validateContact";

export const STORAGE_KEY = "contactopedia.contacts";

function loadContacts(fallback) {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    // Storage blocked or data corrupted: start from the seed data
    return fallback;
  }
}

export function useContacts(initialContacts) {
  // Third argument is a lazy initializer: it runs once, not on every render
  const [contacts, dispatch] = useReducer(
    contactsReducer,
    initialContacts,
    loadContacts,
  );

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
    } catch {
      // Saving is best effort; the app still works in memory
    }
  }, [contacts]);

  function checkContact(contact) {
    const error = validateContact(contact);
    if (error) return error;
    if (isDuplicateContact(contacts, contact)) return "Duplicate record.";
    return null;
  }

  function add(contact) {
    const newContact = {
      ...normalizeContact(contact),
      // Generate the id here, not in the reducer, so the reducer stays pure
      id: crypto.randomUUID(),
      isFavorite: false,
    };

    const error = checkContact(newContact);
    if (error) return { status: "error", msg: error };

    dispatch({ type: "add", contact: newContact });
    return { status: "success", msg: "Contact was added." };
  }

  function update(contact) {
    const changes = normalizeContact(contact);

    const error = checkContact(changes);
    if (error) return { status: "error", msg: error };

    dispatch({ type: "update", contact: changes });
    return { status: "success", msg: "Contact was updated." };
  }

  return {
    contacts,
    add,
    update,
    remove: (id) => dispatch({ type: "remove", id }),
    toggleFavorite: (id) => dispatch({ type: "toggleFavorite", id }),
    clear: () => dispatch({ type: "clear" }),
  };
}
