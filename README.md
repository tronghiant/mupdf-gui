[![SonarCloud]](https://sonarcloud.io/summary/new_code?id=tronghiant_mupdf-gui)

![Coverage]
![Lines of Code]
![Duplicated Lines]
![Bugs]
![Code Smells]
![Vulnerabilities]
![Reliability]
![Maintainability]
![Technical Debt]
![Security Rating]

# mupdf GUI
A electron project act as a [GUI](https://en.wikipedia.org/wiki/Graphical_user_interface) for [mupdf](https://mupdf.com/) tool

This project was created using [create-vue](https://github.com/vuejs/create-vue) and using [electron-forge](https://www.electronforge.io/) for packaging.


## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
yarn
```

### Compile and Hot-Reload for Development

```sh
yarn start
```

### Type-Check, Compile and Minify for Production

```sh
yarn make
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
yarn test:unit
```

### Run End-to-End Tests with [Playwright](https://playwright.dev)

```sh
# Install browsers for the first run
npx playwright install

# When testing on CI, must build the project first
yarn build

# Runs the end-to-end tests
yarn test:e2e
# Runs the tests only on Chromium
yarn test:e2e --project=chromium
# Runs the tests of a specific file
yarn test:e2e tests/example.spec.ts
# Runs the tests in debug mode
yarn test:e2e --debug
```

### Lint with [ESLint](https://eslint.org/)

```sh
yarn lint
```

[SonarCloud]: https://sonarcloud.io/images/project_badges/sonarcloud-white.svg
[Lines of Code]: https://sonarcloud.io/api/project_badges/measure?project=tronghiant_mupdf-gui&metric=ncloc
[Duplicated Lines]: https://sonarcloud.io/api/project_badges/measure?project=tronghiant_mupdf-gui&metric=duplicated_lines_density
[Coverage]: https://sonarcloud.io/api/project_badges/measure?project=tronghiant_mupdf-gui&metric=coverage
[Bugs]: https://sonarcloud.io/api/project_badges/measure?project=tronghiant_mupdf-gui&metric=bugs
[Code Smells]: https://sonarcloud.io/api/project_badges/measure?project=tronghiant_mupdf-gui&metric=code_smells
[Vulnerabilities]: https://sonarcloud.io/api/project_badges/measure?project=tronghiant_mupdf-gui&metric=vulnerabilities
[Reliability]: https://sonarcloud.io/api/project_badges/measure?project=tronghiant_mupdf-gui&metric=reliability_rating
[Maintainability]: https://sonarcloud.io/api/project_badges/measure?project=tronghiant_mupdf-gui&metric=sqale_rating
[Technical Debt]: https://sonarcloud.io/api/project_badges/measure?project=tronghiant_mupdf-gui&metric=sqale_index
[Security Rating]: https://sonarcloud.io/api/project_badges/measure?project=tronghiant_mupdf-gui&metric=security_rating
