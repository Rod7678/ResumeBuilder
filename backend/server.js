const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(express.json());

let users = [
  { id: 1, user: "Rohit" },
  { id: 2, user: "Rutuja" },
];

app.use(cors());

app.get("/", (req, res) => {
  res.send({ hello: "hello world" });
});

app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find((u) => u.id === id);

  if(!user){
    return res.status(404).json({message: "User not found"});
  };

  return res.json(user)
});

app.post('/users', (req, res) => {
    const newUser = {
        id : users.length + 1,
        name: req.body.name
    };

    users.push(newUser);
    return res.status(201).json(newUser);
})

app.put('/users/:id' , (req, res)=>{
    const id = parseInt(req.params.id);
    const user = users.find(u => u.id === id);

    if(!user){
        return res.status(404).json({message: 'unable to update'});

    }

    user.name = res.body.name;
    return res.json(user)
})

app.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    users = users.filter(u => u.id !== id);
    return res.json({message: "user deleted"})
    
})

app.listen(PORT, () => {
  console.log("Backend listning on localhost:3000");
});
