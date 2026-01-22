import express from "express";
import cors from "cors";
const app = express();
const PORT = 3000;
import { db } from "./db.js";

app.use(express.json());

// let users = [
//   { id: 1, user: "Rohit" },
//   { id: 2, user: "Rutuja" },
// ];

app.use(cors());

app.get("/api", (req, res) => {
  res.send({ hello: "hello world" });
});

app.get("/api/users", async (req, res) => {
  const [rows] = await db.query("SELECT * FROM users");
  res.json(rows);
});

app.get("/api/users/latest", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM users ORDER BY id DESC LIMIT 1",
    );
    if (!rows.length) {
      return res.status(404).json({ message: "user not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/users/:id", async (req, res) => {
  try {
    const [row] = await db.query("SELECT * FROM users WHERE id = ?", [
      req.params.id,
    ]);
    if (!row.length) {
      return res.status(404).json({ message: "user not found" });
    }
    res.json(row[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/users", async (req, res) => {
  try {
    const { full_name, email, phone, location, pro_title } = req.body;
    const [result] = await db.query(
      "INSERT INTO users (full_name, email, phone, location, pro_title) VALUES (?,?,?,?,?)",
      [full_name, email, phone, location, pro_title],
    );

    const userId = result.insertId;
    const [rows] = await db.query("SELECT * FROM users WHERE id = ? ", [
      userId,
    ]);

    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/professional/latest", async (req, res) => {
  try {
    const {
      jobrole,
      joiningDate,
      leavingDate,
      currentlyWorking,
      jobLocation,
      typeOfWork,
    } = req.body;

    const [users] = await db.query(
      "SELECT id FROM users ORDER BY id DESC LIMIT 1",
    );

    if (!users.length) {
      return res.status(400).json({ message: "No User exist " });
    }
    const userId = users[0].id;
    await db.query(
      "INSERT INTO professional_experience (user_id, job_role, joining_date, leaving_date, job_location, work_type , currently_working ) VALUES (?,?,?,?,?,?,?)",
      [
        userId,
        jobrole,
        joiningDate,
        leavingDate || null,
        jobLocation,
        typeOfWork,
        currentlyWorking,
      ],
    );

    res.status(201).json("professional experience added");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/professional/:id", async (req, res) => {
  try {
    const {
      jobrole,
      joiningDate,
      leavingDate,
      currentlyWorking,
      jobLocation,
      typeOfWork,
    } = req.body;
    const userId = req.params.id;
    await db.query(
      "INSERT INTO professional_experience (user_id, job_role, joining_date, leaving_date, job_location, work_type , currently_working ) VALUES (?,?,?,?,?,?,?)",
      [
        userId,
        jobrole,
        joiningDate,
        leavingDate || null,
        jobLocation,
        typeOfWork,
        currentlyWorking,
      ],
    );

    res.status(201).json("professional experience added");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/education/latest", async (req, res) => {
  try {
    const {
      instituteName,
      degree,
      fieldOfStudy,
      startDate,
      endDate,
      grade,
      schlocation,
    } = req.body;

    const [users] = await db.query(
      "SELECT id FROM users ORDER BY id DESC LIMIT 1",
    );

    if (!users.length) {
      return res.status(400).json({ message: "No user Exist" });
    }

    const userId = users[0].id;

    await db.query(
      "INSERT INTO education_details (user_id, institute_name, degree, field_of_study, start_date, end_date, grade, location) VALUES (?,?,?,?,?,?,?,?)",
      [
        userId,
        instituteName,
        degree,
        fieldOfStudy,
        startDate,
        endDate,
        grade,
        schlocation,
      ],
    );

    res.status(201).json({ message: "Education Added" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/education/:id", async (req, res) => {
  try {
    const {
      instituteName,
      degree,
      fieldOfStudy,
      startDate,
      endDate,
      grade,
      schlocation,
    } = req.body;

    const userId = req.params.id;

    await db.query(
      "INSERT INTO education_details (user_id, institute_name, degree, field_of_study, start_date, end_date, grade, location) VALUES (?,?,?,?,?,?,?,?)",
      [
        userId,
        instituteName,
        degree,
        fieldOfStudy,
        startDate,
        endDate,
        grade,
        schlocation,
      ],
    );

    res.status(201).json({ message: "Education Added" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/projects/latest", async (req, res) => {
  try {
    const {
      projectTitle,
      description,
      technologies,
      projectLink,
      startDate,
      endDate,
    } = req.body;

    const [users] = await db.query(
      "SELECT id FROM users ORDER BY id DESC LIMIT 1",
    );

    if (!users.length) {
      return res.status(400).json({ message: "No user Exist" });
    }

    const userId = users[0].id;

    await db.query(
      "INSERT INTO projects (user_id, project_title, description, technologies, project_link, start_date, end_date) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        userId,
        projectTitle,
        description,
        technologies,
        projectLink,
        startDate,
        endDate,
      ],
    );

    res.status(201).json({ message: "Project added" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/projects/:id", async (req, res) => {
  try {
    const {
      projectTitle,
      description,
      technologies,
      projectLink,
      startDate,
      endDate,
    } = req.body;

    const userId = req.params.id;

    await db.query(
      "INSERT INTO projects (user_id, project_title, description, technologies, project_link, start_date, end_date) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        userId,
        projectTitle,
        description,
        technologies,
        projectLink,
        startDate,
        endDate,
      ],
    );

    res.status(201).json({ message: "Project added" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/resume/latest", async (req, res) => {
  try {
    const [users] = await db.query(
      "SELECT id FROM users ORDER BY id DESC LIMIT 1",
    );
    
    if (!users.length) {
      return res.status(400).json({ message: "No user Exist" });
    }

    const userId = users[0].id;

    const [[user]] = await db.query("SELECT * FROM users WHERE id = ?", [
      userId,
    ]);
    const [professional] = await db.query(
      "SELECT * FROM professional_experience WHERE user_id = ?",
      [userId],
    );
    const [education] = await db.query(
      "SELECT * FROM education_details WHERE user_id = ?",
      [userId],
    );
    const [proects] = await db.query(
      "SELECT * FROM projects WHERE user_id = ?",
      [userId],
    );

    res.json({
      user,
      professional,
      education,
      proects,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.get("/api/resume/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const [[user]] = await db.query("SELECT * FROM users WHERE id = ?", [
      userId,
    ]);
    const [professional] = await db.query(
      "SELECT * FROM professional_experience WHERE user_id = ?",
      [userId],
    );
    const [education] = await db.query(
      "SELECT * FROM education_details WHERE user_id = ?",
      [userId],
    );
    const [proects] = await db.query(
      "SELECT * FROM projects WHERE user_id = ?",
      [userId],
    );

    res.json({
      user,
      professional,
      education,
      proects,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log("Backend listning on localhost:3000");
});
