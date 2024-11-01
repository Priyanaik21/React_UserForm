import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender
} from '@tanstack/react-table';
import {
  Box,
  Spinner,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Center,
  Text,
  HStack
} from '@chakra-ui/react';
import axios from 'axios';

const columns = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'firstName',
    header: 'First Name',
  },
  {
    accessorKey: 'lastName',
    header: 'Last Name',
  },
  {
    accessorKey: 'username',
    header: 'Username',
  },
];

const UserGrid = () => {
    const { data, error, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await axios.get('https://67239909493fac3cf24b9322.mockapi.io/user/users');
      return response.data;
    },
  });

  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  if (isLoading) {
    return <Center><Spinner size="lg" /></Center>;
  }

  if (error) {
    return <Text color="red.500">Error loading data: {error.message}</Text>;
  }

  return (
    <Box borderWidth="1px" borderRadius="lg" p={4} shadow="md" mt={6} width="full">
      <Table variant="striped" colorScheme="teal">
        <Thead>
          {table.getHeaderGroups().map(headerGroup => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <Th key={header.id}>
                  {flexRender(header.column.columnDef.header)}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {table.getRowModel().rows.map(row => (
            <Tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <Td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Center mt={4}>
        <HStack spacing={4}>
          <Button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}> Previous</Button>
          <Text> Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()} </Text>
          <Button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} >Next </Button>
        </HStack>
      </Center>
    </Box>
  );
};

export default UserGrid;
