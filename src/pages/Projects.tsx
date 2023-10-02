import ProjectList from "../components/projects/ProjectsList";

function Projects() {
  return (
    <div className="container">
      <section className="projects section">
        <h1 className="section__title">Your Projects</h1>

        <ProjectList />
      </section>
    </div>
  );
}

export default Projects;
