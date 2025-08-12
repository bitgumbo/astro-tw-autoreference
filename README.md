# node-ts-esm-starter

A fully configured, batteries-included starter for modern **Node.js + TypeScript** packages using **ESM**. 

Have your package ready to be published in less than 5 minutes (aside from writing your actual code).

## ✨ Features
- ⚡  **Node.js + TypeScript (ESM)** – Modern setup with sensible defaults  
- 🧹 **Biome** – Formatting and linting
- ✅ **Vitest** – Fast, modern test runner  
- 🛡 **AreTheTypesWrong** – Validate published type definitions  
- 📄 **Typedoc** – Generate clean API documentation  
- 🪝 **Lefthook + Commitlint** – Git hooks & conventional commit enforcement  
- 📦 **Release-It** for automated:
  - Semantic versioning
  - Changelog generation
  - GitHub Releases
  - npm publishing
- 🛠 **Preconfigured GitHub Actions**:
  - CI/CD checks
  - Github Releases
  - NPM publishing
  - Documentation Deployment
- 🖥 **VS Code configuration included**



## 🚀 Getting Started
### Copy the repository template
From the [Github page](https://github.com/bitgumbo/node-ts-esm-starter) for this repo, click the **"Use this template"** button and select **"Create a new repository".**  

Fill in the metadata as you wish, and click **"Create repository".** You should now have a copy of this repo in your account.

---
### Clone your copy locally
Remember to use the url for *your* copy of the repository:
```bash
git clone https://github.com/<username>/<repo-name>.git
cd <repo-name>
npm install
```
---
### Customize Metadata
This is particularly important if you plan to publish to npm:
1. Update `README.md` with your project details
2. Update `package.json`:
- name
- description
- author
- license

And commit the changes, using conventional commit format:
```bash
git add .
git commit -m "chore: updated project metadata"
```

---
### Configure for NPM Publishing
This step is required for `release-it` to publish to npm. 

First you must generate an NPM Access Token:
1. Head over to your NPM account
2. Click **Profile** -> **Access Tokens**
2. Click **Generate Token** -> **Classic Token**
3. Give it a name (e.g. "release-it") and select **Automation**.
4. Click **GenerateToken** and copy it to your clipboard

Next, add the token to your repository secrets:
1. Head to your repository page
2. Click **Settings** -> **Secrets and Variables** -> **Actions**
3. Under the Secrets tab, click **New Repository Secret**
4. Name it `NPM_TOKEN` and paste the token into the `Secret` field
5. Click **Add Secret**

---
### Configure Documentation Deployment
This step is required to deploy the docs to GitHub Pages. 
1. Head to your repository page
2. Click **Settings** -> **Pages**
3. Under **Build and Deployment** select the **Source** dropdown and choose **Github Actions**.


## 🛠 Development
The dev command will start up watchers for both tests and source files:
```bash
npm run dev
```

---
### Write a test
This test will automatically run on save, and fail since we haven't written the code yet:
```ts
// tests/index.test.ts
import { square } from '@/index.js';

test('square()', () => {
  expect(square(2)).toBe(4);
});
```

---
### Write the code
Time to make that test pass!
>Make sure you use tsdoc comments if you plan to generate docs
```ts
// src/index.ts

/**
 * Squares a number.
 * 
 * @param num - The number to square
 */
export const square = (num) => num * num;
```

---
### Commit your new feature
Git hooks will automatically run formatting, linting and type checking on commit.

Don't forget it will also enforce conventional commit format:
```bash
git add .
git commit -m "feat: add square function"
```

---
### Push your changes
In addition to the commit checks, `are-the-types-wrong` and `vitest` will also run on push.
```bash
git push origin main
```

Now head to your repository page and click **Actions**.

You will see that the CI/CD pipeline is running all all validations, including running tests on several Node versions.

## 📦 Releasing and Publishing
Once your CI/CD pipeline is green, you can release your package:

1. On your github repository page, click  the **Actions** tab
2. Click the **Release & Publish** workflow
3. Click the **Run Workflow** dropdown
4. Make sure the `main` branch is seleted and click the green **Run Workflow** button.

Release-It will automatically do the following:
- Bump the version in `package.json`
- Generate a changelog
- Create a git tag with the new version
- Create a github release
- Publish to npm

Once the **Release & Publish** workflow completes successfully, the **Build & Deploy Docs** workflow will automatically be triggered, which will:
- Build the docs
- Deploy them to GitHub Pages


## 🎉 Congratulations!
Easy peasy lemon squeezy! 

Your package is live on NPM and the docs are live on Github Pages
