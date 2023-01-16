
# Automated Demoblaze Tests

Automated API and UI tests for https://www.demoblaze.com/.







## Directory Structure

```
DemoblazeTests
│
├── cypress
│    ├── e2e
│    │   ├── api
│    │   │   └── api-tests.cy.js  
│    │   └── ui
│    │       └── ui-tests.cy.js  
│    ├── fixtures 
│    ├── reports
│    │   └── html	
│    │        └── index.html	
│    ├── support  
│    │	 ├── commands.js
│    │	 └── e2e.js   
│    └── videos
│        ├── api
│        │   └── api-tests.cy.js.mp4
│        └── ui
│            └── ui-tests.cy.js.mp4          
├── node_modules
├── cypress.config.js
├── package-lock.json
└── package.json
```

#### File Contents:

| File | Content     | 
| :-------- | :------- | 
| `cypress/e2e/api/api-tests.cy.js` | API tests for Demoblaze | 
| `cypress/e2e/api/ui-tests.cy.js` |  UI tests for Demoblaze | 
| `cypress/e2e/support/commands.js` | Personalized cypress commands | 
| `cypress/e2e/support/e2e.js` | Imports | 
| `cypress/e2e/reports/html/index.html` | HTML file for last report I ran on my personal machine | 
| `cypress/e2e/videos` | Contains .mp4 files created by reporter after I ran it on my personal machine | 
| `cypress/cypress.config.js` | Contains enviorment variables, baseUrl, set-up for reporter | 
| `cypress/package.json` | Basic data regarding the project | 




## Setting up the project

I opened my IDE of choice (VS Code)

Created a new project folder (DemoblazeTests)

Created a 'package.json' file using command:


```bash
  npm init -y
```

Installed Cypress using following command:

```bash
  npm install cypress
```

In order to run set up tests use command:

```bash
  npx cypress open
```

## Reporter

The reporter I decided to use is Mochawesome Reporter for Cypress.
In order to install it I followed the steps described in the reporter's documentation.

[Mochawesome Reporter Documentation](https://linktodocumentation)

### Steps for setting up reporter:

I opened my project (DemoblazeTests)
I installed cypress-mochawesome-reporter using following command:
```
npm i --save-dev cypress-mochawesome-reporter
```
Edited the *cypress.config.js* file to include:
```
inside 'defineConfig':
      reporter: 'cypress-mochawesome-reporter'

inside 'e2e -> setupNodeEvents':
      require('cypress-mochawesome-reporter/plugin')(on)
```
Added the following import in *cypress/support/e2e.js*:

```
import 'cypress-mochawesome-reporter/register'
```
In *package.json* file -> under *scripts* I added:
```
"html-report": "cypress run cypress/e2e/api-tests.cy.js"
```
Command to run report:
```
npm run html-report
```
## Cucumber

I tried to install Cucumber in my project using the *cypress-cucumber-preprocessor* and *cypress-cucumber-preprocessor/esbuild*, however despite my efforts my *".feature"* files were just not recognized by my IDE as Cucumber files. 

Regardless, I still created an additional github repository for this project so you can see how I intended to implement it.


- [GitHub Page for DemoblazeWithCucumber](https://github.com/christianag/DemoblazeWithCucumber)


One of the instructions I followed while I tried to enable it were from this page:

- [Getting started with Cypress 10 and Cucumber](https://blog.emumba.com/getting-started-with-cypress-10-and-cucumber-6b43ff68633b)

- [@badeball/cypress-cucumber-preprocessor](https://github.com/badeball/cypress-cucumber-preprocessor)

- [@badeball/cypress-esbuild-preprocessor](https://www.npmjs.com/package/@bahmutov/cypress-esbuild-preprocessor)

