import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import HomePage from './components/HomePage';
import UserForm from './components/UserForm';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/add-user" element={<UserForm />} />
  </Routes>
  </QueryClientProvider>
);

export default App;
