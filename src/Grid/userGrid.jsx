import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useReactTable, getCoreRowModel, getPaginationRowModel, flexRender } from '@tanstack/react-table';
import { Box, Spinner, Table, Thead, Tbody, Tr, Th, Td, Button, Center, Text, HStack } from '@chakra-ui/react';
import axios from 'axios';

const columns = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'firstName', header: 'First Name' },
  { accessorKey: 'lastName', header: 'Last Name' },
  { accessorKey: 'username', header: 'Username' },
];

const fetchUsers = async ({ page, pageSize }) => {
  const url = new URL('https://67239909493fac3cf24b9322.mockapi.io/user/users');
  url.searchParams.append('page', page);
  url.searchParams.append('limit', pageSize);
  const response = await axios.get(url.toString());
  return response.data;
};

const UserGrid = () => {
  const [page, setPage] = React.useState(1);
  const pageSize = 10;

  const { data, error, isLoading } = useQuery({
    queryKey: ['users', page],
    queryFn: () => fetchUsers({ page, pageSize }),
    keepPreviousData: true,
  });

  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    pageCount: -1,
    state: { pagination: { pageIndex: page - 1, pageSize } },
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
          <Button onClick={() => setPage(prev => Math.max(prev - 1, 1))} disabled={page === 1}>Previous</Button>
          <Text>Page {page}</Text>
          <Button onClick={() => setPage(prev => prev + 1)}>Next</Button>
        </HStack>
      </Center>
    </Box>
  );
};

export default UserGrid;


