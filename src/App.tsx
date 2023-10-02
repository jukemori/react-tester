import { Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./pages/login/Login";
import Projects from "./pages/Projects";
import Tests from "./pages/Tests";
import Codes from "./pages/Codes";
import SideMenu from "./components/sidemenu/SideMenu";
import "./App.css";

function App() {
  return (
    <>
      <SideMenu />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:projectID" element={<Tests />} />
        <Route path="/projects/:projectID/tests/:testID" element={<Codes />} />
      </Routes>
    </>
  );
}

export default App;
