const Explorer = document.querySelector(".Explorer");

function CreateExplorerFile(Name) {
  const IconPath = `RobloxIcons/${Name}.png`;

  const ExplorerFile = document.createElement("div");
  ExplorerFile.className = "ExplorerFile";

  const Icon = document.createElement("img");
  Icon.className = "ExplorerFileIcon";
  Icon.src = "RobloxIcons/Unknown.png";
  Icon.alt = "";
  ExplorerFile.appendChild(Icon);

  const Label = document.createElement("span");
  Label.textContent = Name;
  ExplorerFile.appendChild(Label);

  document.querySelector(".Explorer").appendChild(ExplorerFile);

  fetch(IconPath, { method: "HEAD" }).then((Response) => {
    if (Response.ok) {
      Icon.src = IconPath;
    }
  });
}

CreateExplorerFile("Workspace");
CreateExplorerFile("Lighting");
CreateExplorerFile("ReplicatedFirst");
CreateExplorerFile("ReplicatedStorage");
CreateExplorerFile("ServerScriptService");
CreateExplorerFile("ServerStorage");
CreateExplorerFile("Players");
CreateExplorerFile("StarterPlayer");
CreateExplorerFile("StarterPack");
CreateExplorerFile("StarterGui");
CreateExplorerFile("CoreGui");
CreateExplorerFile("Chat");
