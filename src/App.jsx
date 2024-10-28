import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import UserForm from './components/UserForm';

const App = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/add-user" element={<UserForm />} />
  </Routes>
);

export default App;
