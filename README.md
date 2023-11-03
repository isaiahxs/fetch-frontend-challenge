# Getting started: Fetch Friend Finder

## [View My Live Site!](https://isaiah-fetch-frontend.onrender.com/)

This project is a full-stack Pet Finder using React, Node.js, and Express. Below are the instructions to set up the environment for running this project on any OS.

<strong>My project includes responsive media queries, client-side validations, modularized components, local storage utilization to conditionally render UI components, Jest tests, accesibility considerations, SEO optimizations, semantic tags, and more.

## Pre-requisites
1. Node.js (v14.x.x or higher)
2. npm (v7.x.x or higher)

## Installing Node.js and npm on different operating systems

### Windows
1. Download the Node.js installer from the [official website](https://nodejs.org/en/download/).
2. Run the installer and follow the setup wizard to install Node.js and npm.

### macOS
You can use Homebrew to install Node.js:
```
brew install node
```

Or download the installer from the [official website](https://nodejs.org/en/download/).

### Linux (Ubuntu)
Run the following commands in your terminal:
```
sudo apt update
sudo apt install nodejs npm
```

## Clone the Repository

Clone the repository into your local machine with one of the following methods:

HTTPS
```
https://github.com/isaiahxs/fetch-backend-take-home.git
```

SSH
```
git@github.com:isaiahxs/fetch-backend-take-home.git
```

GitHub CLI:
```
gh repo clone isaiahxs/fetch-backend-take-home
```

Navigate into the project directory:
```
cd fetch-backend-take-home
```

## Install dependencies

To install the required backend dependencies, run the following from within the backend directory:
```
npm install
```

To install the required frontend dependencies, run the following from within the frontend directory:
```
npm install
```
```
npm run build
```

## Run the Server

Once the dependencies are installed, enter the backend directory and run the server using
```
npm start
```

This will start the server on `http://localhost:3001`. The url I used was https://frontend-take-home-service.fetch.com, but if you'd like to make custom routes, you can make API requests to this URL using Postman or curl.

To use the frontend, run the following from within the frontend directory:

```
npm start
```

This will open the client-side on `http://localhost:3000`.

## Running Tests with Jest
Once the dependencies are installed, to run client-side tests, run the following command from the frontend directory of the project:

```
npm run test a
```