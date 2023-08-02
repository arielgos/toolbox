# Toolbox Challenge

This projects was build for the Toolbox code challenge, the project contains:

- backend (node 14 / backend app)
    - 3 web services
        - / : check the health of the web services
        - /files : return the list of files contains a query parameter `fileName`
        - /files/list : return the raw list for the external service
- frontend (node 16 / react app)
- docker-compose.yml (Docker compose file)

#### Requirements
Ports `8080` and `3000` should be available for both the backend and the frontend containers execution.

### Run the project

Download or clone the repository

#### Run with Docker compose

`docker compose up`

When the docker compose command runs you should see to containers one for the backend (node 14) and one for the frontend (node 16)

The project was build to run with just the docker compose command, you should see the build process from the command line when the docker compose commands are executed.

#### Run manually

- backend: port `8080`
    - `npm install` download dependencies
    - `npm start` runs the app
    
- frontend: port `3000`
    - `npm install` download dependencies
    - `npm run build` build the app for production
    - `npm install -g serve` server static content
    - `server -s build` runs the app

### Extra commands
- backend: port `8080`
    - `npm start` runs the app
    - `npm test` runs the mocha and && chai tests
    - `npm run scan` scans the app with the standard library
    
- frontend: port `3000`
    - `npm start` runs the app on dev mode
    - `npm run scan` scans the app with the standard library
    - `npm test` runs the jest tests 

