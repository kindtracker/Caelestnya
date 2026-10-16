const PropertiesTable = document.querySelector(".PropertiesTable");
const PropertiesSearch = document.querySelector(".SearchBarInput");

const PropertyDefinitions = [
  {
    Name: "Data",
    Properties: [
      {
        Name: "Name",
        Editable: true,
        Get: (File) => File.Name,
        Set: (File, Value) => {
          console.log(File);
        },
      },
      {
        Name: "ClassName",
        Editable: false,
        Get: (File) => File.ClassName,
      },
      {
        Name: "Parent",
        Editable: false,
        Get: (File) => {
          const Parent = File.Parent;
          return Parent?.Name ?? "undefined";
        },
      },
    ],
  },
];

function RenderProperties() {
  PropertiesTable.replaceChildren();

  const Car = document.createElement("img");
  Car.title = "Car";
  Car.className = "Car";
  Car.src = "https://cataas.com/cat";

  if (!SelectedExplorerFile) {
    const Empty = document.createElement("div");
    Empty.className = "PropertyEmpty";
    Empty.textContent = "Select an instance to view its properties.";

    PropertiesTable.appendChild(Empty);
    PropertiesTable.appendChild(Car);
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

    if (MatchingProperties.length == 0) continue;

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

      if (Property.Type == "checkbox") {
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
          Property.Type == "checkbox" ? Value.checked : Value.value;

        Property.Set(SelectedExplorerFile, NewValue);
        RenderProperties();
      });

      Row.append(Name, Value);
      Rows.appendChild(Row);

      VisibleProperties++;
    }
  }

  if (VisibleProperties == 0) {
    const Empty = document.createElement("div");
    Empty.className = "PropertyEmpty";
    Empty.textContent = "No matching properties.";
    PropertiesTable.appendChild(Empty);
  }

  PropertiesTable.appendChild(Car);
}

PropertiesSearch.addEventListener("input", RenderProperties);
