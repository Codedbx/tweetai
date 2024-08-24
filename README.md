# TweetAI

## Overview

`TweetAI` is a full-stack web application with two main components:
1. **Backend**: Built with Node.js, Express, Sequelize, and includes cron jobs for creating autobots.
2. **Frontend**: Built with Vue.js, providing an interface for users to interact with the TweetAI service.

### Project Structure

- `backend/`: Contains server-side code including API routes, database configuration, and scheduled jobs.
- `frontend/`: Contains client-side code using Vue.js.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Node.js** (v14.x or later)
- **npm** (v6.x or later)
- **MySQL** or **PostgreSQL** (depending on your database choice)
- **Git**

## Setup Instructions

### 1. Clone the Repository

### Clone the project repository from GitHub:

git clone https://github.com/Codedbx/tweetai.git
cd tweetai

### Navigate to the Backend Directory

cd backend
npm install

### Navigate to the Config/db.js and update the variables 

const databaseName = 'tweetai';
const username = 'enteryoudbusername';  
const password = 'enteryoudbpassword';  
const host = 'dbhostName';

### Update the cors ensure that your frontend is running on else update the server.js file 
### change the URL and port to the port you front end is running on.

http://localhost:8080 

### Run the backend ensure 
node server.js

## Setup the Frontend

### Navigate to the Frontend Directory
cd tweetai/frontend
npm install

### ensure that your backend is running on http://localhost:3000'
### update the src/components/AutoBot.vue file change the base URL to the server URL


## Run the frontend
### Navigate to tweetai/frontend

npm run serve



### Developers api documentations, ensure that your backend runs on port 3000 
### else update src/components/AutoBot.vue file also for easy access from the dashboard. 
http://localhost:3000/api-docs
