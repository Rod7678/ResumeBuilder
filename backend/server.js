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

app.get("/api/users/:id", async (req, res) => {
  try{
    const [row] = await db.query("SELECT * FROM users WHERE id = ?", [req.params.id]);
    if(!row.length){
      return res.status(404).json({message: "user not found"})
    }
    res.json(row[0])
  }catch(err){
    res.status(500).json({error: err.message});
  }
});


app.get("/api/users/latest", async (req, res) => {
  try{
    const [rows] = await db.query("SELECT * FROM users ORDER BY id DESC LIMIT 1");
    if(!rows.length) {
      return res.status(404).json({message: "user not found"})
    }
    
    res.json(rows[0])
  }catch (err){
    res.status(500).json({error: err.message})
  }
});


app.post("/api/users", async (req, res) => {
  try {
    const { full_name, email, phone, location, pro_title } = req.body;
    const [result] = await db.query(
      "INSERT INTO users (full_name, email, phone, location, pro_title) VALUES (?,?,?,?,?)",
      [full_name, email, phone, location, pro_title]
    );

    const userID = result.insertId;
    const [ rows ] = await db.query("SELECT * FROM users WHERE id = ? ", [userID]);

    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({error: err.message});
  }
});



app.listen(PORT, () => {
  console.log("Backend listning on localhost:3000");
});
