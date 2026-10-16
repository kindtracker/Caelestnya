function InitializeToolBar() {
  const ToolBar = document.querySelectorAll(".ToolBarButton");
  let SelectedTool = undefined;

  ToolBar.forEach((Tool) => {
    if (["Run", "Pause", "Stop"].includes(Tool.title)) {
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
}

InitializeToolBar();
