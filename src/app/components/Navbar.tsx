import React from 'react';
import { FaBlog } from 'react-icons/fa6';
import LogoutButton from './LogoutButton';

import Link from 'next/link';

const Navbar = () => {
	return (
		<nav className='border border-b border-gray-300 w-full p-4 flex justify-center items-center'>
			<div className='w-full md:w-4/5 flex gap-4 items-center justify-between'>
				<Link href='/'>
					<FaBlog className='text-4xl text-gray-400' />
				</Link>
				<LogoutButton />
			</div>
		</nav>
	);
};

export default Navbar;
