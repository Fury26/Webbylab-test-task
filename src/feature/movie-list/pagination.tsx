import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Badge, Button, Flex } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { PER_PAGE, updateFilter } from '../../redux/movies';
import { RootState, useAppDispatch } from '../../redux/store';

const Pagination = () => {
	const dispatch = useAppDispatch();
	const {
		filters: { offset: _offset },
		meta: { total },
	} = useSelector((state: RootState) => state.movies);

	const offset = _offset || 0;

	const onChangePage = (newOffset: number) => {
		dispatch(updateFilter({ offset: newOffset }));
	};

	if (total <= PER_PAGE) {
		return null;
	}

	const currentPage = Math.floor(offset / PER_PAGE) + 1;
	const lastPage = Math.trunc(total / PER_PAGE) + 1;

	return (
		<Flex gap={2}>
			<Button isDisabled={currentPage === 1} size="xs" onClick={() => onChangePage(offset - PER_PAGE)}>
				<ChevronLeftIcon />
			</Button>
			<Button isDisabled={currentPage === 1} size="xs" onClick={() => onChangePage(0)}>
				1
			</Button>

			<Badge colorScheme="teal" variant="outline" display="flex" justifyContent="center" alignItems="center">
				{currentPage} of {lastPage} pages
			</Badge>

			<Button isDisabled={currentPage === lastPage} size="xs" onClick={() => onChangePage((lastPage - 1) * PER_PAGE)}>
				{lastPage}
			</Button>
			<Button isDisabled={currentPage === lastPage} size="xs" onClick={() => onChangePage(offset + PER_PAGE)}>
				<ChevronRightIcon />
			</Button>
		</Flex>
	);
};

export default Pagination;
