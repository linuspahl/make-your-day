# make-your-day
Web app (Node + React) to extend my knowledge about the used technologies. This app will help me to measure my daily goals.


## Setup the project

### Global dependencies
* yarn - package manager for all backend and frontend dependencies
* VS Code User Setting to enable commits in e.g. .eslintrc

### Frontend
* Run `yarn install` to install all frontend dependencies

## Packages overview

### Frontend
Dev packages
* eslint - Analyses the code for stylistic and coding errors, based on the .eslintrc.
Can optionally be used with the cli e.g. `yarn run eslint example/target.js`.
* prettier - Code formatter, can be combined with eslint, by using eslint-plugin-prettier and eslint-config-prettier. https://prettier.io/docs/en/eslint.html
* eslint-plugin-prettier - Runs Prettier as an ESLint rule and reports differences as individual ESLint issues.
* eslint-config-prettier - Turns off all rules that are unnecessary or might conflict with Prettier.

## Best Practices:
* We are trying to avaid global dependencies.
The package manager should be the only global dependency.
This will make the setup easier and reduce potential errors.
It will affect e.g. the setup of the VS Code node debugging.

* All vcs commits should start with the affected project parts (FE or BE).
E.g: FE: Setup yarn package.json
