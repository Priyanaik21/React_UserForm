import React from 'react';
import { Input, Button, FormErrorMessage, FormControl } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import userValidation from '../validations/userValidation';
import UserStore from '../store/store';

const UserForm = () => {
  const {register,handleSubmit, formState: { errors }, watch,
  } = useForm({
    resolver: yupResolver(userValidation),
    mode: 'onChange', 
  });

  const addUser = UserStore((state) => state.addUser);

  const onSubmit = (data) => {
    console.log('User Data:', data);
    addUser(data);
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Add New User</h2>
      <form onSubmit={handleSubmit(onSubmit)}>

        <FormControl isInvalid={errors.userName} style={{ marginBottom: '15px' }}>
          <label>User Name</label>
          <Input {...register('userName')} placeholder="Enter user name" style={{ marginTop: '5px' }}/>
          <FormErrorMessage>{errors.userName?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.firstName} style={{ marginBottom: '15px' }}>
          <label>First Name</label>
          <Input {...register('firstName')} placeholder="Enter first name" style={{ marginTop: '5px' }} />
          <FormErrorMessage>{errors.firstName?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.lastName} style={{ marginBottom: '15px' }}>
          <label>Last Name</label>
          <Input {...register('lastName')} placeholder="Enter last name" style={{ marginTop: '5px' }}/>
          <FormErrorMessage>{errors.lastName?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.email} style={{ marginBottom: '15px' }}>
          <label>Email</label>
          <Input {...register('email')} type="email" placeholder="Enter email address" style={{ marginTop: '5px' }} />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.password} style={{ marginBottom: '15px' }}>
          <label>Password</label>
          <Input {...register('password')} type="password" placeholder="Enter password" style={{ marginTop: '5px' }}/>
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.confirmPassword} style={{ marginBottom: '15px' }}>
          <label>Confirm Password</label>
          <Input {...register('confirmPassword')} type="password" placeholder="Confirm password" style={{ marginTop: '5px' }} />
          <FormErrorMessage>{errors.confirmPassword?.message}</FormErrorMessage>
        </FormControl>

        <Button colorScheme="teal" type="submit" width="100%">Submit</Button>
      </form>
    </div>
  );
};

export default UserForm;
