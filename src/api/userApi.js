import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { toaster } from '../components/ui/toaster';
import { useNavigate } from 'react-router-dom';

const URL = 'https://67239909493fac3cf24b9322.mockapi.io/user/users';

export const fetchUserById = async (id) => {
  const response = await axios.get(`${URL}/${id}`);
  return response.data;
};

export const useCreateUserMutation = (addUser) => {
  return useMutation({
    mutationFn: data => axios.post(URL, data),
    onSuccess: (data) => {
      addUser(data); 
      toaster.create({
        title: 'User added successfully.',
        description: 'The user has been successfully added.',
        type: 'success',
        duration: 2000,
        position: 'bottom-right',
      });
    },
    onError: (error) => {
      toaster.create({
        title: 'Error occurred.',
        description: error.response?.data?.message || 'An unexpected error occurred.',
        type: 'error',
        duration: 2000,
        position: 'bottom-right',
      });
    },
  });
};

export const useUpdateUserMutation = (updateUserInStore) => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: ({id, data}) => axios.put(`${URL}/${id}`, data),
    onSuccess: (data) => {
      updateUserInStore(data); 
      navigate('/'); 
      toaster.create({
        title: 'User updated successfully.',
        description: 'The user has been successfully updated.',
        type: 'success',
        duration: 2000,
        position: 'bottom-right',
      });
    },
    onError: (error) => {
      toaster.create({
        title: 'Error occurred.',
        description: error.response?.data?.message || 'An unexpected error occurred.',
        type: 'error',
        duration: 2000,
        position: 'bottom-right',
      });
    },
  });
};