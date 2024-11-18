import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import HomePage from '../components/HomePage';
import UserForm from '../components/UserForm';
import { Toaster } from '../components/ui/toaster';
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/add-user" element={<UserForm />} />
    <Route path="/edit-user/:id" element={<UserForm />} />
  </Routes>
  <Toaster/>
  </QueryClientProvider>
);

export default App;
