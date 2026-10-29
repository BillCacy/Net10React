import Header from "./components/layout/Header.jsx";
import Footer from "./components/layout/Footer.jsx";
import ContactIndex from "./components/contacts/ContactIndex.jsx";

export default function App() {
  return (
    <div className="container d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-fill">
        <ContactIndex />
      </main>
      <Footer />
    </div>
  );
}
