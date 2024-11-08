import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useReactTable, getCoreRowModel, getPaginationRowModel, flexRender, getSortedRowModel } from '@tanstack/react-table';
import axios from 'axios';
import { Box, Center, HStack, Spinner, Table, Text } from '@chakra-ui/react';
import { PaginationItems, PaginationNextTrigger, PaginationPrevTrigger, PaginationRoot } from "../components/ui/pagination";

const columns = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'firstName', header: 'First Name'},
  { accessorKey: 'lastName', header: 'Last Name' },
  { accessorKey: 'username', header: 'Username'},
];

const fetchUsers = async ({ page, pageSize }) => {
  const url = new URL('https://67239909493fac3cf24b9322.mockapi.io/user/users');
  url.searchParams.append('page', page);
  url.searchParams.append('limit', pageSize);
  const response = await axios.get(url.toString());
  return response.data;
};

const UserGrid = () => {
  const [page, setPage] = useState(1);
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
    getSortedRowModel: getSortedRowModel(),
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
    <Box borderWidth="1px" borderRadius="lg" p={4} shadow="md" mt={6} width="800px">
      <Table.Root size="sm" striped>
        <Table.Header >
          {table.getHeaderGroups().map(headerGroup => (
            <Table.Row key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <Table.ColumnHeader key={header.id} p={3} fontSize="lg" color="teal">
                  <Box as="span" onClick={header.column.getToggleSortingHandler()} cursor="pointer" >
                    {flexRender(header.column.columnDef.header)}
                    {header.column.getIsSorted() === 'asc' ? ' 🔼' : header.column.getIsSorted() === 'desc' ? ' 🔽' : null}
                  </Box>
                </Table.ColumnHeader>
              ))}
            </Table.Row>
          ))}
        </Table.Header>
        <Table.Body>
          {table.getRowModel().rows.map(row => (
            <Table.Row key={row.id} _hover={{ bg: "teal.50" }}>
              {row.getVisibleCells().map(cell => (
                <Table.Cell key={cell.id} p={3}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      <Center mt={4}>
        <PaginationRoot count={20} pageSize={2} defaultPage={1} onPageChange={(e) => setPage(e.page)}>
          <HStack spacing={4}>
            <PaginationPrevTrigger />
            <PaginationItems />
            <PaginationNextTrigger />
          </HStack>
        </PaginationRoot>
      </Center>
    </Box>
  );
};

export default UserGrid;
