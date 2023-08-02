# Toolbox Challenge

This projects was build for the Toolbox code challenge, the project contains:

- backend (node 14 / backend app)
- frontend (node 16 / react app)
- docker-compose.yml (Docker compose file)
### Run the project
`docker compose up`

The project was build to run with just the docker compose command, you should see the build process from the command line when the docker compose commands are executed.

#### Requirements
Ports `8080` and `3000` should be available for both the backend and the frontend containers execution.

### Extra commands
- backend: port `8080`
    - `npm start` runs the app
    - `npm test` runs the mocha and && chai tests
    - `npm run scan` scans the app with the standard library
- frontend: port `3000`
    - `npm start` runs the app on dev mode
    - `npm run scan` scans the app with the standard library
    - `npm test` runs the jest tests 
