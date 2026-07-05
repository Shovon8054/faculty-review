# Faculty Review Portal

Faculty Review Portal is a full-stack web application that enables students to provide structured feedback and ratings for faculty members while allowing administrators to manage faculty profiles, users, reviews, and discussion posts. The platform implements secure authentication, role-based access control, and a multi-criteria rating system to ensure a reliable and transparent review experience.

---

## Features

### Student

| Feature              | Description                                                |
| -------------------- | ---------------------------------------------------------- |
| Registration         | Sign up using a **`@g.bracu.ac.bd`** email address         |
| Authentication       | Secure JWT-based login                                     |
| Faculty Directory    | Browse faculty members and view detailed profiles          |
| Faculty Rating       | Rate faculty based on **Teaching, Marking, and Behaviour** |
| Overall Rating       | Automatically calculated from individual ratings           |
| Review Management    | Create, edit, and delete personal reviews                  |
| Duplicate Prevention | Only one review is allowed per faculty member              |
| Discussion Forum     | Create academic queries and participate in discussions     |
| Comments             | Comment on discussion posts                                |
| Profile              | View personal account information                          |

### Administrator

| Feature             | Description                                              |
| ------------------- | -------------------------------------------------------- |
| Secure Access       | Admin-only authentication (public registration disabled) |
| Faculty Management  | Add, update, and remove faculty profiles                 |
| Faculty Information | Manage designation, courses, and educational background  |
| User Management     | View, block, and remove registered users                 |
| Review Moderation   | Hide or delete inappropriate reviews                     |
| Forum Moderation    | Manage discussion posts and comments                     |
| Dashboard           | Monitor users, faculty, and platform activity            |

---

## Key Highlights

* JWT Authentication
* Protected Routes
* Role-Based Access Control (Student & Admin)
* BRAC University Email Verification (`@g.bracu.ac.bd`)
* Multi-Criteria Faculty Rating System
* Automatic Overall Rating Calculation
* Faculty Review Management (CRUD)
* Duplicate Review Prevention
* Faculty Profile Management
* Student Discussion Forum
* Administrative Dashboard
* Responsive User Interface

---

## Technology Stack

| Category       | Technologies                                |
| -------------- | ------------------------------------------- |
| Frontend       | React.js, React Router, Tailwind CSS, Axios |
| Backend        | Node.js, Express.js                         |
| Database       | MySQL                                       |
| Authentication | JSON Web Token (JWT)                        |

---

---

## Project Objectives

The Faculty Review Portal aims to create a transparent and constructive feedback system where students can evaluate faculty members while administrators maintain the integrity of the platform through effective moderation and management.

This project demonstrates practical experience with:

* Full-Stack Web Development
* RESTful API Development
* JWT Authentication & Authorization
* Role-Based Access Control (RBAC)
* CRUD Operations
* Relational Database Design
* Secure Backend Development
* Responsive Frontend Development
* Client–Server Architecture
