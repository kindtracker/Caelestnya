const ExplorerCanvas = document.querySelector("#ExplorerCanvas");
const ExplorerContext = ExplorerCanvas.getContext("2d");

const ExplorerItems = [];
let SelectedExplorerFile = null;
let HoveredExplorerFile = null;
let ExplorerScroll = 0;
let ExplorerRows = [];

const ExplorerStyle = {
  RowHeight: 22,
  Indent: 16,
  Padding: 8,
  IconSize: 16,
};

const ExplorerColors = () => {
  const Style = getComputedStyle(document.documentElement);

  return {
    Background: Style.getPropertyValue("--Surface0").trim(),
    Hover: Style.getPropertyValue("--Surface1").trim(),
    Selected: Style.getPropertyValue("--Surface2").trim(),
    Text: Style.getPropertyValue("--Text").trim(),
    Muted: Style.getPropertyValue("--Subtext0").trim(),
    Border: Style.getPropertyValue("--Overlay0").trim(),
  };
};

function GetExplorerVisibleItems() {
  const Items = [];

  function Visit(Item, Depth) {
    Items.push({ Item, Depth });

    if (Item.Expanded) {
      for (const Child of Item.Children) {
        Visit(Child, Depth + 1);
      }
    }
  }

  for (const Item of ExplorerItems) {
    Visit(Item, 0);
  }

  return Items;
}

function ResizeExplorerCanvas() {
  const Rect = ExplorerCanvas.getBoundingClientRect();
  const Ratio = window.devicePixelRatio || 1;

  ExplorerCanvas.width = Math.round(Rect.width * Ratio);
  ExplorerCanvas.height = Math.round(Rect.height * Ratio);

  ExplorerContext.setTransform(Ratio, 0, 0, Ratio, 0, 0);
  RenderExplorer();
}

function RenderExplorer() {
  const Context = ExplorerContext;
  const Rect = ExplorerCanvas.getBoundingClientRect();
  const Colors = ExplorerColors();
  const RowHeight = ExplorerStyle.RowHeight;

  Context.clearRect(0, 0, Rect.width, Rect.height);
  Context.fillStyle = Colors.Background;
  Context.fillRect(0, 0, Rect.width, Rect.height);

  ExplorerRows = GetExplorerVisibleItems();

  const ContentHeight = ExplorerRows.length * RowHeight;
  ExplorerScroll = Math.max(
    0,
    Math.min(ExplorerScroll, Math.max(0, ContentHeight - Rect.height)),
  );

  Context.save();
  Context.beginPath();
  Context.rect(0, 0, Rect.width, Rect.height);
  Context.clip();

  Context.font = '15px "Noto Sans", sans-serif';
  Context.textBaseline = "middle";

  const StartIndex = Math.floor(ExplorerScroll / RowHeight);
  const EndIndex = Math.min(
    ExplorerRows.length,
    Math.ceil((ExplorerScroll + Rect.height) / RowHeight),
  );

  for (let Index = StartIndex; Index < EndIndex; Index++) {
    const { Item, Depth } = ExplorerRows[Index];
    const Y = Index * RowHeight - ExplorerScroll;

    if (Item === SelectedExplorerFile) {
      Context.fillStyle = Colors.Selected;
      Context.fillRect(0, Y, Rect.width, RowHeight);
    } else if (Item === HoveredExplorerFile) {
      Context.fillStyle = Colors.Hover;
      Context.fillRect(0, Y, Rect.width, RowHeight);
    }

    const X = ExplorerStyle.Padding + Depth * ExplorerStyle.Indent;

    if (Item.Children.length > 0) {
      Context.fillStyle = Colors.Muted;
      Context.textAlign = "center";
      Context.fillText(Item.Expanded ? "v" : ">", X + 6, Y + RowHeight / 2);
    }

    const Icon = Item.Icon;
    const IconX = X + 16;
    const IconY = Y + (RowHeight - ExplorerStyle.IconSize) / 2;

    if (Icon?.complete && Icon.naturalWidth > 0) {
      Context.drawImage(
        Icon,
        IconX,
        IconY,
        ExplorerStyle.IconSize,
        ExplorerStyle.IconSize,
      );
    }

    Context.fillStyle = Colors.Text;
    Context.textAlign = "left";

    const LabelX = IconX + ExplorerStyle.IconSize + 5;
    const PlusWidth = 22;
    const LabelWidth = Math.max(0, Rect.width - LabelX - PlusWidth);

    Context.save();
    Context.beginPath();
    Context.rect(LabelX, Y, LabelWidth, RowHeight);
    Context.clip();
    Context.fillText(Item.Name, LabelX, Y + RowHeight / 2);
    Context.restore();

    if (Item === HoveredExplorerFile) {
      Context.fillStyle = Colors.Muted;
      Context.textAlign = "center";
      Context.fillText("+", Rect.width - 14, Y + RowHeight / 2);
    }
  }

  Context.restore();
}

