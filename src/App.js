import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
import PlantList from "./Components/PlantList/PlantList";
import Plant from "./Components/Plant/Plant";
import Carousel from "./Components/Carousel/Carousel";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="plants/:id"
            element={
              <>
                <Navbar />
                <Plant />
              </>
            }
          />
          <Route path="/signup" element={<Signup role="buyer" />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Carousel />
                <PlantList />
              </>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
