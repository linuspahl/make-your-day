# Best practices

## Linting

We are using Eslint for the linting.
Before each commit, you should check the linting with `yarn lint`.
For the best development experiennce, you should install the Prettier Extension for your IDE.

## Recommended Editor Plugins

Recommended source-code editor plugins for the development. Available for most editors, but in every case for VS Code.

Library specific

- [vscode-styled-components](https://marketplace.visualstudio.com/items?itemName=jpoissonnier.vscode-styled-components)
  For syntax highlighting and more for styled-components. Checkout it's feature list.
- [GraphQL for VSCode](https://marketplace.visualstudio.com/items?itemName=kumar-harsh.graphql-for-vscode)
  Syntax highlighting and more for GraphQL schemas.
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
  For a better integration of prettier.
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) -
  Integrates ESLint into VS Code. Very useful in combination with the Prettier plugin.
  Note: You will need to create in the projects root a .vscode directory with a settings.json.
  This file should contain the following code to formatOnSave

  ```
    "eslint.autoFixOnSave": true,
    "eslint.validate": [
        "javascript",
        "javascriptreact",
        { "language": "typescript", "autoFix": true },
        { "language": "typescriptreact", "autoFix": true }
    ],
    "[javascript]": {
        "editor.formatOnSave": false
    },
    "[javascriptreact]": {
        "editor.formatOnSave": false
    },
    "[typescript]": {
        "editor.formatOnSave": false
    },
  ```

  and the following code to tell eslint the path of the eslintrc's. We need to do this, because there is bug with eslint 6. https://github.com/microsoft/vscode-eslint/issues/696
  Without this setting, vscode-eslint would only work if you open the frontend or backend directory directly with VSCode.

  ```
      "eslint.workingDirectories": [
          { "directory": "./frontend", "changeProcessCWD": true },
          { "directory": "./backend", "changeProcessCWD": true }
      ],
  ```

Development experience

- [Path Intellisens](https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense) - Visual Studio Code plugin that autocompletes filenames.
- [Import Cost](https://marketplace.visualstudio.com/items?itemName=wix.vscode-import-cost) - will display inline in the editor the size of the imported package
- [Bracket Pair Colorizer 2](https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer-2) - As the name says, colored bracket, just super useful.

## General Best Practices

- We are trying to avoid global dependencies.
  The package manager should be the only global dependency.
  This will make the setup easier and reduce potential errors.
  It will affect e.g. the setup of the VS Code node debugging.
- All vcs commits should start with the affected project parts (FE or BE, or both).
  E.g: FE: Setup yarn package.json
- To prevent most "Cannot read property 'foo' of undefined" Errors, you should always define an empty array as default value, e.g. for parameters:

```

function bar(arrayOfItems = []) {..}

```

or deconstruction:

```

const {arrayOfItems = []} = this.props;

```

## Frontend

### React components naming convention

Use `Component/Component.js` instead of `Component/index.js`. It looks redundant at first, but will help a lot when switching between components, during the development.

### Structuring imports

- We try to structure the imports. The definition of an import type is very subjective, but we are trying to seperate the imports by:
  // libraries - all dependencies installed with yarn
  // components - all components in the `src` directory
  // interfaces - all TypeScript interfaces
  // graphql - all actions in the `store` driectory like grapqhl queries and mutations

### Example React component structur:

```

export default class ExampleComponent extends React.Component {
// The first part is the constructur (when needed)
// We'll bind this to all functions which need access to the component context
// This will keep the constructor clean
public constructor(props: Props) {
super(props)

    this.state = {}

    this.exampleStateChange = this.exampleStateChange.bind(this)

}

// Component lifecycle methods
componentDidMount() {}

// Render
public render()()() {}

// Other functions should be placed after the render function
// This increases the readability
exampleStateChange() {}
}

```

### Component module export:

When the component is just a function, make sure you still use a named export like

```

const ComponentName = props => {}
export const ComponentName

```

and not

```

export default props => {}

```

This makes debugging easier, e.g. with the React Devtools

### Type definitions

We need to type all id's as strings, because the defined GraphQL type ID will relate to a string, even our id's are currently just numbers.

### Accessibility

Most common best practices are easy to check with e.g. the browser extension axe.
But still always check if tab navigation works.
Each page should have one main landmark. (role="main")
