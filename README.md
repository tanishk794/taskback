Process to setup node server on local machine



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

