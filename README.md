# Little_Guys_Games
Website for Little Guys Games

# Development Builds
This project is built using Vite for development.

To begin follow the steps below:  
1. clone the repository
2. navigate into the project folder
   ```bash
   cd little_guys_games
   ```
3. run npm install
   ```bash
   npm i
   ```
   **If you do not have Node and NPM, get it here:** [Download Node](https://nodejs.org/en/download)
4. Once npm is installed open the project folder in your editor of choice
5. Create a `.env` file in the project root folder with the following keys
   ```
   SERVER_PORT=3000
   RESEND_API_KEY=YOUR_RESEND_API_KEY
   EMAIL_RECIPIENT=YOUR_EMAIL
   FROM_EMAIL=applicant@resend.dev
   ```
6. Run the dev task
   ```bash
   npm run dev
   ```
   If you've done everything successfully your terminal should output something similar to the following:  
   ```bash
    VITE v6.0.11  ready in 87 ms
   ➜  Local:   http://localhost:5173/
   ➜  Network: use --host to expose
   ➜  press h + enter to show help
   ```


# Production Builds
To build a distribution of the project simply run the following command
1. make sure that the server url is updated to where you are going to host the site in `src/network/api-client.js`
2. run the docker build command
   ```
   npm run docker:build
   ```
   **NOTE** The docker command assumes you are building the image on Windows via WSL.
3. push to host server.

## IMPORTANT
Currently the `Dockerfile` embeds the `.env` file into the container! This means you should NOT push the container image to a public container registry!

If you do not have a private container registry you should edit the Dockerfile so that the .env file is not included and pass in the `.env` file when starting your container on your host.
