# Student Timetable Management System

A web application for managing student timetables and class schedules.

## Overview

This application provides a platform for managing student information and class timetables. It features separate interfaces for administrators and students, allowing administrators to create and manage classes and timetables, while students can view their schedules.

## Features

- **User Authentication**: Login and registration for students and administrators
- **Admin Dashboard**: Manage classes, students, and timetables
- **Timetable Management**: Create, edit, and delete class schedules
- **PDF Export**: Download timetables as PDF files
- **Student Portal**: Students can view their class schedules

## Tech Stack

### Frontend
- React.js
- React Router for navigation
- Tailwind CSS for styling
- Bootstrap components
- Framer Motion for animations
- Axios for API requests
- jsPDF for PDF generation

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB

### Installation

1. Clone the repository
```bash
git clone <repository-url>
```

2. Install server dependencies
```bash
cd server
npm install
```

3. Install client dependencies
```bash
cd client
npm install
```

4. Create a `.env` file in the server directory with the following variables:
```
PORT=5500
MONGODB_URL=mongodb://localhost:27017/timetable-db
```

### Running the Application

1. Start the server
```bash
cd server
npm start
```

2. Start the client
```bash
cd client
npm start
```

3. Access the application at `http://localhost:3000`

## Project Structure

- `/client` - React frontend application
- `/server` - Node.js backend API
  - `/Controller` - API controllers
  - `/Routes` - API routes
  - `/model` - Database models

## License

This project is licensed under the ISC License.
