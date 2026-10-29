import { useId, useState } from "react";

const EMPTY_FORM = { name: "", email: "", phone: "" };

const FIELDS = [
  { name: "name", label: "Name", type: "text", autoComplete: "name" },
  { name: "email", label: "Email", type: "email", autoComplete: "email" },
  { name: "phone", label: "Phone", type: "tel", autoComplete: "tel" },
];

export default function AddContact({
  selectedContact,
  initialMessage,
  onAdd,
  onUpdate,
  onCancel,
}) {
  const isUpdating = selectedContact != null;
  const idPrefix = useId();

  // The parent remounts this form (key change) when selectedContact changes,
  // so reading props into initial state here is safe
  const [formData, setFormData] = useState(() =>
    isUpdating
      ? {
          name: selectedContact.name,
          email: selectedContact.email,
          phone: selectedContact.phone,
        }
      : EMPTY_FORM,
  );
  const [message, setMessage] = useState(initialMessage);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (isUpdating) {
      // Only send the edited fields, so a favorite toggled while this form
      // was open isn't overwritten. On success the parent clears
      // selectedContact and passes the message back in via initialMessage.
      const response = onUpdate({ id: selectedContact.id, ...formData });
      if (response.status !== "success") {
        setMessage({ type: "error", text: response.msg });
      }
      return;
    }

    const response = onAdd(formData);
    if (response.status === "success") {
      setFormData(EMPTY_FORM);
      setMessage({ type: "success", text: response.msg });
    } else {
      setMessage({ type: "error", text: response.msg });
    }
  }

  const title = isUpdating ? "Update Contact" : "Add a new Contact";

  return (
    <form
      onSubmit={handleSubmit}
      aria-label={title}
      className="border rounded-3 p-2"
    >
      <div className="row g-2 p-2">
        <div className="col-12 text-white-50 text-center h5">{title}</div>
        {FIELDS.map((field) => (
          <div key={field.name} className="col-12 col-md-4">
            <label
              htmlFor={`${idPrefix}-${field.name}`}
              className="visually-hidden"
            >
              {field.label}
            </label>
            <input
              id={`${idPrefix}-${field.name}`}
              name={field.name}
              type={field.type}
              autoComplete={field.autoComplete}
              placeholder={`${field.label}...`}
              value={formData[field.name]}
              onChange={handleChange}
              required
              className="form-control form-control-sm"
            />
          </div>
        ))}
        {message && (
          <div
            role={message.type === "error" ? "alert" : "status"}
            className={`col-12 text-center ${message.type === "error" ? "text-danger" : "text-success"}`}
          >
            {message.text}
          </div>
        )}
        <div className={isUpdating ? "col-6" : "col-12"}>
          <button type="submit" className="btn btn-primary btn-sm w-100">
            {isUpdating ? "Update Contact" : "Create Contact"}
          </button>
        </div>
        {isUpdating && (
          <div className="col-6">
            <button
              type="button"
              onClick={onCancel}
              className="btn btn-danger btn-sm w-100"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </form>
  );
}
