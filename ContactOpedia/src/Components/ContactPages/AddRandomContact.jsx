import getRandomUser from "../../Utility/api.jsx";

function AddRandomContact({ onAddRandomContact }) {
  const getRandomContact = async () => {
    const response = await getRandomUser();
    if (response && response.results && response.results.length > 0) {
      const user = response.results[0];
      onAddRandomContact(user);
    }
  };

  return (
    <button className="btn btn-success form-control" onClick={getRandomContact}>
      Add Random Contact
    </button>
  );
}

export default AddRandomContact;
