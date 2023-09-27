import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProjectsList from "./pages/ProjectsList";
import TestsList from "./pages/TestsList";

function App() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Login />} />
      <Route path="/projects" element={<ProjectsList />} />
      <Route path="/projects/:id" element={<TestsList />} />
    </Routes>
  );
}

export default App;
