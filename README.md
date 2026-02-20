# FreeSchema To-Do List Application

This repository contains my submission for the **AI Developer Task** from Mentor Friends Pvt. Ltd.

It includes:
- **Task 1**: A full To-Do List web application built using **FreeSchema Data Fabric** (with CRUD operations: Create, Read/List, Update/Edit, Delete).
- **Task 2**: Website created using the WICO system (Widget Conceptualizer) on develop.freeschema.com.
- **Task 3**: Registration and brief exploration as a Business Client on a2aorchestra.com.

Task 1 - Todo Application

The To-Do List app is a Vite + React + TypeScript project with FreeSchema integration for task data persistence and user authentication.


All **CRUD operations** for tasks are handled in the `/todo` route and related components (create-task.tsx, task-list.tsx, etc.).

## Features Implemented (Task 1 Requirements)

- **Create Task**: Add new to-do items via a form.
- **List Tasks**: Display all created tasks in a list view.
- **Edit Tasks**: Modify existing tasks (inline or modal edit).
- **Delete Tasks**: Remove tasks with confirmation.
- User authentication required: Register → Login → Access /todo.
- Data managed via FreeSchema Data Fabric (queries, mutations for tasks tied to user).

## Setup & Run Instructions

Follow these steps to run the application locally:

1. Clone the repository
   ```bash
   git clone https://github.com/actulsi/FreeSchema-ToDo-List-Assignment
   cd FreeSchema-ToDo-List-Assignment

2. Install dependencies
npm install
# or
yarn install

3. Start the development server
npm run dev
# or
yarn dev

The app will run at http://localhost:5173 (or the port shown in terminal).

4. Usage Flow:
Go to /register → Create a new user account.
Go to /login → Log in with the registered credentials.
Navigate to /todo → Now you can create, view, edit, and delete tasks.
(Logout/login works across sessions thanks to FreeSchema auth.)

Task 2 – WICO Website Creation

Created a site using the WICO system (Widget Conceptualizer) via the invite link.
Site Link: https://boomconsole.com/invite/actulsi
(I followed the BoomConsole YouTube tutorials for widget-based site building)

Task 3 – Business Client Registration on a2aorchestra.com

Registered as a new Business Client using:
Email: test.tulsi@example.com

Exploration Notes & Impressions
After registration, I accessed the profile dashboard, which displays user stats, recent activity (with examples of deployments, reviews, payouts), and certification badges.
I liked most the strong emphasis on trust/security via protocol-level verification and certifications — it makes the platform feel secure and enterprise-grade for AI agent deployment.
A minor suggestion: Adding a quick onboarding guide or clearer distinction between demo and live data on first login could enhance the experience for new users.
