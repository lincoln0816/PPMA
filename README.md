# Personal Project Management Web Application
Overview
The Personal Project Management Web Application is designed to help users manage their personal projects and tasks efficiently. The application provides a clean and user-friendly interface for tracking project progress and handling tasks. It utilizes React.js and Next.js for the front-end, Node.js for the back-end, and integrates MongoDB and MySQL for data storage.

Core Features
## 1. Front-End Development (React.js + Next.js)
Project List Page:

Users can view a list of their projects.
Each project displays its title, description, and the number of associated tasks.
Task Management Page:

Users can view tasks related to a selected project.
Users can create new tasks, update existing ones, and mark them as complete.
UI/UX:

Responsive design for both desktop and mobile devices.
Basic styling with Material-UI for a modern and cohesive look.


## 2. Back-End Development (Node.js)
API Development:

Developed RESTful API endpoints for managing projects and tasks:
GET /projects - Retrieve all projects.
POST /projects - Create a new project.
GET /projects/:id/tasks - Retrieve all tasks for a specific project.
POST /projects/:id/tasks - Create a new task under a project.
PUT /tasks/:id - Update an existing task.
DELETE /tasks/:id - Delete a task.

Data Persistence:

MongoDB: Stores task details including title, description, status (e.g., pending, completed), and due date.
MySQL: Stores project information and basic user data.
## 3. Database Integration
MongoDB: Schema for managing tasks within projects.
MySQL: Schema for managing project metadata.
## 4. Version Control (Git/GitHub)
Repository Setup: Organized Git repository for the project.
Commit History: Regular commits with descriptive messages reflecting the development process.
## 5. Error Handling
Basic error handling implemented for both API and front-end forms, ensuring that users are informed when an issue arises.
## 6. Testing
Front-End: Unit tests written for key React components.
Back-End: Unit tests created for several API endpoints.
## 7. Documentation
A comprehensive README file explaining the project setup, structure, and how to run the application locally.
Optional (Stretch Goals)
User Authentication: Basic signup/login functionality using JWT (JSON Web Tokens).
Search/Filter Functionality: A search bar to filter projects or tasks by keywords.
Deployment: Deploy the application on platforms such as Vercel (for the front-end) and Heroku (for the back-end).

## Project Setup
Front-End
Navigate to the front-end directory:


npm install // for nodemodule
npm run dev // running front end, Next.app
open your brower and go to http://localhost:3000 to see the application.

Back-End
Navigate to the back-end directory:
npm install // for nodemodule
npm run dev // running backend
http://localhost:5000

bash
Copy code
cd backend
Install dependencies:

bash
Copy code
npm install
Set up environment variables: Create a .env file and add the following variables:

env
Copy code
MONGODB_URI=your_mongodb_connection_string
MYSQL_URI=your_mysql_connection_string
Run the server:



Project Structure
frontend/: Contains the React.js and Next.js code.
backend/: Contains the Node.js server code and API endpoints.
tests/: Contains unit tests for both front-end and back-end.
Contributing
Feel free to open issues or submit pull requests to improve the application.

License
This project is licensed under the MIT License. See the LICENSE file for details.
