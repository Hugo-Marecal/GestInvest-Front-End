# Welcome to GestInvest

This project was developed to solve the difficulties encountered in keeping track of financial assets. To avoid the need to navigate between different Excel files and consult several websites where assets are held.

## Installing the project

To be able to use the project, several steps are required:

### Step 1 : clone the repository

To clone the project repository, run the following command:

```bash
git clone <repository>
```

### Step 2 : install dependencies

This project has been developed in Node.js. Make sure you have Node.js installed on your machine before continuing.

There are several ways to install these dependencies:

**_With pnpm_** command

pnpm is an alternative package manager to npm and Yarn. Unlike npm and Yarn, pnpm takes a different approach to managing disk space and memory. Instead of duplicating dependencies in each project, pnpm stores them in a global location and links them symbolically in each project. This saves disk space and reduces installation time by avoiding duplication of modules.

```bash
pnpm i
```

**_With npm_** command

npm is the default package manager for the Node.js environment. It enables developers to install, publish and manage JavaScript packages, which are reusable libraries or modules of code. npm is widely used in the Node.js ecosystem and is bundled with Node.js when installed. Users can access a vast registry of npm packages containing thousands of open source modules.

```bash
npm i
```

### Step 3 : Launching the project

Now that the dependencies have been installed, we're ready to launch the project.

**_With pnpm_** command

```bash
pnpm dev
```

**_With npm_** command

```bash
npm run dev
```
