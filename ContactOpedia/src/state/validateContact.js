const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Digits plus common separators, e.g. "111-222-3333" or "(21) 8287-4873"
const PHONE_PATTERN = /^[\d\s()+.-]{7,}$/;

export function normalizeContact(contact) {
  return {
    ...contact,
    name: contact.name.trim(),
    email: contact.email.trim(),
    phone: contact.phone.trim(),
  };
}

// Returns an error message, or null when the contact is valid
export function validateContact({ name, email, phone }) {
  if (!name) return "Name is required.";
  if (!EMAIL_PATTERN.test(email)) return "Enter a valid email address.";
  if (!PHONE_PATTERN.test(phone)) return "Enter a valid phone number.";
  return null;
}

export function isDuplicateContact(contacts, contact) {
  return contacts.some(
    (c) =>
      c.id !== contact.id &&
      c.name.toLowerCase() === contact.name.toLowerCase() &&
      c.phone === contact.phone,
  );
}
