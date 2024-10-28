import React, { useState } from 'react';
import { Input, Button } from '@chakra-ui/react';

const UserForm = () => {
  const [user, setUser] = useState({
    userName: '',
    firstName: '',
    lastName: '',
    email: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('User Data:', user);
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Add New User</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>User Name</label>
          <Input name="userName" value={user.userName} onChange={handleChange} placeholder="Enter user name" required style={{ marginTop: '5px' }}/>
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>First Name</label>
          <Input name="firstName" value={user.firstName} onChange={handleChange} placeholder="Enter first name" required style={{ marginTop: '5px' }}/>
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Last Name</label>
          <Input name="lastName" value={user.lastName} onChange={handleChange} placeholder="Enter last name" required style={{ marginTop: '5px' }}/>
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Email</label>
          <Input name="email" type="email" value={user.email} onChange={handleChange} placeholder="Enter email address" required style={{ marginTop: '5px' }} />
        </div>
        <Button colorScheme="teal" type="submit" width="100%"> Submit</Button>
      </form>
    </div>
  );
};

export default UserForm;
