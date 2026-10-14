const Explorer = document.querySelector(".Explorer");

function CreateExplorerFile(Name, ClassName, Parent) {
  const IconPath = `RobloxIcons/${ClassName}.png`;

  const ExplorerFile = document.createElement("div");
  ExplorerFile.className = "ExplorerFile";
  ExplorerFile.dataset.Name = Name;

  const CollapseText = document.createElement("div");
  CollapseText.className = "ExplorerFileCollapse";
  CollapseText.textContent = ">";
  ExplorerFile.appendChild(CollapseText);

  const Icon = document.createElement("img");
  Icon.className = "ExplorerFileIcon";
  Icon.src = "RobloxIcons/Unknown.png";
  ExplorerFile.appendChild(Icon);

  const Label = document.createElement("span");
  Label.textContent = Name;
  ExplorerFile.appendChild(Label);

  const Children = document.createElement("div");
  Children.className = "ExplorerFileChildren";
  ExplorerFile.appendChild(Children);

  Children.hidden = true;

  if (Parent) {
    Parent.querySelector(":scope > .ExplorerFileChildren").appendChild(
      ExplorerFile,
    );
  } else {
    Explorer.appendChild(ExplorerFile);
  }

  ExplorerFile.addEventListener("click", (Event) => {
    Event.stopPropagation();

    const IsExpanded = CollapseText.textContent === "v";

    CollapseText.textContent = IsExpanded ? ">" : "v";
    Children.hidden = IsExpanded;
  });

  fetch(IconPath, { method: "HEAD" }).then((Response) => {
    if (Response.ok) {
      Icon.src = IconPath;
    }
  });

  return ExplorerFile;
}

const Workspace = CreateExplorerFile("Workspace", "Workspace");
const Lighting = CreateExplorerFile("Lighting", "Lighting");
const ReplicatedFirst = CreateExplorerFile(
  "ReplicatedFirst",
  "ReplicatedFirst",
);
const ReplicatedStorage = CreateExplorerFile(
  "ReplicatedStorage",
  "ReplicatedStorage",
);
const ServerScriptService = CreateExplorerFile(
  "ServerScriptService",
  "ServerScriptService",
);
const ServerStorage = CreateExplorerFile("ServerStorage", "ServerStorage");
const Players = CreateExplorerFile("Players", "Players");
const StarterPlayer = CreateExplorerFile("StarterPlayer", "StarterPlayer");
const StarterPack = CreateExplorerFile("StarterPack", "StarterPack");
const StarterGui = CreateExplorerFile("StarterGui", "StarterGui");
const CoreGui = CreateExplorerFile("CoreGui", "CoreGui");
const Chat = CreateExplorerFile("Chat", "Chat");

CreateExplorerFile("kindtracker", "Player", Players);
CreateExplorerFile("kindtracker", "Player", Players);
CreateExplorerFile("kindtracker", "Player", Players);
CreateExplorerFile("kindtracker", "Player", Players);
CreateExplorerFile("kindtracker", "Player", Players);
CreateExplorerFile("kindtracker", "Player", Players);
CreateExplorerFile("kindtracker", "Player", Players);

document.querySelectorAll(".PanelDragHandle").forEach((Handle) => {
  Handle.addEventListener("pointerdown", (Event) => {
    const Panel = Handle.closest(".Explorer, .ToolBar");

    if (Event.button !== 0) return;

    const StartX = Event.clientX;
    const StartY = Event.clientY;
    const Rect = Panel.getBoundingClientRect();

    const OriginalStyle = {
      position: Panel.style.position,
      left: Panel.style.left,
      top: Panel.style.top,
      margin: Panel.style.margin,
    };

    Panel.style.position = "fixed";
    Panel.style.left = `${Rect.left}px`;
    Panel.style.top = `${Rect.top}px`;
    Panel.style.margin = "0";

    const Move = (Event) => {
      Panel.style.left = `${Rect.left + Event.clientX - StartX}px`;
      Panel.style.top = `${Rect.top + Event.clientY - StartY}px`;
    };

    const Stop = () => {
      document.removeEventListener("pointermove", Move);

      Panel.style.position = OriginalStyle.position;
      Panel.style.left = OriginalStyle.left;
      Panel.style.top = OriginalStyle.top;
      Panel.style.margin = OriginalStyle.margin;
    };

    document.addEventListener("pointermove", Move);
    document.addEventListener("pointerup", Stop, { once: true });
    document.addEventListener("pointercancel", Stop, { once: true });
  });
});
