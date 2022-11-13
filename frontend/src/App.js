import Home from "./pages/Home";
import Login from "./pages/Login";
import "./index.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/SignUp";
import BookUpload from "./pages/BookUpload";
import { useAuthContext } from "./hooks/useAuthContext";

const App = () => {
  const { user } = useAuthContext();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={!user ? <Login /> : <BookUpload />} />
        <Route path="/signup" element={!user ? <SignUp /> : <Home />} />
        <Route path="/upload" element={user ? <BookUpload /> : <Login />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

