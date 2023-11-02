# Cab_Booking


## Project Description
A web application for a cab system where users can enter the source and destination and they will be provided with the shortest time and estimated cost.
![image](https://github.com/Aniruddha-Patil-15/Cab_Booking/assets/94295937/3a596283-8941-44be-84e1-da5d5b7ab5c6)
●	The user should be able to book a cab by providing the user's email, source, and destination
●	The system should be able to calculate the shortest possible time from source to destination. E.g. There are multiple ways from A to D, but the shortest route will be via C.
●	There are a total of 5 cabs with different pricing. (Price/minute)
○	No cab should have an overlapping start and end time
●	The system should provide the estimated cost depending on the cab chosen and the time taken to reach the destination.
●	The system should be able to track the cab booking
●	Users should be able to view and edit the cabs and their pricing.


## Folder Structure

Your project should have the following folder structure:

frontend/ # Contains your React frontend

src/ # React source code
src/components #all required files inside the folder
package.json # Frontend dependencies
server/ # Contains your Express server

index.js # Server entry point
package.json # Server dependencies
## Installation

To get started with this project, follow these steps:

Clone this repository to your local machine.

git clone <repository-url>

Install dependencies for the frontend and server.
npm install

Start the frontend and server.
For the frontend (inside the frontend folder):

npm run serve

For the server (inside the server folder):

nodemon index.js
