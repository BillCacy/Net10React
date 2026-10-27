export default function Students(props) {
  // ui-avatars.com api
  // https://ui-avatars.com/api/?name=John+Doe

  return (
    <div className="container p-4 bg-success my-3 rounded">
      <div className="row border">
        <div className="col-2">
          <img
            src={
              "https://ui-avatars.com/api/?name=" +
              encodeURIComponent(props.fullName)
            }
            alt="Student Avatar"
            style={{ maxWidth: "50px" }}
          />
        </div>
        <div className="col-8">
          Full Name: {props.fullName}
          <br />
          Programming Experience: {props.programmingExperience} years
        </div>
        <div className="col-2">{props.children}</div>
      </div>
    </div>
  );
}
