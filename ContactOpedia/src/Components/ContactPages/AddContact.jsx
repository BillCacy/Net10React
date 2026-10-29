import { useState } from "react";

function AddContact(props) {
  // The form remounts after an update (key change), so the parent passes
  // the update result back in as the initial message
  const [messages, setMessages] = useState({
    errorMessage: "",
    successMessage: props.initialMessage ?? "",
  });

  // Controlled component state
  const [formData, setFormData] = useState({
    name: props.selectedContact?.name ?? "",
    email: props.selectedContact?.email ?? "",
    phone: props.selectedContact?.phone ?? "",
  });

  function handleFormInputChange(e) {
    const { name, value } = e.target;

    console.log(name, value);
    setFormData({ ...formData, [name]: value });
  }
  // End Controlled Component

  const isUpdating = props.selectedContact != null;

  function handleAddContactForm(formData) {
    const contactData = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
    };

    try {
      if (isUpdating) {
        // On success the parent clears selectedContact, which remounts this
        // form; the success message comes back via props.initialMessage
        const response = props.handleUpdateContact({
          id: props.selectedContact.id,
          isFavorite: props.selectedContact.isFavorite,
          ...contactData,
        });

        if (response.status !== "success") {
          setMessages({
            errorMessage: response.msg,
            successMessage: undefined,
          });
        }
      } else {
        const response = props.handleAddContact(contactData);

        if (response.status === "success") {
          setMessages({
            errorMessage: undefined,
            successMessage: response.msg,
          });
          setFormData({ name: "", email: "", phone: "" });
        } else {
          setMessages({
            errorMessage: response.msg,
            successMessage: undefined,
          });
        }
      }
    } catch {
      setMessages({
        errorMessage: "Error encountered",
        successMessage: undefined,
      });
    }
  }

  return (
    <div className="border col-12 text-white p-2">
      <form action={handleAddContactForm}>
        <div className="row p-2">
          <div className="col-12 text-white-50 text-center h5">
            {isUpdating ? "Update Contact" : "Add a new Contact"}
          </div>
          <div className="col-12 col-md-4 p-1">
            <input
              placeholder="Name..."
              name="name"
              value={formData.name}
              onChange={handleFormInputChange}
              className="form-control form-control-sm"
            />
          </div>
          <div className="col-12 col-md-4 p-1">
            <input
              placeholder="Email..."
              name="email"
              value={formData.email}
              onChange={handleFormInputChange}
              className="form-control form-control-sm"
            />
          </div>
          <div className="col-12 col-md-4 p-1">
            <input
              placeholder="Phone..."
              name="phone"
              value={formData.phone}
              onChange={handleFormInputChange}
              className="form-control form-control-sm"
            />
          </div>
          {messages.successMessage && (
            <div className="col-12 text-center text-success">
              {messages.successMessage}
            </div>
          )}
          {messages.errorMessage && (
            <div className="col-12 text-center text-danger">
              {messages.errorMessage}
            </div>
          )}
          <div className={`${isUpdating ? "col-6" : "col-12"}`}>
            <button className="btn btn-primary btn-sm form-control">
              {isUpdating ? "Update Contact" : "Create Contact"}
            </button>
          </div>
          {isUpdating && (
            <div className="col-6">
              <button
                type="button"
                onClick={() => props.handleCancelUpdateContact()}
                className="btn btn-danger btn-sm form-control"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export default AddContact;
