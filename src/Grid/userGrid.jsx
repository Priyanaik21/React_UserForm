import React, { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useReactTable, getCoreRowModel, getPaginationRowModel, flexRender, getSortedRowModel } from '@tanstack/react-table';
import axios from 'axios';
import { Box, Center, HStack, Spinner, Table, Text, Button, SelectRoot, SelectTrigger, SelectValueText, SelectContent, SelectItem, SelectLabel } from '@chakra-ui/react';
import { PaginationItems, PaginationNextTrigger, PaginationPrevTrigger, PaginationRoot } from "../components/ui/pagination";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { createListCollection } from "@chakra-ui/react"


const frameworks = createListCollection({
  items: [
    { label: "5", value: 5 },
    { label: "10", value: 10 },
    { label: "25", value: 25 },
    { label: "50", value: 50 },
  ],
})

const fetchUsers = async ({ page, pageSize, sorting }) => {
  const tempSort = sorting[0] || {};
  const params = new URLSearchParams({
    page,
    limit: pageSize,
    sortBy: tempSort?.id || '',
    order: tempSort?.desc ? 'desc' : 'asc',
  });

  const response = await axios.get(`https://67239909493fac3cf24b9322.mockapi.io/user/users?${params}`);
  return response.data;
};

export default function UserGrid({ sorting, setSorting }) {
  const [value, setValue] = useState([])
  const [searchParams, setSearchParams] = useSearchParams({
    page: '1',
    limit: '10',
    sortBy: 'id',
    order: 'desc',
  });

  const { page, limit, sortBy, order } = Object.fromEntries(searchParams.entries());
  const [currentPage, setCurrentPage] = useState(Number(page) || 1);
  const pageSize = Number(limit) || 10;
  const navigate = useNavigate();

  const columns = [
    { accessorKey: 'id', header: 'ID' },
    { accessorKey: 'email', header: 'Email' },
    { accessorKey: 'firstName', header: 'First Name' },
    { accessorKey: 'lastName', header: 'Last Name' },
    { accessorKey: 'username', header: 'Username' },
    {
      accessorKey: 'edit', header: 'Edit',
      cell: ({ row }) => (
        <Button colorPalette="teal" size="sm" onClick={() => navigate(`/edit-user/${row.original.id}`)}> Edit</Button>
      )
    },
  ];

  const { data, error, isLoading } = useQuery({
    queryKey: ['users', currentPage, sorting],
    queryFn: () => fetchUsers({ page: currentPage, pageSize, sorting }),
    keepPreviousData: true,
  });

  const handleSort = state => {
    setSorting(state)
    const currentState = state();
    setCurrentPage(1);
    setSearchParams((prev) => {
      prev.set('sortBy', currentState[0].id)
      prev.set('order', currentState[0].desc ? 'desc' : 'asc')
      prev.set('page', '1');
      return prev;
    })
  }

  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: handleSort,
    manualSorting: true,
    manualPagination: true,
    pageCount: -1,
    state: { pagination: { pageIndex: currentPage - 1, pageSize }, sorting },
  });

  const handleSearchParams = (params, key, value) => {
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
  };

  const onPageChange = useCallback((newPage) => {
    setCurrentPage(newPage);
    setSearchParams((prev) => {
      handleSearchParams(prev, 'page', newPage);
      handleSearchParams(prev, 'limit', pageSize);
      handleSearchParams(prev, 'sortBy', sortBy || 'id');
      handleSearchParams(prev, 'order', order || 'desc');
      return prev;
    });
  }, [setSearchParams, pageSize, sortBy, order]);

  if (isLoading) {
    return <Center><Spinner size="lg" /></Center>;
  }

  if (error) {
    return <Text color="red.500">Error loading data: {error.message}</Text>;
  }

  return (
    <Box borderWidth="1px" borderRadius="lg" p={4} shadow="md" mt={6} width="800px">
      <Table.Root size="sm" striped>
        <Table.Header>
          {table.getHeaderGroups().map(headerGroup => (
            <Table.Row key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <Table.ColumnHeader key={header.id} p={3} fontSize="lg" color="teal">
                  <Box as="span" onClick={header.column.getToggleSortingHandler()} cursor="pointer">
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
        <PaginationRoot count={20} pageSize={2} defaultPage={1} onPageChange={(e) => onPageChange(e.page)}>
          <HStack spacing={4}>
            <PaginationPrevTrigger />
            <PaginationItems />
            <PaginationNextTrigger />
          </HStack>
        </PaginationRoot>
      </Center>

      <SelectRoot collection={frameworks} width="320px" value={value} onValueChange={(e) => {
        setValue(e.value)
        console.log(e.value);
        setSearchParams((prev) => {
          prev.set('limit', e.value);
          prev.set('page', 1);
          return prev;
        });
        window.location.reload();
      }
      }>
        <SelectLabel>Items Per Page</SelectLabel>
        <SelectTrigger>
          <SelectValueText placeholder="Select page limit" />
        </SelectTrigger>
        <SelectContent>
          {frameworks.items.map((pageLimit) => (
            <SelectItem item={pageLimit} key={pageLimit.value}>
              {pageLimit.label}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>
    </Box>
  );
}
