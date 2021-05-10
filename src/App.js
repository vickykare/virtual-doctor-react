import { Container } from "react-bootstrap";
import DiseaseInput from "./components/DiseaseInput";
import Footer from "./components/Footer";
import Header from "./components/Header";
import "./styles/main.css";
function App() {
  return (
    <div className="App">
      <Header />
      <div className="main-body">
        <Container>
          <DiseaseInput />
        </Container>
      </div>
      <Footer />
    </div>
  );
}

export default App;
