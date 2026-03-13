# INF653-Homework8-Login-Page

## Assignment: Express.js Authentication and State Management
## Objective
Develop a server-side web application that demonstrates proficiency in user authentication, session persistence, and client-side state management using signed cookies.

## Technical Stack
- Framework: Express.js
- Template Engine: Handlebars (hbs)
- Middleware: express-session, cookie-parser
- Security: Signed Cookies, httpOnly flags

## 1. Data Structure (Predefined Users)
Do not use a database for this assignment. Instead, define an object in your app.js to store user credentials.

const users = {
    "admin": {
        username: "admin",
        password: "password123",
        fullName: "System Administrator",
        email: "admin@university.edu",
        bio: "Managing the campus network infrastructure."
    },
    "student_dev": {
        username: "student_dev",
        password: "dev_password",
        fullName: "Jane Developer",
        email: "jane.d@student.edu",
        bio: "Full-stack enthusiast and coffee drinker."
    }
};

## 2. Assignment Requirements
### Task A: Authentication Flow
1. Login Page: Create a GET /login route that renders a form with username and password fields.
2. Logic: Create a POST /login route.
   - Verify the credentials against the predefined users object.
   - If valid, store the user's data in the session (req.session.user).
   - If invalid, redirect back to login with an error message.
3. Logout: Implement a GET /logout route that destroys the session and clears the session cookie (connect.sid).

## Task B: Protected Profile Route
1. Middleware: Write an authentication middleware function to check if req.session.user exists.
2. Profile Page: Create a GET /profile route protected by your middleware.
   - Render the logged-in user's fullName, email, and bio.
   - If a non-authenticated user tries to access this page, redirect them to /login.

## Task C: Theme Management (Signed Cookies)
Implement a "Dark/Light Mode" toggle that persists even if the user logs out.
1. Route: Create a GET /toggle-theme route.
2. Logic: - Check the current value of a cookie named theme.
   - Toggle it between light and dark.
   - Store the new value as a signed cookie.
   - Security Requirement: The cookie MUST be httpOnly: true and signed: true.
3. Default: If no cookie exists, the system must default to light mode.
4. UI: Use the cookie value to apply a CSS class to the <body> or a container in your main Handlebars layout.

## 3. Submission Requirements
- Directory Structure:
  - /views: .hbs files (login, profile, layout).
  - /public: CSS files for light/dark themes.
  - app.js: Main server logic.
- Dependencies: Ensure all packages are listed in package.json.
- Secrets: Use a strong secret string for cookie-parser and express-session.
- Attach your github repository for this project onto Canvas Submission.
