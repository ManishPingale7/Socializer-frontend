import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import Home from "./pages/HomePage";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import ProfileForm from "./pages/ProfileForm";
import { useEffect, useState } from "react";
import { SearchProvider } from "./searchContext";

function App() {
  const [isLogged, setIsLogged] = useState(true);

  const checkStatus = () => {
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");
    if (!username || !password) return false;
    return true;
  };
  useEffect(() => {
    setIsLogged(checkStatus());
  }, []);

  return (
    <SearchProvider>
      <Router>
        <NavBar isLogged={isLogged} setIsLogged={setIsLogged} />

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/admin" element={<Admin isLogged={isLogged} />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/profiles/:id" element={<Profile />} />
          <Route
            exact
            path="/login"
            element={<Login setIsLogged={setIsLogged} />}
          />
          :
          <Route exact path="/register" element={<ProfileForm />} />
          <Route exact path="/edit/:id" element={<ProfileForm />} />
        </Routes>
        <Footer></Footer>
      </Router>
    </SearchProvider>
  );
}

export default App;
