import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import Home from "./pages/HomePage";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import Register from "./pages/Register";

function App() {
  return (
    <Router>
      <NavBar />

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/admin" element={<Admin />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
      </Routes>
      <Footer></Footer>
    </Router>
  );
}

export default App;
