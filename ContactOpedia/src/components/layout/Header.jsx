import logo from "../../assets/react.png";

export default function Header() {
  return (
    <header className="d-flex align-items-center py-2 ps-2 border-bottom">
      <img src={logo} alt="" height={35} />
      <h1 className="h2 m-2 text-white-50">ContactOpedia</h1>
    </header>
  );
}
