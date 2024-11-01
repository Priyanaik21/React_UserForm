import React from 'react';
import { Input, Button, FormErrorMessage, FormControl, Container, Heading, VStack, Text, useToast, HStack } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import userValidation from '../validations/userValidation';
import UserStore from '../store/store';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(userValidation),
    mode: 'onChange',
  });
  const addUser = UserStore((state) => state.addUser);
  const toast = useToast(); 

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await axios.post('https://67239909493fac3cf24b9322.mockapi.io/user/users', data);
      return response.data; 
    },
    onSuccess: (data) => {
      addUser(data);
      toast({
        title: "User added successfully.",
        description: "The user has been successfully added to the store.",
        status: "success",
        duration: 2000,
        position: "bottom-right",
      });
    },
    onError: (error) => {
      toast({
        title: "Error adding user.",
        description: error.response?.data?.message || "An unexpected error occurred.",
        status: "error",
        duration: 2000,
        position: "bottom-right",
      });
    },
  });

  const onSubmit = (data) => {
    console.log('User Data:', data);
    mutation.mutate(data);
  };

  return (
    <Container maxW="md" py={8} px={6} borderRadius="md" bg="white" shadow="base">
      <VStack spacing={4} align="stretch">
        <Heading as="h2" size="lg" textAlign="center" color="teal.600">
          Add New User
        </Heading>
        <Text fontSize="sm" color="gray.600" textAlign="center">
          Please fill the details to create a new user account.
        </Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing={4}>
            <FormControl isInvalid={errors.username}>
              <Input {...register('username')} placeholder="User Name" bg="gray.50" _placeholder={{ color: 'gray.400' }} focusBorderColor="teal.400"/>
              <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.firstName}>
              <Input {...register('firstName')} placeholder="First Name" bg="gray.50" _placeholder={{ color: 'gray.400' }} focusBorderColor="teal.400"/>
              <FormErrorMessage>{errors.firstName?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.lastName}>
              <Input {...register('lastName')} placeholder="Last Name" bg="gray.50" _placeholder={{ color: 'gray.400' }} focusBorderColor="teal.400"/>
              <FormErrorMessage>{errors.lastName?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.email}>
              <Input {...register('email')} type="email" placeholder="Email Address" bg="gray.50" _placeholder={{ color: 'gray.400' }} focusBorderColor="teal.400"/>
              <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.password}>
              <Input {...register('password')} type="password" placeholder="Password" bg="gray.50"_placeholder={{ color: 'gray.400' }} focusBorderColor="teal.400"/>
              <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.confirmPassword}>
              <Input {...register('confirmPassword')} type="password" placeholder="Confirm Password" bg="gray.50" _placeholder={{ color: 'gray.400' }} focusBorderColor="teal.400"/>
              <FormErrorMessage>{errors.confirmPassword?.message}</FormErrorMessage>
            </FormControl>

            <HStack spacing={4} mt={4} align="center" justify="center">
            <Button colorScheme="teal" type="submit" width="full" size="lg" > Submit</Button>
            <Button colorScheme="teal" width="full" size="lg" onClick={() => navigate('/')}>Back</Button>
            </HStack>

          </VStack>
        </form>
      </VStack>
    </Container>
  );
};

export default UserForm;
