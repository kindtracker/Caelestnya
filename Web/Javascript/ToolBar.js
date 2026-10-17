let UrlParams = new URLSearchParams(window.location.search);
let ProjectId = UrlParams.get("ProjectId");

function InitializeToolBar() {
  const ToolBar = document.querySelectorAll(".ToolBarButton");
  let SelectedTool = undefined;

  ToolBar.forEach((Tool) => {
    if (["Project settings", "Run", "Pause", "Stop"].includes(Tool.title)) {
      return;
    }

    if (Tool.title == "Cursor") {
      SelectedTool = Tool;
    }

    Tool.addEventListener("click", () => {
      SelectedTool.classList.remove("active");
      Tool.classList.add("active");
      SelectedTool = Tool;
    });
  });

  const ToolBarRight = document.querySelector(".ToolBarRight");

  const RunButton = ToolBarRight.querySelector('button[title="Run"]');
  const PauseButton = ToolBarRight.querySelector('button[title="Pause"]');
  const StopButton = ToolBarRight.querySelector('button[title="Stop"]');

  const ProfilePicture = ToolBarRight.querySelector(".ProfilePicture");
  const ProfileName = ToolBarRight.querySelector(".ProfileName");

  const SettingsButton = ToolBarRight.querySelector(
    'a[title="Project settings"]',
  );

  SettingsButton.href = "/Html/ProjectSettings.html?ProjectId=" + ProjectId;
}

InitializeToolBar();
