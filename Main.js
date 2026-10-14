const Explorer = document.querySelector(".ExplorerChildren");
const PropertiesTable = document.querySelector(".PropertiesTable");
const PropertiesSearch = document.querySelector(".SearchBarInput");

let SelectedExplorerFile = null;

const PropertyDefinitions = [
  {
    Name: "Data",
    Properties: [
      {
        Name: "Name",
        Editable: true,
        Get: (File) => File.InstanceProperties.Name,
        Set: (File, Value) => {
          File.InstanceProperties.Name = Value;
          File.dataset.name = Value;

          const Label = File.querySelector(":scope > span");
          if (Label) Label.textContent = Value;
        },
      },
      {
        Name: "ClassName",
        Editable: false,
        Get: (File) => File.InstanceProperties.ClassName,
      },
      {
        Name: "Parent",
        Editable: false,
        Get: (File) => {
          const Parent = File.parentElement.closest(".ExplorerFile");
          return Parent?.InstanceProperties.Name ?? "nil";
        },
      },
    ],
  },
  {
    Name: "Behavior",
    Properties: [
      {
        Name: "Archivable",
        Editable: true,
        Type: "checkbox",
        Get: (File) => File.InstanceProperties.Archivable,
        Set: (File, Value) => {
          File.InstanceProperties.Archivable = Value;
        },
      },
    ],
  },
  {
    Name: "Attributes",
    Properties: [
      {
        Name: "Attributes",
        Editable: false,
        Get: (File) =>
          Object.keys(File.InstanceProperties.Attributes ?? {}).length,
      },
    ],
  },
  {
    Name: "Transform",
    Properties: [
      {
        Name: "Position",
        Editable: true,
        Get: (File) => File.InstanceProperties.Position ?? "0, 0, 0",
        Set: (File, Value) => {
          File.InstanceProperties.Position = Value;
        },
      },
      {
        Name: "Rotation",
        Editable: true,
        Get: (File) => File.InstanceProperties.Rotation ?? "0, 0, 0",
        Set: (File, Value) => {
          File.InstanceProperties.Rotation = Value;
        },
      },
      {
        Name: "Size",
        Editable: true,
        Get: (File) => File.InstanceProperties.Size ?? "4, 1, 2",
        Set: (File, Value) => {
          File.InstanceProperties.Size = Value;
        },
      },
    ],
  },
  {
    Name: "Appearance",
    Properties: [
      {
        Name: "Transparency",
        Editable: true,
        Get: (File) => File.InstanceProperties.Transparency ?? 0,
        Set: (File, Value) => {
          File.InstanceProperties.Transparency = Value;
        },
      },
      {
        Name: "Reflectance",
        Editable: true,
        Get: (File) => File.InstanceProperties.Reflectance ?? 0,
        Set: (File, Value) => {
          File.InstanceProperties.Reflectance = Value;
        },
      },
      {
        Name: "Color",
        Editable: true,
        Get: (File) => File.InstanceProperties.Color ?? "163, 162, 165",
        Set: (File, Value) => {
          File.InstanceProperties.Color = Value;
        },
      },
      {
        Name: "Material",
        Editable: true,
        Get: (File) => File.InstanceProperties.Material ?? "Plastic",
        Set: (File, Value) => {
          File.InstanceProperties.Material = Value;
        },
      },
    ],
  },
  {
    Name: "Physics",
    Properties: [
      {
        Name: "Anchored",
        Editable: true,
        Type: "checkbox",
        Get: (File) => File.InstanceProperties.Anchored ?? false,
        Set: (File, Value) => {
          File.InstanceProperties.Anchored = Value;
        },
      },
      {
        Name: "CanCollide",
        Editable: true,
        Type: "checkbox",
        Get: (File) => File.InstanceProperties.CanCollide ?? true,
        Set: (File, Value) => {
          File.InstanceProperties.CanCollide = Value;
        },
      },
      {
        Name: "CanTouch",
        Editable: true,
        Type: "checkbox",
        Get: (File) => File.InstanceProperties.CanTouch ?? true,
        Set: (File, Value) => {
          File.InstanceProperties.CanTouch = Value;
        },
      },
      {
        Name: "CanQuery",
        Editable: true,
        Type: "checkbox",
        Get: (File) => File.InstanceProperties.CanQuery ?? true,
        Set: (File, Value) => {
          File.InstanceProperties.CanQuery = Value;
        },
      },
      {
        Name: "Massless",
        Editable: true,
        Type: "checkbox",
        Get: (File) => File.InstanceProperties.Massless ?? false,
        Set: (File, Value) => {
          File.InstanceProperties.Massless = Value;
        },
      },
    ],
  },
  {
    Name: "Part",
    Properties: [
      {
        Name: "Shape",
        Editable: true,
        Get: (File) => File.InstanceProperties.Shape ?? "Block",
        Set: (File, Value) => {
          File.InstanceProperties.Shape = Value;
        },
      },
      {
        Name: "CastShadow",
        Editable: true,
        Type: "checkbox",
        Get: (File) => File.InstanceProperties.CastShadow ?? true,
        Set: (File, Value) => {
          File.InstanceProperties.CastShadow = Value;
        },
      },
    ],
  },
  {
    Name: "Lighting",
    Properties: [
      {
        Name: "Brightness",
        Editable: true,
        Get: (File) => File.InstanceProperties.Brightness ?? 1,
        Set: (File, Value) => {
          File.InstanceProperties.Brightness = Value;
        },
      },
      {
        Name: "Enabled",
        Editable: true,
        Type: "checkbox",
        Get: (File) => File.InstanceProperties.Enabled ?? true,
        Set: (File, Value) => {
          File.InstanceProperties.Enabled = Value;
        },
      },
    ],
  },
];

