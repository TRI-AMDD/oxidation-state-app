# Oxidation State App UI

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm run start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run deploy-s3`

Edit the package.json and the line about deploy-s3 to deploy the build as a static website using an S3 bucket\

## User Management with AWS Cognito

The app supports AWS Cognito login. Supply the details in the `config.js` file in the `public` folder to connect to the desired Cognito user pool.
To disable Cognito, set the flag `AMPLIFY_ENABLED` to false.

## TRI Web App Additions

Here are the additions added on top of Create React App.

### Prettier Code Formatting

[Prettier](https://prettier.io/) is an opinionated code formatter. This runs on git commits.
To manually trigger prettier formatting, run `npm run format`

### Airbnb Typescript Style Guide

[Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript) is implemented. All code is checked before a git commit.

### Emotion Styling

[Emotion](https://emotion.sh/docs/introduction) can be used to style components.

### React Router

You can use [React Router](https://reactrouter.com/web/guides/quick-start) for setting up multiple pages.

### React Query

[React Query](https://react-query.tanstack.com/) can be used for fetching data from rest endpoints.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