function CreateExplorerFile(Name, ClassName, IsFolder, Parent = null) {
  const Item = {
    Name,
    ClassName,
    IsFolder,
    Parent,
    Children: [],
    Expanded: false,
    Icon: null,
    InstanceProperties: {
      Name,
      ClassName,
      Archivable: true,
    },
  };

  if (Parent) {
    Parent.Children.push(Item);
    Parent.Expanded = true;
  } else {
    ExplorerItems.push(Item);
  }

  const Icon = new Image();
  Item.Icon = Icon;
  Icon.src = `/RobloxIcons/${ClassName}.png`;
  Icon.onerror = () => {
    Icon.onerror = null;
    Icon.src = "/RobloxIcons/Unknown.png";
  };
  Icon.onload = RenderExplorer;

  RenderExplorer();
  return Item;
}

function SelectExplorerFile(File) {
  SelectedExplorerFile = File;
  RenderExplorer();
  PropertiesTable.scroll(0, 0);
  RenderProperties();
}

function GetExplorerRowAt(Y) {
  const Index = Math.floor((Y + ExplorerScroll) / ExplorerStyle.RowHeight);

  return ExplorerRows[Index] ?? null;
}

function GetExplorerPointerPosition(Event) {
  const Rect = ExplorerCanvas.getBoundingClientRect();

  return {
    X: Event.clientX - Rect.left,
    Y: Event.clientY - Rect.top,
  };
}

ExplorerCanvas.addEventListener("pointermove", (Event) => {
  const { X, Y } = GetExplorerPointerPosition(Event);
  const Row = GetExplorerRowAt(Y);

  const IsOverPlus = Row && X >= ExplorerCanvas.clientWidth - 28;

  const NextHovered = Row?.Item ?? null;

  if (
    NextHovered !== HoveredExplorerFile ||
    IsOverPlus !== ExplorerCanvas.dataset.overPlus
  ) {
    HoveredExplorerFile = NextHovered;
    ExplorerCanvas.dataset.overPlus = IsOverPlus ? "true" : "false";
    ExplorerCanvas.style.cursor = Row ? "pointer" : "default";
    RenderExplorer();
  }
});

ExplorerCanvas.addEventListener("pointerleave", () => {
  HoveredExplorerFile = null;
  ExplorerCanvas.dataset.overPlus = "false";
  ExplorerCanvas.style.cursor = "default";
  RenderExplorer();
});

ExplorerCanvas.addEventListener("click", (Event) => {
  const { X, Y } = GetExplorerPointerPosition(Event);
  const Row = GetExplorerRowAt(Y);

  if (!Row) return;

  const { Item, Depth } = Row;
  const ArrowX = ExplorerStyle.Padding + Depth * ExplorerStyle.Indent;

  if (X >= ExplorerCanvas.clientWidth - 28) {
    CreateExplorerFile("Part", "Part", false, Item);
    return;
  }

  if (Item.Children.length > 0 && X >= ArrowX && X <= ArrowX + 14) {
    Item.Expanded = !Item.Expanded;
    RenderExplorer();
    return;
  }

  SelectExplorerFile(Item);
});

ExplorerCanvas.addEventListener(
  "wheel",
  (Event) => {
    Event.preventDefault();
    ExplorerScroll += Event.deltaY;
    RenderExplorer();
  },
  { passive: false },
);

new ResizeObserver(ResizeExplorerCanvas).observe(ExplorerCanvas);

function InitializeExplorer() {
  const Workspace = CreateExplorerFile("Workspace", "Workspace", true);
  const ReplicatedStorage = CreateExplorerFile(
    "ReplicatedStorage",
    "ReplicatedStorage",
    true,
  );
  const ServerScriptService = CreateExplorerFile(
    "ServerScriptService",
    "ServerScriptService",
    true,
  );
  const ServerStorage = CreateExplorerFile(
    "ServerStorage",
    "ServerStorage",
    true,
  );
  const Clients = CreateExplorerFile("Clients", "Players", true);

  CreateExplorerFile("kindtracker", "Player", false, Clients);

  ResizeExplorerCanvas();
}

InitializeExplorer();

window.addEventListener("resize", ResizeExplorerCanvas);
window.SelectedExplorerFile = SelectedExplorerFile;
