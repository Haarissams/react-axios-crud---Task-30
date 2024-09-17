import React, { useState, useEffect } from 'react';
import { getUsers, addUser, updateUser, deleteUser } from './api';
import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '' });
  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await getUsers();
    setUsers(response.data);
  };

  const handleAddUser = async () => {
    const response = await addUser(newUser);
    setUsers([...users, response.data]);
    setNewUser({ name: '', email: '' });
  };

  const handleEditUser = (user) => {
    setEditUser(user);
  };

  const handleUpdateUser = async () => {
    const response = await updateUser(editUser.id, editUser);
    setUsers(users.map((user) => (user.id === editUser.id ? response.data : user)));
    setEditUser(null);
  };

  const handleDeleteUser = async (id) => {
    await deleteUser(id);
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="App">
      <h1>User Management</h1>

      <div className="form-container">
        <h2>{editUser ? 'Edit User' : 'Add User'}</h2>
        <input
          type="text"
          placeholder="Name"
          value={editUser ? editUser.name : newUser.name}
          onChange={(e) => {
            if (editUser) {
              setEditUser({ ...editUser, name: e.target.value });
            } else {
              setNewUser({ ...newUser, name: e.target.value });
            }
          }}
        />
        <input
          type="email"
          placeholder="Email"
          value={editUser ? editUser.email : newUser.email}
          onChange={(e) => {
            if (editUser) {
              setEditUser({ ...editUser, email: e.target.value });
            } else {
              setNewUser({ ...newUser, email: e.target.value });
            }
          }}
        />
        <button onClick={editUser ? handleUpdateUser : handleAddUser}>
          {editUser ? 'Update User' : 'Add User'}
        </button>
      </div>

      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <div className="user-info">
              <strong>{user.name}</strong> <br />
              <small>{user.email}</small>
            </div>
            <div className="user-actions">
              <button onClick={() => handleEditUser(user)}>Edit</button>
              <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
