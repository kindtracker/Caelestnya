const Explorer = document.querySelector(".Explorer");

function CreateExplorerFile(Name) {
  const IconPath = `RobloxIcons/${Name}.png`;
  let IconSrc = "RobloxIcons/Unknown.png";

  fetch(IconPath, { method: "HEAD" })
    .then((Response) => {
      if (Response.ok) {
        IconSrc = IconPath;
      }
    })
    .finally(() => {
      const ExplorerFile = document.createElement("div");
      ExplorerFile.className = "ExplorerFile";

      const Icon = document.createElement("img");
      Icon.className = "ExplorerFileIcon";
      Icon.src = IconSrc;
      Icon.alt = "";
      ExplorerFile.appendChild(Icon);

      const Label = document.createElement("span");
      Label.textContent = Name;
      ExplorerFile.appendChild(Label);

      document.querySelector(".Explorer").appendChild(ExplorerFile);
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
