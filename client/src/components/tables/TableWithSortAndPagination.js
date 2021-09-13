import React, { useMemo, useState, useEffect } from 'react';
import {
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	Tfoot,
	Text,
	Flex,
	Box,
	HStack,
	TableCaption,
	Heading,
	Button,
	Icon,
	IconButton,
	Tooltip,
	useBreakpointValue,
	Select,
} from '@chakra-ui/react';

import { FiChevronUp, FiChevronDown } from 'react-icons/fi';

import { useTable, usePagination, useSortBy } from 'react-table';

const TableWithSortAndPagination = ({
	TABLE_HEADER_COLUMNS,
	TABLE_DATA_SAMPLES,
}) => {
	const tableColumns = useMemo(() => TABLE_HEADER_COLUMNS, []);
	const tableDataSamples = useMemo(() => TABLE_DATA_SAMPLES, []);

	const tableSize = useBreakpointValue({
		base: 'sm',
		md: 'md',
	});

	const {
		state: { pageIndex, pageSize },

		getTableProps,
		getTableBodyProps,
		headerGroups,
		// rows,
		prepareRow,

		// paginations
		page,
		canPreviousPage,
		canNextPage,
		pageOptions,

		nextPage,
		previousPage,
		setPageSize,
	} = useTable(
		{
			initialState: { sortBy: [{ id: 'id', desc: false }] },
			columns: tableColumns,
			data: tableDataSamples,
		},
		useSortBy,
		usePagination
	);

	return (
		<Box bg='whiteAlpha.900' p={8} borderRadius={4}>
			<Heading as='h2' size='lg' isTruncated mb={4}>
				Users ( Table With Sort and Pagination)
			</Heading>
			{/* STARTING TABLE */}
			<Flex overflowX='auto'>
				<Table
					_fullScreen
					maxW='100%'
					{...getTableProps()}
					bg='whiteAlpha.900'
					size={tableSize}
					// variant='striped'
					borderColor='gray.100'
					borderWidth={1}
					borderRadius={4}>
					<Thead bg='blue.400'>
						{
							// Loop over the header rows
							headerGroups.map((headerGroup) => (
								// Apply the header row props
								<Tr {...headerGroup.getHeaderGroupProps()}>
									{
										// Loop over the headers in each row
										headerGroup.headers.map((column) => (
											// Apply the header cell props
											<Th
												{...column.getHeaderProps(
													column.getSortByToggleProps()
												)}
												color='whiteAlpha.900'>
												<Flex justify='space-between' align='center'>
													<Box>
														{
															// Render the header
															column.render('Header')
														}
													</Box>
													<Box>
														{column?.isSorted ? (
															column?.isSortedDesc ? (
																<Icon fontSize={{ base: 12, md: 16, lg: 20 }}>
																	<FiChevronUp />
																</Icon>
															) : (
																<Icon fontSize={{ base: 12, md: 16, lg: 20 }}>
																	<FiChevronDown />
																</Icon>
															)
														) : (
															''
														)}
													</Box>
												</Flex>
											</Th>
										))
									}
								</Tr>
							))
						}
					</Thead>
					{/* Apply the table body props */}
					<Tbody {...getTableBodyProps()}>
						{
							// Loop over the table rows
							page.map((row) => {
								// Prepare the row for display
								prepareRow(row);
								return (
									// Apply the row props
									<Tr {...row.getRowProps()}>
										{
											// Loop over the rows cells
											row.cells.map((cell) => {
												// Apply the cell props
												return (
													<Td {...cell.getCellProps()}>
														{
															// Render the cell contents
															cell.render('Cell')
														}
													</Td>
												);
											})
										}
									</Tr>
								);
							})
						}
					</Tbody>
				</Table>
			</Flex>

			<Flex justify='space-between' align='center' p={5}>
				<HStack>
					<Text fontSize='lg' mr={3}>
						Total: {tableDataSamples?.length}
					</Text>
				</HStack>
				<Flex align='center'>
					<Text fontSize='md' minW='125px'>
						{' '}
						Rows per page
					</Text>
					<Select
						value={pageSize}
						onChange={(e) => {
							setPageSize(Number(e.target.value));
						}}>
						{[10, 20, 50, 100].map((pageSize) => (
							<option key={pageSize} value={pageSize}>
								Show {pageSize}
							</option>
						))}
					</Select>
				</Flex>

				<HStack>
					<Button
						variant='outline'
						onClick={previousPage}
						isDisabled={!canPreviousPage}>
						Previous
					</Button>
					<Box>
						{pageIndex + 1} of {pageOptions?.length}
					</Box>
					<Button
						variant='outline'
						onClick={nextPage}
						isDisabled={!canNextPage}>
						Next
					</Button>
				</HStack>
			</Flex>
		</Box>
	);
};

export default TableWithSortAndPagination;
