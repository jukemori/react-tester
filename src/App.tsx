import { Routes, Route } from "react-router-dom";
import ProjectsList from "./pages/ProjectsList";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ProjectsList />} />
    </Routes>
  );
}

export default App;
