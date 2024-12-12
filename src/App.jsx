import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserProfile from "./pages/UserProfile";
import Admin from "./pages/Admin";
import Home from "./pages/HomePage";
import Login from "./pages/Login";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <NavBar />

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/admin" element={<Admin />} />
        <Route exact path="/profile" element={<UserProfile />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
      <Footer></Footer>
    </Router>
  );
}

export default App;
