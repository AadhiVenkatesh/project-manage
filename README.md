Testing Endpoints in Postman

1. Test User Registration
   
Method: POST

URL: http://localhost:5000/api/auth/register

Headers:
Content-Type: application/json

Body:
Select raw and JSON format.
Example JSON body:
json
Copy code
{
  "username": "testuser",
  "password": "testpassword"
}
Click: Send

3. Test User Login
   
Method: POST

URL: http://localhost:5000/api/auth/login

Headers:
Content-Type: application/json
Body:
Select raw and JSON format.
Example JSON body:
json
Copy code
{
  "username": "testuser",
  "password": "testpassword"
}
Click: Send

Note: Save the JWT token received in the response. You will need this token for authenticated requests.

5. Test Creating a Project
   
Method: POST

URL: http://localhost:5000/api/projects

Headers:
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
Body:
Select raw and JSON format.
Example JSON body:
json
Copy code
{
  "name": "New Project"
}
Click: Send

7. Test Viewing All Projects
   
Method: GET

URL: http://localhost:5000/api/projects

Headers:
Authorization: Bearer YOUR_JWT_TOKEN
Click: Send

9. Test Updating a Project

Method: PUT

URL: http://localhost:5000/api/projects/{projectId}

Headers:
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
Body:
Select raw and JSON format.
Example JSON body:
json
Copy code
{
  "name": "Updated Project Name"
}
Click: Send

10. Test Deleting a Project

Method: DELETE

URL: http://localhost:5000/api/projects/{projectId}

Headers:
Authorization: Bearer YOUR_JWT_TOKEN
Click: Send

11. Test Creating a Task

Method: POST

URL: http://localhost:5000/api/tasks

Headers:
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
Body:
Select raw and JSON format.
Example JSON body:
json
Copy code
{
  "title": "New Task",
  "description": "Task description",
  "status": "To Do",
  "projectId": "project_id_here"
}
Click: Send

12. Test Viewing All Tasks for a Project

Method: GET

URL: http://localhost:5000/api/tasks?projectId={projectId}

Headers:
Authorization: Bearer YOUR_JWT_TOKEN
Click: Send

13. Test Updating a Task

Method: PUT

URL: http://localhost:5000/api/tasks/{taskId}

Headers:
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
Body:
Select raw and JSON format.
Example JSON body:
json
Copy code
{
  "title": "Updated Task Title",
  "description": "Updated description",
  "status": "In Progress"
}
Click: Send

14. Test Deleting a Task

Method: DELETE

URL: http://localhost:5000/api/tasks/{taskId}

Headers:
Authorization: Bearer YOUR_JWT_TOKEN
Click: Send

1. Local Development Setup

Frontend (React)

Navigate to the Frontend Directory:

bash
Copy code
cd path/to/your/frontend
Install Dependencies:

bash
Copy code
npm install
This command installs all the dependencies specified in package.json.

Start the Development Server:

bash
Copy code
npm start
This will start the React development server, typically running at http://localhost:3000.

Verify:

Open a browser and navigate to http://localhost:3000 to see your React application in action.
Backend (Node.js/Express)
Navigate to the Backend Directory:

bash
Copy code
cd path/to/your/backend
Install Dependencies:

bash
Copy code
npm install
This installs all the dependencies specified in package.json.

Start the Backend Server:

bash
Copy code
npm start
Ensure that your package.json includes a start script that starts your Express server.

Verify:

The backend server should be running on http://localhost:5000 or whatever port you have configured.
2. Deployment Setup
Deploying to Heroku (Backend)
Prepare Your Application for Deployment:

Ensure all environment variables and configurations are set correctly.
Create and Deploy to Heroku:

Navigate to your backend directory and follow the steps to deploy to Heroku:
bash
Copy code
cd path/to/your/backend
heroku login
heroku create
git push heroku master
Set environment variables on Heroku:
bash
Copy code
heroku config:set MONGODB_URI=<your_mongodb_uri>
heroku config:set JWT_SECRET=<your_jwt_secret>
Verify Deployment:

Open the Heroku app URL to ensure your backend is running correctly.
Deploying to Netlify (Frontend)
Build Your React Application:

Navigate to your frontend directory and build your application:
bash
Copy code
cd path/to/your/frontend
npm run build
The build files will be located in the build directory.
Deploy to Netlify:

Go to the Netlify dashboard, click "New site from Git," and connect your GitHub repository.

Configure build settings: set the build command to npm run build and the publish directory to build.

Alternatively, use the Netlify CLI:

bash
Copy code
netlify deploy --prod
Follow the prompts to deploy your build directory.

Verify Deployment:

Open the Netlify URL to ensure your React application is live.
3. Connect Frontend and Backend
Update API URLs in Frontend:

Ensure that your React app is configured to use the correct API URL of your deployed backend. For example, in .env:
env
Copy code
REACT_APP_API_URL=https://your-backend.herokuapp.com
Test:

Verify that the frontend can successfully communicate with the backend. Check all API calls to ensure they are functioning correctly.
