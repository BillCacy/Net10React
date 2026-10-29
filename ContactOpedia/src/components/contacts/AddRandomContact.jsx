import { useState } from "react";
import { fetchRandomContact } from "../../api/randomUser.js";

export default function AddRandomContact({ onAdd }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleClick() {
    setIsLoading(true);
    setError(null);

    try {
      const contact = await fetchRandomContact();
      const response = onAdd(contact);
      if (response.status !== "success") {
        setError(response.msg);
      }
    } catch {
      setError("Could not load a random contact. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <button
        type="button"
        className="btn btn-success w-100"
        onClick={handleClick}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Add Random Contact"}
      </button>
      {error && (
        <div role="alert" className="text-danger small mt-1">
          {error}
        </div>
      )}
    </>
  );
}
