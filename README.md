# React + Vite
<h1>Learning Management System - MERN Stack Project</h1>
<p><a href="https://learning-management-system-dashboard-1.onrender.com">Click Here</a> to view live</p>

<h2>About This Project</h2>
<p>This is a simple, full stack Learning Management System built using the
MERN stack - MongoDB, Express, React, and Node.js.</p>
<p>The idea behind this project is straightforward give admins and
instructors one clean dashboard to manage everything related to online
learning - who's enrolled, what courses are available, who paid and
whether any discount coupons are active.</p>

<h2>Why I Built This</h2>
<p>Managing students, courses and payments across spreadsheets or
separate tools is messy. This app brings it all under one roof with
a proper login system, clean UI, and a secure backend - making it
practical for coaching centres, freelance tutors or anyone running
an online course business.</p>

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

<h2>What It Can Do</h2>
<h4>Users Management</h4>
<ul>
  <li>Register as a Student, Instructor or Admin</li>
  <li>Secure login with JWT based authentication</li>
  <li>View all registered users in a searchable table</li>
  <li>Delete users when needed</li>
</ul>

<h4>Course Management</h4>
<ul>
  <li>Add new courses with title, description, instructor, price,
  category and duration</li>
  <li>Edit or update course details anytime</li>
  <li>Delete courses with a confirmation step</li>
  <li>View all courses as clean cards</li>
</ul>

<h4>Payment Management</h4>
<ul>
  <li>Record a payment by selecting a student and a course</li>
  <li>Course price auto-fills - no manual entry needed</li>
  <li>Apply a coupon code for automatic discount calculation</li>
  <li>View all payment history with user and course details</li>
</ul>

<h4>Coupon Management</h4>
<ul>
  <li>Create discount codes like SAVE20 or WELCOME10</li>
  <li>Set a discount percentage, expiry date and usage limit</li>
  <li>Enable or disable coupons with one click</li>
  <li>System automatically validates coupons before applying them</li>
</ul>

<h2>Tack Stack(Technologies)</h2>
<p>Frontend - React(Vite)</p>
<p>Styling - Tailwind CSS</p>
<p>State - React Context API</p>
<p>HTTP - Axios(JWT interceptor)</p>
<p>Backend - Node.js and Express.js</p>
<p>Database - MongoDB and Mongoose</p>
<p>Auth - JWT and bcryptjs</p>

<h2>Getting Started</h2>
<h4>Prerequisites</h4>
<p>Node.js</p>
<p>MongoDB running locally or a MongoDB Atlas URI</p>

<h5>1. Clone the repo</h5>
<p>```bash
git clone https://github.com/your-username/lms-mern.git
cd lms-app
```</p>

<h5>2. Start the Backend</h5>
<p>```bash
cd backend
npm install
# Edit .env with your MongoDB URI and JWT secret
npm run dev
```</p>

<h5>3. Start the Frontend</h5>
<p>```bash
cd frontend
npm install
npm start
```</p>

<h5>Start both Frontend and BAckend simultaneoulsy</h5>
<p>```bash
   cd Ims-app
   npm run dev
   ```
</p>
<p>Note: Make root folder Ims-app inside that add both the folder of frontend and backend and npm install in both and in root folder Ims-app directly run npm run dev system will start and you can register yourself. If already root folder exist no need to make root folder but if not make the root folder.</p>

<p>Open `http://localhost:3000` — register an account and you're in.
</p>

lms-app/
├── backend/
│   ├── models/         → User, Course, Payment, Coupon schemas
│   ├── routes/         → API route handlers for each module
│   ├── middleware/     → JWT authentication middleware
│   └── server.js       → Express entry point
│
└── frontend/
└── src/
├── pages/      → Dashboard, Users, Courses, Payments, Coupons
├── context/    → AuthContext (global login state)
├── components/ → Navbar
└── api.js 

<h2> Security</h2>
<ul>
  <li>Passwords are encrypted using **bcryptjs** before saving</li>
  <li>JWT tokens expire after **7 days**</li>
  <li>All admin routes are protected - unauthenticated requests
  are blocked automatically</li>
  <li>Coupons are validated server - side for expiry, active status
  and usage limits before any discount is applied</li>
</ul>

<h2>Contributing</h2>
<p>Pull requests are welcome. For major changes, please open an issue
first to discuss what you'd like to change.</p>

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
