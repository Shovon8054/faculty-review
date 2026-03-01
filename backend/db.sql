-- =========================
-- DATABASE
-- =========================
DROP DATABASE IF EXISTS bracu_faculty_review;
CREATE DATABASE bracu_faculty_review
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;

USE bracu_faculty_review;

-- =========================
-- USERS (students + admin)
-- =========================
CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(80) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('student','admin') NOT NULL DEFAULT 'student',
  is_blocked TINYINT NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB;

-- =========================
-- FACULTY
-- =========================
CREATE TABLE faculty (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(120) NOT NULL,
  department VARCHAR(80) NULL,
  dp_url VARCHAR(255) NULL,
  graduated_institution VARCHAR(180) NULL,
  courses TEXT NULL,          -- "CSE110, CSE220, CSE221"
  PRIMARY KEY (id)
) ENGINE=InnoDB;

-- =========================
-- REVIEWS (ratings + optional comment)
-- Prevent duplicate review: UNIQUE(user_id, faculty_id)
-- Admin can hide abusive review: is_deleted
-- =========================
CREATE TABLE reviews (
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  faculty_id INT NOT NULL,

  teaching TINYINT NOT NULL,
  marking TINYINT NOT NULL,
  behaviour TINYINT NOT NULL,
  comment TEXT NULL,

  is_deleted TINYINT NOT NULL DEFAULT 0,

  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  PRIMARY KEY (id),
  UNIQUE KEY uq_user_faculty (user_id, faculty_id),

  CONSTRAINT fk_reviews_user
    FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE RESTRICT ON UPDATE CASCADE,

  CONSTRAINT fk_reviews_faculty
    FOREIGN KEY (faculty_id) REFERENCES faculty(id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

-- =========================
-- QUERIES (Posts + Comments in one table)
-- parent_id = NULL => post
-- parent_id != NULL => comment
-- =========================
CREATE TABLE queries (
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  parent_id INT NULL,
  body TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),

  CONSTRAINT fk_queries_user
    FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE ON UPDATE CASCADE,

  CONSTRAINT fk_queries_parent
    FOREIGN KEY (parent_id) REFERENCES queries(id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

-- =========================
-- SEED SUPER ADMIN (hash password in Node and paste here)
-- email: admin@bracu.ac.bd
-- pass: superadmin123
-- =========================
INSERT INTO users (name, email, password_hash, role)
VALUES ('Super Admin', 'admin@bracu.ac.bd', '$2b$10$REPLACE_WITH_BCRYPT_HASH', 'admin');