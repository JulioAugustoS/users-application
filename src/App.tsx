import { useEffect, useState } from "react";
import request from "./config/request";
import "./App.css";

interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
}

function App() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
  });

  const findUsers = async () => {
    try {
      const response = await request.get("/users");

      setUsers(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    findUsers();
  }, []);

  const createUser = async () => {
    try {
      await request.post("/users", user);

      setUser({
        name: "",
        username: "",
        email: "",
      });
      findUsers();
    } catch (err) {
      console.log(err);
    }
  };

  const updateUser = async () => {
    try {
      await request.put("/users/4", {
        name: "Guilherme Fernandes",
        username: "guilhermef",
        email: "guilherme@gmail.com",
      });
    } catch (err) {
      console.log(err);
    }
  };

  const deleteUser = async (id: number) => {
    try {
      await request.delete(`/users/${id}`);

      findUsers();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      <input
        type="text"
        placeholder="Nome"
        onChange={(e) => setUser({ ...user, name: e.target.value })}
        value={user.name}
      />
      <br />
      <br />
      <input
        type="text"
        placeholder="Username"
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        value={user.username}
      />
      <br />
      <br />
      <input
        type="text"
        placeholder="Email"
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        value={user.email}
      />
      <br />
      <br />

      <button type="button" onClick={() => createUser()}>
        Cadastrar Usuário
      </button>

      {users.map((item: IUser) => (
        <>
          <p>{item.id}</p>
          <p>{item.name}</p>
          <p>{item.username}</p>
          <p>{item.email}</p>
          <button type="button" onClick={() => deleteUser(item.id)}>
            Excluir
          </button>
        </>
      ))}
    </div>
  );
}

export default App;
