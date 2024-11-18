import React, { useEffect } from 'react';
import { Input, Button, Container, Heading, VStack, Text, HStack, Fieldset } from '@chakra-ui/react';
import { Field } from '../components/ui/field';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import userValidation from '../validations/userValidation';
import UserStore from '../store/store';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchUserById, useCreateUserMutation, useUpdateUserMutation } from '../api/userApi';

const UserForm = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(userValidation),
    mode: 'onChange',
  });

  const addUser = UserStore((state) => state.addUser);
  const updateUserInStore = UserStore((state) => state.addUser);
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: userData, isLoading, isError } = useQuery({
    queryKey: ['getUser', id], 
    queryFn: async () => await fetchUserById(id),
    enabled: !!id, 
  });

  const createUserMutation = useCreateUserMutation(addUser);
  const updateUserMutation = useUpdateUserMutation(updateUserInStore);

  useEffect(() => {
    if (userData) {
      reset(userData);
    }
  }, [userData, reset]);

  const onSubmit = (data) => {
    console.log('User Data:', data);
    if (id) {
      updateUserMutation.mutate({ id, data });
    } else {
      createUserMutation.mutate(data);
    }
    reset();
  };

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (isError) {
    return <Text>Error loading user data.</Text>;
  }

  return (
    <Container maxW="md" py={9} px={7} borderRadius="md" bg="white" shadow="md" mt={4}>
      <VStack spacing={4} align="stretch">
        <Heading as="h2" size="lg" textAlign="center" color="teal.600">
          {id ? 'Edit User' : 'Add New User'}
        </Heading>
        <Text fontSize="sm" color="gray.600" textAlign="center" mt={2} mb={2}>
          {id ? 'Please fill the details to edit the user' : 'Please fill the details to create a new user account.'}
        </Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Fieldset.Root>
            <VStack>
              <Field invalid={errors.username} errorText={errors.username?.message}>
                <Input {...register('username')} placeholder="User Name" bg="gray.50" _placeholder={{ color: 'gray.400' }} />
              </Field>

              <Field invalid={errors.firstName} errorText={errors.firstName?.message}>
                <Input {...register('firstName')} placeholder="First Name" bg="gray.50" _placeholder={{ color: 'gray.400' }} />
              </Field>

              <Field invalid={errors.lastName} errorText={errors.lastName?.message}>
                <Input {...register('lastName')} placeholder="Last Name" bg="gray.50" _placeholder={{ color: 'gray.400' }} />
              </Field>

              <Field invalid={errors.email} errorText={errors.email?.message}>
                <Input {...register('email')} type="email" placeholder="Email Address" bg="gray.50" _placeholder={{ color: 'gray.400' }} />
              </Field>

              {!id && (
                <>
                  <Field invalid={errors.password} errorText={errors.password?.message}>
                    <Input {...register('password')} type="password" placeholder="Password" bg="gray.50" _placeholder={{ color: 'gray.400' }} />
                  </Field>

                  <Field invalid={errors.confirmPassword} errorText={errors.confirmPassword?.message}>
                    <Input {...register('confirmPassword')} type="password" placeholder="Confirm Password" bg="gray.50" _placeholder={{ color: 'gray.400' }} />
                  </Field>
                </>
              )}

              <HStack spacing={4} mt={4} align="center" justify="center">
                <Button colorPalette="teal" type="submit" width="full" size="lg">Submit</Button>
                <Button colorPalette="teal" width="full" size="lg" onClick={() => navigate('/')}>Back</Button>
              </HStack>
            </VStack>
          </Fieldset.Root>
        </form>
      </VStack>
    </Container>
  );
};

export default UserForm;
