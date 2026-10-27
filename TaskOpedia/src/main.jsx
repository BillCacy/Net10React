import { createRoot } from "react-dom/client";
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Layout/Header.jsx";
import Footer from "./Layout/Footer.jsx";
import Students from "./Components/Students.jsx";
import StudentReview from "./Components/StudentReview.jsx";

const root = createRoot(document.getElementById("root"));
const course = "React JS";
const lectureCount = 11;
const isActive = true;

const pageStyle = {
  textAlign: "center",
  marginTop: "50px",
  backgroundColor: "#f0f0f0",
  padding: "20px",
};

function HomePage() {
  return (
    <div>
      <Header />
      <p className="customHeading">Hello World!</p>
      <h3>Topics in the {course} Course</h3>
      <p>Lecture Count - {lectureCount}</p>
      <p>Is Active - {isActive.toString()}</p>
      <p>Is Active - {isActive ? "Active" : "Inactive"}</p>
      <ul>
        <li>JSX</li>
        <li>Components</li>
        <li>Routing</li>
        <li>State Management</li>
      </ul>
      <div>
        Enter Task : <input type="text" placeholder="Enter Task" />
      </div>
      <hr />
      <h5>Students Enrolled</h5>
      <Students fullName="John Doe" programmingExperience={5}>
        <StudentReview />
      </Students>
      <Students fullName="Jane Smith" programmingExperience={3} />
      <Students fullName="Bob Brown" programmingExperience={4} />
      <Footer />
    </div>
  );
}

root.render(
  <>
    <HomePage />
  </>,
);

// // Declarative approach to render a React component into the root element
// // Condensed version of the above code
// createRoot(document.getElementById("root")).render(<HomePage />);

// // Javascript implementation of the above code
// // Imperative approach to create a div element and append it to the root element
// const rootElement = document.getElementById("root");
// const divElement = document.createElement("div");
// divElement.textContent = "Hello World!";
// rootElement.appendChild(divElement);
