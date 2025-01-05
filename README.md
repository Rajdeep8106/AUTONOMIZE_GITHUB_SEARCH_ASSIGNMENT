/project
├── /backend
│   ├── /models
│   │   └── User.js
│   ├── /routes
│   │   └── githubRoutes.js
│   ├── /controllers
│   └── server.js
├── /frontend
│   ├── /src
│   │   ├── /components
│   │   │   ├── UserForm.js
│   │   │   ├── UserRepositoryList.js
│   │   │   └── RepositoryDetail.js
│   │   ├── /hooks
│   │   └── App.js
└── README.md
This project implements both the **backend** (Node.js and Express.js) and **frontend** (React.js) for interacting with GitHub data.
The backend fetches user details from the GitHub API and stores them in a database, while the frontend allows users to search for GitHub usernames and view repository information.
Backend API
1. Save GitHub User Data
Endpoint: `POST /api/github/:username`
- Fetches the GitHub user data from the GitHub API and saves it into the database. If the user already exists, it does not call the GitHub API again.
Request Example:
POST /api/github/:username
2. Find Mutual Followers and Save as Friends
Endpoint: GET /api/friends/:username
Finds mutual followers of a given user and stores them as friends.
Request Example:
GET /api/friends/:username
3. Search Users
Endpoint: GET /api/search
Allows searching users based on attributes like username or location.
Request Example:
GET /api/search?username=:username&location=:location
4. Soft Delete a User Record
Endpoint: DELETE /api/users/:username
Soft deletes a user based on their GitHub username.
Request Example:
DELETE /api/users/:username
5. Update User Information
Endpoint: PUT /api/users/:username
Updates fields like location, blog, and bio for a user.
Request Example:
PUT /api/users/:username
6. Get List of Users Sorted by Fields
Endpoint: GET /api/users
Fetches all users from the database sorted by fields like public repos, followers, etc.
Request Example:
GET /api/users?sortBy=public_repos&order=asc

Frontend Application


Features
GitHub Username Input:
Input box for entering a GitHub username to search for data.
Repository List:
Displays a list of repositories for the given username, along with useful info like avatar and bio.
Repository Details:
Clicking on a repository shows more details such as the description.
Followers Page:
A link near the user info leads to a page that shows the followers of the user.
Follower Details:
Clicking a follower redirects to that follower's repository list.
Navigation:
Ability to navigate back to the main repository list with the search input.
Development Details
React Hooks:
All components use React hooks for managing state and side effects.
State Management:
Data (user info, repositories, followers) can be managed using React Context API or Redux.
API Caching:
Data is cached after the first fetch to prevent multiple API calls.
Styling:
No CSS frameworks are used. Custom CSS is written for styling.
Single Page Application:
The entire app runs on a single URL (SPA), and no browser history management is require

Technologies Used

Backend:
Node.js
Express.js
MONGODB

Frontend:
React.js
React Hooks
CSS (Custom, no frameworks)
