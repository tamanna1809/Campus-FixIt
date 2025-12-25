# CampusFixit

CampusFixit is a mobile application that allows students to report campus facility issues (like broken ACs, water leaks, etc.) and allows administrators to track and manage these issues.

## Features

- **Student Reporting**: Students can create accounts, report issues with images and locations, and track the status of their reports.
- **Admin Management**: Admins can view all reported issues, update their status (Open -> In Progress -> Resolved), and add remarks.
- **Real-time Updates**: Home screen updates dynamically with the latest reports.

## Getting Started

### Prerequisites

- Node.js installed
- MongoDB installed and running locally on port 27017

### Installation

1.  **Clone the repository** (if applicable)

2.  **Install Dependencies**

    ```bash
    # Install server dependencies
    cd server
    npm install

    # Install app dependencies
    cd ..
    npm install
    ```

3.  **Start the Backend Server**

    ```bash
    cd server
    # Start with nodemon for auto-reload
    npx nodemon index.js
    ```

    The server will run on `http://localhost:8000`.

4.  **Start the Expo App**
    ```bash
    # From the root directory
    npx expo start -c
    ```

## Admin Access

To access admin features (currently backend-only for security), use the following credentials:

- **Email**: `admin@campusfixit.com`
- **Password**: `adminpassword123`

## API Documentation

**Base URL**: `http://localhost:8000/api`

### Authentication Endpoints (`/api/auth`)

#### 1. Register User

- **Method**: `POST`
- **Path**: `/register`
- **Body**:
  ```json
  {
    "name": "User Name",
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Description**: Creates a new user account with the default role of "student".

#### 2. Login

- **Method**: `POST`
- **Path**: `/login`
- **Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Description**: Authenticates a user and returns a JWT token along with user details.

---

### Issue Endpoints (`/api/issues`)

#### 1. Get All Issues (Admin)

- **Method**: `GET`
- **Path**: `/all`
- **Headers**: `Authorization: <token>`
- **Description**: Returns a list of all issues reported by all users. typically used by admins.

#### 2. Get My Issues (Student)

- **Method**: `GET`
- **Path**: `/mine`
- **Headers**: `Authorization: <token>`
- **Description**: Returns all issues reported by the logged-in user, sorted by date (newest first).

#### 3. Create Issue

- **Method**: `POST`
- **Path**: `/create`
- **Headers**: `Authorization: <token>`
- **Body**:
  ```json
  {
    "title": "Broken AC",
    "description": "AC in room 101 not cooling",
    "category": "Maintenance",
    "location": "Room 101",
    "image": "base64string..."
  }
  ```
- **Description**: Creates a new issue report linked to the logged-in user.

#### 4. Update Issue Status (Admin)

- **Method**: `PUT`
- **Path**: `/:id/status`
- **Headers**: `Authorization: <token>`
- **Body**:
  ```json
  {
    "status": "In Progress" | "Resolved",
    "remarks": "Technician assigned" // Optional
  }
  ```
- **Description**: Updates the status of a specific issue and optionally adds admin remarks as well.
