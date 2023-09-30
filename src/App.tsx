import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProjectsList from "./components/projects/ProjectsList";
import TestsList from "./components/tests/TestsList";
import CodesList from "./components/codes/CodesList";
import SideMenu from "./components/sidebar/Sidebar";
import "./App.css";

function App() {
  return (
    <>
      <SideMenu />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/projects" element={<ProjectsList />} />
        <Route path="/projects/:projectID" element={<TestsList />} />
        <Route
          path="/projects/:projectID/tests/:testID"
          element={<CodesList />}
        />
      </Routes>
    </>
  );
}

export default App;
