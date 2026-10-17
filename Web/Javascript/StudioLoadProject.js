const UrlParams = new URLSearchParams(window.location.search);
const ProjectId = UrlParams.get("ProjectId");
if (!ProjectId) {
  location = "/Html/Home.html";
}

const Projects = JSON.parse(localStorage.getItem("Projects") || "[]");
const ProjectMetadata = Projects[ProjectId - 1];
if (!ProjectMetadata) {
  location = "/Html/Home.html";
}

document.title = `Nyra - ${ProjectMetadata.Name}`;
const ProjectNameElement = document.querySelector("#ProjectName");
ProjectNameElement.innerHTML = ProjectMetadata.Name;

const Explorer = window.Explorer;

function SerializeExplorerFile(File) {
  return {
    Name: File.Name,
    ClassName: File.ClassName,
    IsFolder: File.IsFolder,
    Expanded: File.Expanded,
    InstanceProperties: File.InstanceProperties,
    Children: File.Children.map(SerializeExplorerFile),
  };
}

function RestoreExplorerFile(File, Parent = null) {
  const Item = Explorer.CreateFile(
    File.Name,
    File.ClassName,
    File.IsFolder,
    Parent,
  );
  Item.Expanded = File.Expanded;
  Item.InstanceProperties = File.InstanceProperties;

  for (const Child of File.Children || []) {
    RestoreExplorerFile(Child, Item);
  }
}

function SaveProject() {
  if (!ProjectId) return;

  const Project = Explorer.Items.map(SerializeExplorerFile);
  localStorage.setItem(`Project${ProjectId}`, JSON.stringify(Project));
}

function LoadProject() {
  const Project = localStorage.getItem(`Project${ProjectId}`);
  if (!Project) return;

  const ExplorerData = JSON.parse(Project);

  for (const File of ExplorerData) {
    RestoreExplorerFile(File);
  }

  Explorer.Render();
}

console.log(ProjectId);
LoadProject();

window.LoadProject = LoadProject;
window.SaveProject = SaveProject;
