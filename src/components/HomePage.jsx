import React, { useState } from 'react';
import { Button, Container, Heading, VStack, Box } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import UserGrid from '../Grid/userGrid';

const HomePage = () => {
  const navigate = useNavigate();
  const [sorting, setSorting] = useState([]); 
  
  return (
    <Container centerContent py={10} maxW="lg">
      <VStack spacing={6} align="center">
        <Heading color="teal.600" size="s" mb={2}>Welcome to User Management</Heading>
        <Box pt={4}>
          <Button colorPalette="teal" size="lg" onClick={() => navigate('/add-user')}> Add User</Button>
        </Box>
        <UserGrid
        sorting={sorting}
        setSorting={setSorting}
        />
      </VStack>
    </Container>
  );
};

export default HomePage;
