'use client';
import { useState } from 'react';

const sortOptions = ['Latest', 'Oldest', 'A-Z', 'Z-A'];

const SortForm = () => {
	const [sort, setSort] = useState('');

	return (
		<form className=''>
			<select
				name='sort'
				id='sort'
				className='p-2 bg-white border border-gray-400 rounded-md'
				value={sort}
				onChange={(e) => setSort(e.target.value)}
			>
				{sortOptions.map((sortOption) => (
					<option value={sortOption} className='bg-white'>
						{sortOption}
					</option>
				))}
			</select>
		</form>
	);
};

export default SortForm;
