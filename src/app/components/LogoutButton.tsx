'use client';
import React from 'react';
import { CiLogout } from 'react-icons/ci';
import { signOut } from 'next-auth/react';

const LogoutButton = () => {
	return (
		<button onClick={() => signOut()} className='text-2xl'>
			<CiLogout />
		</button>
	);
};

export default LogoutButton;
