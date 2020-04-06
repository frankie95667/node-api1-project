import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({
    name: "",
    bio: "",
  });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => console.error(err.message));
  }, []);

  useEffect(() => {}, [users]);

  const addUser = () => {
    axios
      .post("http://localhost:5000/api/users", user)
      .then((res) => {
        console.log(res);
        setUsers(res.data);
        setUser({
          name: "",
          bio: "",
        });
      })
      .catch((err) => console.error(err.message));
  };

  const updateUser = () => {
    axios.patch(`http://localhost:5000/api/users/${user.id}`, user)
    .then(res => {
      console.log(res.data);
      setUsers(res.data);
    })
    .catch(err => console.error(err.message))
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    updateUser();
  };
  const deleteUser = (id) => {
    axios
      .delete(`http://localhost:5000/api/users/${id}`)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => console.error(err.message));
  };

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const editUser = (user) => {
    setUser(user);
    setEditing(true);
  }

  const handleAdd = (e) => {
    e.preventDefault();
    addUser();
  };

  return (
    <div className="App">
      {users.map((user) => (
        <div
          key={user.id}
          style={{
            width: "200px",
            height: "auto",
            margin: "0 auto",
            position: "relative",
          }}
        >
          <div
            onClick={() => deleteUser(user.id)}
            style={{
              position: "absolute",
              right: "5px",
              top: "5px",
              cursor: "pointer",
            }}
          >
            X
          </div>
          <h3 onClick={() => editUser(user)}>{user.name}</h3>
          <p>{user.bio}</p>
        </div>
      ))}
      {!editing ? (
        <form onSubmit={handleAdd}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              value={user.name}
              name="name"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="bio">Bio</label>
            <input
              id="bio"
              value={user.bio}
              name="bio"
              onChange={handleChange}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      ) : (
        <form onSubmit={handleUpdate}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              value={user.name}
              name="name"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="bio">Bio</label>
            <input
              id="bio"
              value={user.bio}
              name="bio"
              onChange={handleChange}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}

export default App;
