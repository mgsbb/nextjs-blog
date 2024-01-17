'use client';

import { useState } from 'react';
import { CiSearch } from 'react-icons/ci';

const SearchForm = () => {
	const [search, setSearch] = useState('');

	return (
		<form
			className='flex items-center gap'
			onSubmit={(e) => {
				e.preventDefault();
			}}
		>
			<input
				type='text'
				id='search'
				className='border border-gray-400 p-2 rounded-l-md'
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
			<button className='border-y border-r border-gray-400 rounded-r-md p-3'>
				<CiSearch />
			</button>
		</form>
	);
};

export default SearchForm;
