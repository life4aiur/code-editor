interface MockDataConfig {
  imports?: string[];
  mockData: string;
}

const createArrayMock = (
  itemStructure: object,
  count = 3,
  baseName: string
) => {
  return Array(count)
    .fill(null)
    .map((_, i) => ({
      key: `${i + 1}`,
      text: `${baseName} ${i + 1}`,
      ...itemStructure,
    }));
};

const counter = 0;

export const generateMockData = (
  componentName: string,
  uniqueId: number
): string => {
  const camelCaseComponentName = `${componentName
    .replace(/-/g, "")
    .toLowerCase()}_${uniqueId}`;

  switch (componentName) {
    case "sympl-breadcrumb": {
      return `const ${camelCaseComponentName} = ${JSON.stringify(
        createArrayMock({ href: "#" }, 3, "Breadcrumb"),
        null,
        2
      )};

const breadcrumb_${uniqueId} = document.querySelector('#${componentName}_${uniqueId}');
breadcrumb_${uniqueId}.items = ${camelCaseComponentName};`;
    }
    case "sympl-dropdown": {
      return `const ${camelCaseComponentName} = ${JSON.stringify(
        createArrayMock({}, 3, "Dropdown"),
        null,
        2
      )};

const dropdown_${uniqueId} = document.querySelector('#${componentName}_${uniqueId}');
dropdown_${uniqueId}.options = ${camelCaseComponentName};`;
    }
    case "sympl-contextual-menu": {
      return `const ${camelCaseComponentName} = ${JSON.stringify(
        createArrayMock({ icon: "settings" }, 3, "Menu"),
        null,
        2
      )};

const menu_${uniqueId} = document.querySelector('#${componentName}_${uniqueId}');
menu_${uniqueId}.items = ${camelCaseComponentName};`;
    }
    case "sympl-checkbox-group": {
      return `const ${camelCaseComponentName} = ${JSON.stringify(
        createArrayMock({ checked: false }, 3, "Checkbox"),
        null,
        2
      )};

const checkboxGroup_${uniqueId} = document.querySelector('#${componentName}_${uniqueId}');
checkboxGroup_${uniqueId}.items = ${camelCaseComponentName};`;
    }
    case "sympl-radio-group": {
      return `const ${camelCaseComponentName} = ${JSON.stringify(
        createArrayMock({}, 3, "Radio"),
        null,
        2
      )};

const radioGroup_${uniqueId} = document.querySelector('#${componentName}_${uniqueId}');
radioGroup_${uniqueId}.options = ${camelCaseComponentName};`;
    }
    case "sympl-search-bar": {
      return `const ${camelCaseComponentName} = ${JSON.stringify(
        createArrayMock({ subtitle: "Result description" }, 3, "Search"),
        null,
        2
      )};

const searchBar_${uniqueId} = document.querySelector('#${componentName}_${uniqueId}');
searchBar_${uniqueId}.results = ${camelCaseComponentName};`;
    }
    case "sympl-list": {
      return `const ${camelCaseComponentName} = ${JSON.stringify(
        createArrayMock({}, 3, "List"),
        null,
        2
      )};

const list_${uniqueId} = document.querySelector('#${componentName}_${uniqueId}');
list_${uniqueId}.options = ${camelCaseComponentName};`;
    }
    default:
      return "";
  }
};
