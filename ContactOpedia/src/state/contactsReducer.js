// Pure function: same state + action always gives the same result.
// Anything impure (ids, validation messages, storage) happens in useContacts.
export function contactsReducer(state, action) {
  switch (action.type) {
    case "add":
      return [...state, action.contact];

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
