Process to setup node server on local machine
1 Install Dependancies
npm install

2 Configure Environment Variables  
Create a `.env` file in the root of your backend project if not already there. (I have added my .env file in repository)
    
3 Start the server
npm start

I have opened all the IPs in my mongoDB and my database is running on mongo cloud. MongoDB sometimes stop the server. I will try to check regularly that it is running.

AUTH API
1 User Registration  
Method: POST  
Endpoint: /api/auth/register  
Description: Creates a new user account.  

2️ User Login  
Method: POST  
Endpoint: /api/auth/login  
Description: Authenticates a user and returns a token.  

TASK API
1️ Create a Task  
Method: POST  
Endpoint: /api/tasks/  
Description: Creates a new task for the authenticated user.  
 

2️ Get Tasks for a Specific Date  
Method: GET  
Endpoint: /api/tasks/date/:date  
Description: Fetches all tasks that match the given taskDate.  

3️ Update a Task  
Method: PUT  
Endpoint: /api/tasks/:taskId  
Description: Updates an existing task by its taskId.  


4️ Delete a Task  
Method: DELETE  
Endpoint: /api/tasks/:taskId  
Description: Deletes a specific task by its taskId.  

