import "./styles/global.scss";
import { ContactForm } from "./components/ContactForm";
import contact_image from "./img/contact.svg";

function App() {
  return (
    <div className="app-wrapper">
      <div className="logo">
        <img src={contact_image} alt="contact us"></img>
      </div>
      <div>
        <ContactForm />
      </div>
    </div>
  );
}

export default App;