function CreateExplorerFile(Name, ClassName, Parent) {
  const ExplorerFile = document.createElement("div");
  ExplorerFile.className = "ExplorerFile";
  ExplorerFile.dataset.Name = Name;

  const CollapseText = document.createElement("div");
  CollapseText.className = "ExplorerFileCollapse";
  CollapseText.textContent = ">";

  const Icon = document.createElement("img");
  Icon.className = "ExplorerFileIcon";
  Icon.src = "RobloxIcons/Unknown.png";

  const Label = document.createElement("span");
  Label.textContent = Name;

  const Children = document.createElement("div");
  Children.className = "ExplorerFileChildren";
  Children.hidden = true;

  ExplorerFile.append(CollapseText, Icon, Label, Children);

  if (Parent) {
    Parent.querySelector(":scope > .ExplorerFileChildren").appendChild(
      ExplorerFile,
    );
  } else {
    Explorer.appendChild(ExplorerFile);
  }

  ExplorerFile.InstanceProperties = {
    Name,
    ClassName,
    Archivable: true,
  };

  ExplorerFile.addEventListener("click", (Event) => {
    Event.stopPropagation();

    const IsExpanded = CollapseText.textContent === "v";

    CollapseText.textContent = IsExpanded ? ">" : "v";
    Children.hidden = IsExpanded;

    SelectExplorerFile(ExplorerFile);
  });

  const IconPath = `RobloxIcons/${ClassName}.png`;

  fetch(IconPath, { method: "HEAD" }).then((Response) => {
    if (Response.ok) {
      Icon.src = IconPath;
    }
  });

  return ExplorerFile;
}

function SelectExplorerFile(File) {
  SelectedExplorerFile = File;

  document.querySelectorAll(".ExplorerFile").forEach((Item) => {
    Item.classList.toggle("selected", Item === File);
  });

  RenderProperties();
}

function RenderProperties() {
  PropertiesTable.replaceChildren();

  if (!SelectedExplorerFile) {
    const Empty = document.createElement("div");
    Empty.className = "PropertyEmpty";
    Empty.textContent = "Select an instance to view its properties.";
    PropertiesTable.appendChild(Empty);
    return;
  }

  const Query = PropertiesSearch.value.trim().toLowerCase();
  let VisibleProperties = 0;

  for (const Category of PropertyDefinitions) {
    const MatchingProperties = Category.Properties.filter((Property) => {
      const Value = String(Property.Get(SelectedExplorerFile));

      return (
        Property.Name.toLowerCase().includes(Query) ||
        Value.toLowerCase().includes(Query) ||
        Category.Name.toLowerCase().includes(Query)
      );
    });

    if (MatchingProperties.length === 0) continue;

    const Section = document.createElement("div");
    Section.className = "Property";

    const Header = document.createElement("div");
    Header.className = "PropertyCategory";

    const Arrow = document.createElement("span");
    Arrow.className = "PropertyCategoryArrow";
    Arrow.textContent = "v";

    const Title = document.createElement("span");
    Title.textContent = Category.Name;

    const Rows = document.createElement("div");
    Rows.className = "PropertyCategoryRows";

    Header.append(Arrow, Title);
    Section.append(Header, Rows);
    PropertiesTable.appendChild(Section);

    Header.addEventListener("click", () => {
      const Collapsed = Rows.hidden;

      Rows.hidden = !Collapsed;
      Arrow.textContent = Collapsed ? "v" : ">";
    });

    for (const Property of MatchingProperties) {
      const Row = document.createElement("div");
      Row.className = "PropertyRow";

      const Name = document.createElement("div");
      Name.className = "PropertyName";
      Name.textContent = Property.Name;
      Name.title = Property.Name;

      const Value = document.createElement("input");
      Value.className = "PropertyValue";

      if (Property.Type === "checkbox") {
        Value.type = "checkbox";
        Value.checked = Boolean(Property.Get(SelectedExplorerFile));
      } else {
        Value.type = "text";
        Value.value = String(Property.Get(SelectedExplorerFile) ?? "");
        Value.readOnly = !Property.Editable;
      }

      Value.addEventListener("change", () => {
        if (!Property.Editable) return;

        const NewValue =
          Property.Type === "checkbox" ? Value.checked : Value.value;

        Property.Set(SelectedExplorerFile, NewValue);
        RenderProperties();
      });

      Row.append(Name, Value);
      Rows.appendChild(Row);

      VisibleProperties++;
    }
  }

  if (VisibleProperties === 0) {
    const Empty = document.createElement("div");
    Empty.className = "PropertyEmpty";
    Empty.textContent = "No matching properties.";
    PropertiesTable.appendChild(Empty);
  }
}

function InitializePanelDragging() {
  document.querySelectorAll(".PanelDragHandle").forEach((Handle) => {
    Handle.addEventListener("pointerdown", (Event) => {
      const Panel = Handle.closest(".Explorer, .Properties, .ToolBar");

      if (Event.button !== 0 || !Panel) return;

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
}

function InitializeExplorer() {
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

  for (let Index = 0; Index < 7; Index++) {
    CreateExplorerFile("kindtracker", "Player", Players);
  }
}

PropertiesSearch.addEventListener("input", RenderProperties);

InitializePanelDragging();
InitializeExplorer();
