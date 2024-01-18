'use client';
import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const DeletePostButton = ({ postId }: { postId: string }) => {
	const router = useRouter();

	return (
		<button
			onClick={() => {
				axios.delete(`/api/posts/${postId}`);
				router.push('/');
				setTimeout(() => {
					router.refresh();
				}, 200);
			}}
			className='border border-red-500 rounded-md 
						px-4 py-2 hover:bg-red-100 text-red-500 font-bold'
		>
			Delete
		</button>
	);
};

export default DeletePostButton;
