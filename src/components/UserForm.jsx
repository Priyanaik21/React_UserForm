import React from 'react';
import { Input, Button, Container, Heading, VStack, Text, HStack,Fieldset } from '@chakra-ui/react';
import { Field } from '../components/ui/field';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import userValidation from '../validations/userValidation';
import UserStore from '../store/store';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Toaster, toaster } from "../components/ui/toaster"

const UserForm = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(userValidation),
    mode: 'onChange',
  });
  const addUser = UserStore((state) => state.addUser); 

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await axios.post('https://67239909493fac3cf24b9322.mockapi.io/user/users', data);
      return response.data; 
    },
    onSuccess: (data) => {
      addUser(data);
      toaster.create({
        title: "User added successfully.",
        description: "The user has been successfully added to the store.",
        type: "success",
        duration: 2000,
        position: "bottom-right",
      });
    },
    onError: (error) => {
      toaster.create({
        title: "Error adding user.",
        description: error.response?.data?.message || "An unexpected error occurred.",
        type: "error",
        duration: 2000,
        position: "bottom-right",
      });
    },
  });

  const onSubmit = (data) => {
    console.log('User Data:', data);
    mutation.mutate(data);
    reset();
  };

  return (
    <Container maxW="md" py={9} px={7} borderRadius="md" bg="white" shadow="md" mt={4} >
      <VStack spacing={4} align="stretch">
        <Heading as="h2" size="lg" textAlign="center" color="teal.600">
          Add New User
        </Heading>
        <Text fontSize="sm" color="gray.600" textAlign="center" mt={2} mb={2}>
          Please fill the details to create a new user account.
        </Text>
        <form onSubmit={handleSubmit(onSubmit)}>
        <Fieldset.Root >
          <VStack>
            <Field invalid={errors.username} errorText={errors.username?.message}>
              <Input {...register('username')} placeholder="User Name" bg="gray.50" _placeholder={{ color: 'gray.400' }} />
            </Field>

            <Field invalid = {errors.firstName} errorText={errors.firstName?.message}>
              <Input {...register('firstName')} placeholder="First Name" bg="gray.50" _placeholder={{ color: 'gray.400' }} />
            </Field>

            <Field invalid={errors.lastName} errorText={errors.lastName?.message}>
              <Input {...register('lastName')} placeholder="Last Name" bg="gray.50" _placeholder={{ color: 'gray.400' }} />
            </Field>

            <Field invalid={errors.email} errorText={errors.email?.message}>
              <Input {...register('email')} type="email" placeholder="Email Address" bg="gray.50" _placeholder={{ color: 'gray.400' }} />
            </Field>

            <Field invalid={errors.password} errorText={errors.password?.message}>
              <Input {...register('password')} type="password" placeholder="Password" bg="gray.50"_placeholder={{ color: 'gray.400' }} />
             </Field>

            <Field invalid={errors.confirmPassword} errorText={errors.confirmPassword?.message}>
              <Input {...register('confirmPassword')} type="password" placeholder="Confirm Password" bg="gray.50" _placeholder={{ color: 'gray.400' }} />      
             </Field>
             
            <HStack spacing={4} mt={4} align="center" justify="center">
            <Button colorPalette="teal" type='submit' width="full" size="lg" > Submit</Button>
            <Button colorPalette="teal" width="full" size="lg" onClick={() => navigate('/')}>Back</Button>
            </HStack>
          </VStack>
        </Fieldset.Root >
      </form>
      </VStack>
      <Toaster />
    </Container>
  );
};

export default UserForm;
