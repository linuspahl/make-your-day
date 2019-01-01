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
* eslint - To verify linting rules defined in .eslintrc
The verifcation can be checked with the cli e.g. `yarn run eslint example/target.js`


## Best Practices:
* We are trying to avaid global dependencies.
The package manager should be the only global dependency.
This will make the setup easier and reduce potential errors.
It will affect e.g. the setup of the VS Code node debugging.

* All vcs commits should start with the affected project parts (FE or BE).
E.g: FE: Setup yarn package.json
