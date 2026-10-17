const ProjectGrid = document.querySelector(".ProjectGrid");
const NewProjectButton = document.querySelector(".SearchBarButton");

function AddProjectCard(Project) {
  const ProjectCard = document.createElement("a");
  ProjectCard.className = "ProjectCard";
  ProjectCard.href = "/Html/Studio.html?ProjectId=" + Project.Id;

  ProjectCard.innerHTML = `
    <img class="ProjectIcon" src="/Api/Images/${((Project.Id - 1) % 10) + 1}">
    <div class="ProjectInfo">
      <span class="ProjectName">${Project.Name}</span>
      <span class="ProjectCreator"><i class="fa-solid fa-user"></i> ${Project.CreatorName}</span>
    </div>
  `;

  ProjectGrid.appendChild(ProjectCard);
}

NewProjectButton.addEventListener("click", () => {
  const Projects = JSON.parse(localStorage.getItem("Projects") || "[]");

  const NewProject = {
    Id: Projects.length + 1,
    Name: "New Project",
    CreatorName: "kindtracker",
    CreatorId: 1,
  };
  Projects.push(NewProject);

  localStorage.setItem("Projects", JSON.stringify(Projects));
  InitializeProjectGrid();
});

function InitializeProjectGrid() {
  ProjectGrid.replaceChildren();
  const Projects = JSON.parse(localStorage.getItem("Projects") || "[]");

  for (const Project of Projects) {
    AddProjectCard(Project);
  }
}

InitializeProjectGrid();
