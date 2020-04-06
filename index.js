const express = require("express");
const shortid = require("shortid");
const cors = require('cors');

const server = express();

let users = [
  {
    id: "3kdk334l",
    name: "Jane Doe",
    bio: "Not Tarzan's wife, another Jane",
  },
  {
    id: "4k3l2n3",
    name: "John Doe",
    bio: "Husband of Jane Doe",
  },
];

// pase application/x-www-form-urlencoded
server.use(express.json());
server.use(cors());

server.post("/api/users", (req, res) => {
  if (!((req.body.name && req.body.bio) || Array.isArray(req.body))) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else {
    try {
      users = [
        ...users,
        {
          id: shortid.generate(),
          ...req.body,
        },
      ];
      res.status(201).json(users);
    } catch (err) {
      console.error("Error", err);
      res.status(500).json({
        message: "There was an error while saving the user to the database",
      });
    }
  }
});

server.get("/api/users", (req, res) => {
  try {
    res.status(201).json(users);
  } catch (err) {
    res
      .status(500)
      .json({ message: "The users information could not be retrieved." });
  }
});

server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const foundUser = users.find((user) => id === user.id);
  try {
    if (foundUser) {
      res.status(201).json(foundUser);
    } else {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist." });
    }
  } catch (error) {
    res.status(500).json({
      message: "there was an error when trying to get user",
    });
  }
});

server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const found = users.find((user) => id === user.id);

  if (!found) {
    res
      .status(404)
      .json({ message: "The user with the specified ID does not exist." });
  } else {
    const newUsers = users.filter((user) => user.id !== id);
    users = newUsers;
    res.status(201).json(users);
  }
});

server.patch("/api/users/:id", (req, res) => {
  const index = users.findIndex((user) => user.id === req.params.id);
  try {
     if (index !== -1) {
    users[index].name = req.body.name ? req.body.name : users[index].name;
    users[index].bio = req.body.bio ? req.body.bio : users[index].bio;
    res.status(200).json(users);
    console.log(users);
  } else {
    res.status(404).json({
      message: "user not found",
    });
  }
  } catch (error) {
    res.status(500).json({
      message: "there was an error trying to update the user"
    })
  }
 
});

server.listen(5000, () => {
  console.log("listening on port 5000");
});
