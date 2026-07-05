-- =========================
-- DATABASE
-- =========================
DROP DATABASE IF EXISTS bracu_faculty_review;
CREATE DATABASE bracu_faculty_review
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;

USE bracu_faculty_review;

SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS queries;
DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS faculty;
DROP TABLE IF EXISTS users;

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
  courses TEXT NULL,          
  PRIMARY KEY (id)
) ENGINE=InnoDB;

-- =========================
-- REVIEWS
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
-- QUERIES
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
-- COMMENTS
-- =========================
CREATE TABLE comments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  query_id INT NOT NULL,
  user_id INT NOT NULL,
  body TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (query_id) REFERENCES queries(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- =========================
-- email: admin@bracu.ac.bd   pass : Admin1234
-- =========================
INSERT INTO users (name, email, password_hash, role)
VALUES ('Super Admin', 'admin@bracu.ac.bd', '$2b$10$9h0xGeve1xZYRovLfgKfJ.a5yTktz0B1tMUcz8B1qagF2y/ZKuGTe', 'admin');

SET FOREIGN_KEY_CHECKS = 1;
