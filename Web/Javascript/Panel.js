function InitializePanelDragging() {
  document.querySelectorAll(".PanelDragHandle").forEach((Handle) => {
    Handle.addEventListener("pointerdown", (Event) => {
      const Panel = Handle.closest(
        ".Explorer, .Properties, .ToolBar, .Game, .BottomPart",
      );

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

InitializePanelDragging();
