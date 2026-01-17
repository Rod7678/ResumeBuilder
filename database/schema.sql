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
 joining_date DATE,
 leaving_date DATE,
 job_location VARCHAR(100),
 work_type ENUM('WFH','WFO'),
 currently_working ENUM('YES','NO'),
 FOREIGN KEY (user_id) REFERENCES users(id)
 ON DELETE CASCADE
);


-- create education detail tavle 

CREATE TABLE education_details (
    id INT auto_increment PRIMARY KEY,
    user_id INT NOT NULL,
    institute_name VARCHAR(100) NOT NULL,
    degree VARCHAR(100) NOT NULL,
    field_of_study VARCHAR(100),
    start_date DATE,
    end_date DATE,
    grade VARCHAR(100),
    location VARCHAR(100),
    FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE
)


-- create projects table 
CREATE TABLE projects (
    id INT auto_increment PRIMARY KEY,
    user_id INT NOT NULL,
    project_title VARCHAR(150) NOT NULL,
    description TEXT,
    technologies VARCHAR(255),
    project_link VARCHAR(255),
    start_date DATE,
    end_date DATE,
    FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE
)