# Description

**This repository contains a simple Angular app that follows the requirements:**

We ask you to create a simple application using Angular and the following
open API:

https://bikeindex.org/documentation/api_v3

**Acceptance Criteria**

The final application should consist of a Bike Search and a Bike Detail
view

1. Bike Search
- The user can search for bikes by a given city name
  - A list of bikes is provided by: GET `/v3/search`
  - A list of results are displayed below the search input
2. Each result has a link that navigates to a bike detail page.
3. Bike Detail
   - Use bikes API to fetch details about the bike. GET
   `/v3/bikes/{id}`
   - Display on the bike detail page some information about a bike
   and the picture of the bike.


## Prerequisites

Before you begin, make sure you have the following tools installed on your machine:

Node.js: [Download and install Node.js](https://nodejs.org/en/)

When it's installed you should install Angular CLI as well (`npm install -g @angular/cli
`)

## Getting Started
1. Clone the repository to your local machine.
2. Install project dependencies using `npm install`

## Running the Project

Once you have installed the dependencies and the Angular CLI globally, you can run the project using the following steps:
1. Start the development server `ng serve`
2. Open your web browser and navigate to http://localhost:4200/. The app will automatically reload if you make any changes to the source files.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Additional details

1. Project is covered with Jasmine unit tests. Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io);
2. Module based architecture is chosen;
3. This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.1.0;
4. Third party libraries/tools: `Bootstrap 5`, `Prettier`;
