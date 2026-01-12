-- creating database

CREATE DATABASE resume_builder;

-- create table user for login 

USE resume_builder;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    pro_title VARCHAR(100),
    email VARCHAR(150) UNIQUE NOT NULL,
    phone INT NOT NULL,
    location VARCHAR(100) NOT NULL,
    created_at DATETIME CURRENT_TIMESTAMP
 );

--  create professional experience team

CREATE TABLE professional_experience (
 id INT auto_increment PRIMARY KEY,
 user_id INT NOT NULL,
 job_role VARCHAR(100),
 professional_title VARCHAR(100),
 joining_date DATE,
 job_location VARCHAR(100),
 work_type ENUM('WFH','WFO'),
 FOREIGN KEY (user_id) REFERENCES users(id)
 ON DELETE CASCADE
);