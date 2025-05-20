# ReDI Bootcamp Final Project - Library Management System

## Overview

This is a simple Library Management System built for educational purposes using Next.js (App Router), React, Tailwind CSS, and MongoDB. The code is beginner-friendly and well-commented in English.


---

## Getting Started

### 1. Prerequisites

- Node.js (v18 or higher)
- yarn (recommended; install with `npm install -g yarn` if needed)
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register))

### 2. Installation

```bash
yarn set version stable
yarn install
```

### 3. Environment Variables

You should use **MongoDB Atlas (cloud)** for your database. This is free and easy to set up.

#### How to set up MongoDB Atlas (cloud):

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) and create a free account.
2. Create a free cluster (choose a region close to you).
3. Create a database user and password (save these for your connection string).
4. Go to "Network Access" and allow access from your IP or `0.0.0.0/0` (for development).
5. Go to "Clusters" → "Connect" → "Connect your application" and copy the connection string.
   - It looks like: `mongodb+srv://<username>:<password>@<cluster-url>.mongodb.net/?retryWrites=true&w=majority`
6. Update your `.env.local` file in the root folder:

```
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>.mongodb.net/librarydb?retryWrites=true&w=majority
JWT_SECRET=<your-jwt-secret>
```

- Replace `<username>`, `<password>`, and `<cluster-url>` with your Atlas details.
- `librarydb` is your database name (you can choose another name).

**How to create a JWT secret:**

- You can use any long, random string as your JWT secret.
- For example, you can generate one in your terminal with:
  ```bash
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
  ```
- Copy the output and use it as your `JWT_SECRET` value in `.env.local`.

### 4. Running the App

```bash
yarn cache clean
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000)

---

## Project Structure

```
final-project/
├── app/ # Next.js app directory (App Router)
│ ├── api/ # API routes (books, auth)
│ ├── books/ # Books page (list books, add book form, CRUD, preferiti)
│ ├── login/ # Login page (gestione JWT client-side)
│ ├── register/ # Register page
│ ├── profile/ # User profile page (preferiti, info utente)
│ ├── layout.jsx # Main layout (includes Navbar, Footer)
│ └── page.jsx # Home page
├── components/ # Reusable UI components (Navbar dinamica, Footer)
├── lib/ # Utility functions (MongoDB connection)
├── models/ # Mongoose models (Book, User)
├── public/ # Static assets
├── styles/ # Tailwind and global CSS
├── .env.example # Example environment variables
├── package.json # Project dependencies
└── README.md # Project documentation
```

### API, Lib, and Models

#### `/api`

This folder contains all the backend API route handlers for the application. Each file or subfolder inside `/api` maps to an API endpoint (e.g., `/api/books`). These handlers process HTTP requests (GET, POST, etc.), interact with the database, and return JSON responses. You should keep all backend logic that needs to be exposed as an API here.

- **How to manage:**
  - Add new files for new API endpoints.
  - Use RESTful conventions for routes (e.g., `/api/books`, `/api/auth/login`).
  - Keep API code focused on request handling and data operations.

#### `/lib`

This folder is for utility functions and modules that are shared across your backend or frontend code. For example, database connection logic (like `mongodb.js`) is placed here so it can be reused by multiple API routes.

- **How to manage:**
  - Place helper functions, configuration, or reusable logic here.
  - Do **not** put business logic that belongs to a specific feature or model here.

#### `/models`

This folder contains your database models (e.g., Mongoose schemas for MongoDB). Each model defines the structure of your data and how it is stored in the database. Models are imported and used in your API route handlers to interact with the database.

- **How to manage:**
  - Create a separate file for each data model (e.g., `Book.js`, `User.js`).
  - Only define schema and model logic here; do not put unrelated code.

---

## Features

- **User Authentication:**
  - User registration and login with JWT (token saved client-side)
  - Dynamic navbar: shows Login/Sign Up or Profilo/Logout based on authentication
- **Books Management:**
  - List all books
  - Add new book with form (title, author, description)
  - Edit and delete books (CRUD)
- **Favorites System:**
  - Users can add/remove books from their favorites
  - Favorites visible in user profile
- **User Profile:**
  - View user info and list of favorite books
- **Responsive Design:**
  - Tailwind CSS for modern, mobile-friendly look
- **UX Improvements:**
  - Clear error/success messages in all forms
  - Navbar updates automatically based on login status

```

```
