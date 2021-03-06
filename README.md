# Youtube Player

## About the project
This project utlizes both react and node.js to create a playlist application.

React is used to render the front-end (app) and renders on port 3000.  
Node.js is used to create the back-end (server) which holds all the data and run on port 5001.

## Set up
** **Make sure you got docker-cli, node, npm locally** **
  
To set up the project you need to install all the node modules in both of the projects.

**frontend setup:**  
run this
```sh
cd frontend
npm install
```

**backend setup steps:**  
1. Setup .env file, with the following parameters:  
``
DB_HOST=localhost
DB_NAME=docker
DB_USER=docker
DB_PASSWORD=docker
DB_SCHEMA=playlist
``

2. then run this:
```sh
cd ../backend
npm install
npm run run-db
```

## Running the projects
For this to project you need to have both the node server and the react project running.

### Start the server
To build the server run this 
```sh
cd backend
npm run build
```

To run the server run this 
```sh
cd backend
npm run start
```

### Start the App
To build the app run this
```sh
cd frontend
npm run build
```

To run the app run this
```sh
cd frontend
npm start
```



