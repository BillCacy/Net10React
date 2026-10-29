import { useReducer } from "react";

export function useContacts(initial) {
  const [contacts, dispatch] = useReducer(contactsReducer, initial);

  function add(contact) {
    const isDuplicate = contacts.some(
      (x) => x.name === contact.name && x.phone === contact.phone,
    );

    if (isDuplicate) {
      return { status: "error", msg: "Duplicate record." };
    }

    // Generate the id here, not in the reducer, so the reducer stays pure
    dispatch({
      type: "add",
      contact: { ...contact, id: crypto.randomUUID(), isFavorite: false },
    });

    return { status: "success", msg: "Contact was added." };
  }

  function update(contact) {
    dispatch({ type: "update", contact });
    return { status: "success", msg: "Contact was updated." };
  }

  function addRandomContact(randomContact) {
    // random contact comes from api and will need transformed
    dispatch({
      type: "addRandomContact",
      randomContact,
      id: crypto.randomUUID(),
      isFavorite: false,
    });
    return { status: "success", msg: "Contact was added." };
  }

  return {
    contacts,
    add,
    addRandomContact,
    update,
    remove: (id) => dispatch({ type: "remove", id }),
    toggleFavorite: (id) => dispatch({ type: "toggleFavorite", id }),
    clear: () => dispatch({ type: "clear" }),
  };
}

function contactsReducer(state, action) {
  switch (action.type) {
    case "add":
      return [...state, action.contact];

    case "addRandomContact": {
      // Convert api user to contact
      const { randomContact: user, id, isFavorite } = action;
      const contact = {
        id,
        name: `${user.name.first} ${user.name.last}`,
        email: user.email,
        phone: user.phone,
        isFavorite,
      };
      return [...state, contact];
    }

    case "update":
      return state.map((c) =>
        c.id === action.contact.id ? { ...c, ...action.contact } : c,
      );

    case "remove":
      return state.filter((c) => c.id !== action.id);

    case "toggleFavorite":
      return state.map((c) =>
        c.id === action.id ? { ...c, isFavorite: !c.isFavorite } : c,
      );

    case "clear":
      return [];

    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}
