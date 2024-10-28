import React from 'react';
import { Button, Container, Heading } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Container centerContent>
      <Heading mb={4}>User Form</Heading>
      <Button colorScheme="teal" onClick={() => navigate('/add-user')}>
        Add User
      </Button>
     </Container>
  );
};

export default HomePage;
