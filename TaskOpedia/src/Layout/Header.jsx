import logo from "../images/react.png";

export default function Header() {
  return (
    <div className="p-1 pt-3">
      <img src={logo} alt="React Logo" style={{ width: "30px" }} />
      <span className="text-success">React Header Component</span>
      <hr />
    </div>
  );
}
