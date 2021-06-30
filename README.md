# Introduction

This is a Tinder Clone project currently at version 1.0 (without backend integrated).

## Features
  . Like/pass a user
  . View history of liked/passed users.
  . Usage of local storage to keep the liked/passed history persistent between reloads.
  . Performance optimization: Prevent race-condition when user swipes too fast, and limit the number of users cached in the memory during pagination.

## To Improve

During phase 2, the real backend will be integrated with following features/enhancements:
  . Better runtime speed and UX since fetching user's general info and age can be merged into 1 API only.
  . With usage of database, the pagination of browsing history will be production-like and user's interacted people will be recorded to prevent displaying the same people twice.
  . View matched pairs.

# App Bootstrap

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
Note: Pre-commit hook is setup to make sure that codebase

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn lint`

Lint the project with eslint to check for errors before commiting. You can also specify `--fix` flag to automatically rectify fixable errors.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
