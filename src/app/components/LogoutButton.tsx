'use client';
import React from 'react';
import { CiLogout } from 'react-icons/ci';
import { signOut } from 'next-auth/react';
import { toast } from 'react-hot-toast';

const LogoutButton = () => {
	return (
		<button
			onClick={() => {
				toast.success('Signing out...');
				signOut();
			}}
			className='text-4xl'
		>
			<CiLogout />
		</button>
	);
};

export default LogoutButton;
