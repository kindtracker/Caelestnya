const GameGrid = document.querySelector(".GameGrid");
const NewProjectButton = document.querySelector(".SearchBarButton");

function AddGameCard(Game) {
  const GameCard = document.createElement("a");
  GameCard.className = "GameCard";
  GameCard.href = "/Html/Studio.html?GameId=" + Game.Id;

  GameCard.innerHTML = `
    <img class="GameIcon" src="/Api/Images/${((Game.Id - 1) % 10) + 1}">
    <div class="GameInfo">
      <span class="GameName">${Game.Name}</span>
      <span class="GameCreator"><i class="fa-solid fa-user"></i> ${Game.CreatorName}</span>
    </div>
  `;

  GameGrid.appendChild(GameCard);
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
  InitializeGameGrid();
});

function InitializeGameGrid() {
  GameGrid.replaceChildren();
  const Projects = JSON.parse(localStorage.getItem("Projects") || "[]");

  for (const Project of Projects) {
    AddGameCard(Project);
  }
}

InitializeGameGrid();
