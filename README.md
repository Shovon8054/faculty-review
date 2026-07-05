# Faculty Review Portal

Faculty Review Portal is a full-stack web application that enables students to provide structured feedback and ratings for faculty members while allowing administrators to manage faculty profiles, users, and student discussions. The platform implements secure authentication, role-based access control, and a multi-criteria rating system to ensure a transparent and reliable review experience.

---

## Features

### Student

| Feature              | Description                                                               |
| -------------------- | ------------------------------------------------------------------------- |
| Registration         | Register with **Name**, **`@g.bracu.ac.bd`** email, and password          |
| Authentication       | Secure JWT-based login with protected routes                              |
| Faculty Directory    | Browse faculty members and view detailed profiles                         |
| Faculty Ratings      | Rate faculty based on **Teaching**, **Marking**, and **Behaviour** (1–5)  |
| Overall Rating       | Automatically calculated as the average of the three ratings              |
| Reviews              | Submit one review per faculty member with ratings and an optional comment |
| Review Management    | Edit or delete personal reviews                                           |
| Duplicate Prevention | One review per student per faculty member                                 |
| Faculty Statistics   | View average Teaching, Marking, Behaviour, and Overall ratings            |
| Discussion Forum     | Create query posts and participate in discussions                         |
| Comments             | Comment on other students' query posts                                    |
| Profile              | View personal profile information                                         |

### Administrator

| Feature             | Description                                             |
| ------------------- | ------------------------------------------------------- |
| Authentication      | Secure admin login (public registration is disabled)    |
| Faculty Management  | Add, edit, and delete faculty profiles                  |
| Faculty Information | Manage designation, courses, and educational background |
| User Management     | View all users, block users, and delete user accounts   |
| Forum Moderation    | Monitor and manage student query posts and comments     |
| Dashboard           | View and manage users, faculty, and platform activity   |

> **Demo Admin Credentials**
>
> **Email:** `admin@bracu.ac.bd`
> **Password:** `Admin1234`

---

## Review System

Each faculty review includes:

| Field         | Description                                                  |
| ------------- | ------------------------------------------------------------ |
| Teaching      | Rating from **1–5**                                          |
| Marking       | Rating from **1–5**                                          |
| Behaviour     | Rating from **1–5**                                          |
| Overall Score | Automatically calculated as the average of the three ratings |
| Comment       | Optional written feedback                                    |

---

## Key Features

* JWT Authentication
* Protected Routes
* Role-Based Access Control (Student & Admin)
* BRAC University Email Verification (`@g.bracu.ac.bd`)
* Multi-Criteria Faculty Rating System
* Automatic Overall Rating Calculation
* Faculty Review Management (Create, Update, Delete)
* Duplicate Review Prevention
* Faculty Profile Management
* Student Query & Discussion Forum
* Administrative Dashboard
* User Management
* Responsive User Interface

---

## Technology Stack

| Category           | Technologies                                |
| ------------------ | ------------------------------------------- |
| **Frontend**       | React.js, React Router, Tailwind CSS, Axios |
| **Backend**        | Node.js, Express.js                         |
| **Database**       | MySQL                                       |
| **Authentication** | JSON Web Token (JWT)                        |

---

---

## Project Objectives

The Faculty Review Portal aims to provide students with a transparent platform to share constructive feedback about faculty members while enabling administrators to efficiently manage faculty information, users, and student-generated content.

This project demonstrates practical experience with:

* Full-Stack Web Development
* RESTful API Development
* JWT Authentication & Authorization
* Role-Based Access Control (RBAC)
* CRUD Operations
* Relational Database Design (MySQL)
* Secure Backend Development
* Responsive Frontend Development
* Client–Server Architecture
